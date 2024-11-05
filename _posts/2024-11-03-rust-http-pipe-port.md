---
title: Rust练习, 使用多线程连接两个端口
---


```rust
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

fn main()
{
    let server = TcpListener::bind("0.0.0.0:8080").unwrap();
    
    println!("服务已启动, 正在监听地址: {:?}", server.local_addr());

    for incoming_rs in server.incoming() {
        if let Err(err) = incoming_rs {
            println!("接收连接错误: {err}");
            continue;
        }

        let remote_rs = TcpStream::connect("127.0.0.1:80");
        println!("接收到连接请求 {:?}, 远端连接已建立: {:?}", incoming_rs, remote_rs);
        
        let incoming_sock = incoming_rs.unwrap();
        match remote_rs {
            Ok(remote_sock) => {
                let p_rs = process_sock(incoming_sock, remote_sock);
                println!("启动服务结果: {p_rs:?}");
            }
            Err(err) => {
                println!("remote connect error: {:?}", err);
            }
        }
    }
}

fn process_sock(incoming: TcpStream, remote: TcpStream) -> Result<(), Box<dyn std::error::Error>> {
    {
        let reader = remote.try_clone()?;
        let writer = incoming.try_clone()?;
        thread::spawn(move || {
            pipe_socket(reader, writer);
        });
    }
    {
        let reader = incoming.try_clone()?;
        let writer = remote.try_clone()?;
        thread::spawn(move || {
            pipe_socket(reader, writer);
        });
    }
    
    Ok(())
}

fn pipe_socket(mut reader: TcpStream, mut writer: TcpStream)
{
    let msg = format!("{:?} => {:?}", reader.peer_addr(), writer.peer_addr());
    let mut buf = [0; 65535]; 
    loop {
        let reader_rs = reader.read(&mut buf);
        match reader_rs {
            Ok(0) => {
                println!("{msg} 读取到0字节, 结束服务");
                break;
                
            }
            Ok(n) => {
                let writer_rs = writer.write_all(&buf[..n]);
                println!("{msg} 读取到{n} 字节, 写结果: {writer_rs:?}");
                if writer_rs.is_err() {
                    break;
                }
            }
            Err(err) => {
                println!("{msg} 读取到错误: {err}");
                break;
            }
        }
        
    }
}


```