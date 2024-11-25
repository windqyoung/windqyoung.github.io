---
title: Rust 练习, tcp回显服务器
---

服务器端

```rust 
use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

fn process_stream(mut stream: TcpStream) {
    let peer = stream.peer_addr().unwrap();
    println!("Connection established! {}", peer);
    let mut br = BufReader::new(stream.try_clone().unwrap());
    loop {
        let mut buffer = String::new();
        let read_rs = br.read_line(&mut buffer);

        match read_rs {
            Ok(0) => {
                println!("Connection closed. {}", peer);
                break;
            }
            Ok(n) => {
                let w_rs = stream.write(buffer.as_bytes());
                println!("已回写{n}: {:?}, {}, {}", w_rs, peer, buffer.trim());
            }
            Err(err) => {
                println!("error: {:?}, {}", err, peer);
                break;
            }
        }
    }
}

fn main() {
    let server = TcpListener::bind("127.0.0.1:7878").unwrap();
    println!("Listening on {}", server.local_addr().unwrap());

    for stream in server.incoming() {
        let stream = stream.unwrap();
        thread::spawn(move || {
            process_stream(stream);
        });
    }
}

```


客户端
```rust
use std::io::{BufRead, BufReader, Write};
use std::net::TcpStream;
use std::thread;
use std::time::Duration;


fn process_read(sock: TcpStream) {
    let mut br = BufReader::new(sock);
    loop {
        let mut buf = String::new();
        let read_rs = br.read_line(&mut buf);
        match read_rs {
            Ok(0) => {
                println!("连接已关闭");
                break;
            }
            Ok(n) => {
                println!("收到{n}字节数据, {}", buf.trim());
            }
            Err(err) => {
                println!("发生错误: {err:?}");
            }
        }
    }
}

fn main() {
    let mut sock = TcpStream::connect("127.0.0.1:7878").unwrap();

    {
        let sock = sock.try_clone().unwrap();
        thread::spawn(move || {
            process_read(sock);
        });
    }

    for i in 0..10 {
        let msg = format!("你好, {}\r\n", i);
        sock.write(&msg.into_bytes()).unwrap();


        thread::sleep(Duration::new(1, 0));
    }
}
```