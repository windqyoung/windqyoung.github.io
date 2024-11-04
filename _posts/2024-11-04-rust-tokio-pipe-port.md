---
title: rust练习, 使用tokio连接两个端口
---


```rust

use std::io::ErrorKind;
use std::sync::Arc;
use tokio;
use tokio::net::{TcpListener, TcpStream};
use tokio::spawn;

async fn pipe(rsock: Arc<TcpStream>, wsock: Arc<TcpStream>)
{
    let pipe_msg = format!("{:?} => {:?}", rsock.peer_addr(), wsock.peer_addr());
    println!("启动协程: {pipe_msg}");

    loop {
        // 等待可读
        let wait_rs = rsock.readable().await;

        let mut buf = [0; 65535];

        let read_rs = rsock.try_read(&mut buf);
        println!("{pipe_msg}, 读结果: {read_rs:?}");

        match read_rs {
            Ok(n) => {
                if n == 0 {
                    println!("{pipe_msg}, 读到0字节数据, 退出");
                    break
                }
                let read_str = String::from_utf8_lossy(&buf[0..n]);
                println!("{pipe_msg}, 读到数据: {read_str}");
                let _w_rs = wsock.try_write(&buf[0..n]);
            }
            Err(err) => {
                if err.kind() == ErrorKind::WouldBlock {
                    continue;
                }
                println!("{pipe_msg}, 错误: {err:?}");
                break;
            }
        }
    }
}

async fn process_stream(stream: TcpStream, remote: TcpStream) -> std::io::Result<()> {

    println!("开始处理连接: {:?} <=> {:?}", stream.peer_addr(), remote.peer_addr());

    // let (reader, writer) = stream.into_split();
    let reader = Arc::new(stream);
    let writer = Arc::clone(&reader);

    println!("remote: {:?}", remote.peer_addr());

    // let (remote_reader, remote_writer) = remote.into_split();
    let remote_reader = Arc::new(remote);
    let remote_writer = Arc::clone(&remote_reader);

    spawn(async move {
        pipe(reader, remote_writer).await;
    });


    spawn(async move {
        pipe(remote_reader, writer).await;
    });


    Ok(())

}


#[tokio::main]
async fn main() {
    let server = TcpListener::bind("127.0.0.1:8080").await.unwrap();

    loop {
        let (socket, addr) = server.accept().await.unwrap();
        println!("收到连接: {addr}");

        spawn(async move {
            // 把8080和80连接起来
            let remote = TcpStream::connect("127.0.0.1:80").await.expect("远端口连接失败");
            let _ = process_stream(socket, remote).await;
        });
    }
}

```