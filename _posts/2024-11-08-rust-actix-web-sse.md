---
title: Rust 练习, actix-web sse
---


```rust

use actix_web::body::BodyStream;
use actix_web::web::{Bytes};
use actix_web::{get, App, HttpResponse, HttpServer};
use futures::channel::mpsc::channel;
use futures::SinkExt;
use std::time::Duration;
use tokio::spawn;
use tokio::time::sleep;

#[get("/sse")]
async fn sse() -> HttpResponse {
    
    let (mut tx, rx) = channel(10);

    spawn(async move {
        let mut i = 0;
        loop {
            i += 1;

            let msg = format!("event: message\nid: id-{i}\ndata: helo, {}\n\n", i);
            println!("data: {}", msg);

            let rs = tx.send(Ok::<_, String>(Bytes::from(msg))).await;
            if rs.is_err() {
                println!("Error sending good stream: {rs:?}");
                break;
            }
            sleep(Duration::from_secs(1)).await;
        }
    });

    let body = BodyStream::new(rx);

    HttpResponse::Ok()
        .append_header(("Content-Type", "text/event-stream"))
        .body(body)
}

#[get("/")]
async fn index2() -> HttpResponse {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(sse).service(index2))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}

```