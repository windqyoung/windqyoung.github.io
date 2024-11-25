---
title: Rust 练习, tcp回显服务器
---

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
                println!("已回写{n}: {:?}, {}", w_rs, peer);
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