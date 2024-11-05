---
title: Rust 练习, 实现 sleep future
---

```rust 
use futures::executor::block_on;
use std::future::Future;
use std::pin::Pin;
use std::sync::{Arc, Mutex};
use std::task::Poll::Pending;
use std::task::{Context, Poll, Waker};
use std::thread::{sleep, spawn};
use std::time::Duration;

struct MyFuture
{
    state: Arc<Mutex<MyState>>,
}

///
/// 共享数据
/// 
struct MyState
{
    rt: i32,
    ok: bool,
    waker: Option<Waker>,
}

impl MyFuture
{
    fn new(sec: u64) -> Self
    {
        let state = Arc::new(Mutex::new(MyState { rt: 0, ok: false, waker: None }));

        {
            // 启动通知线程
            let state = state.clone();
            spawn(move || {
                let du = Duration::from_secs(sec);
                sleep(du);
                let mut lock = state.lock().unwrap();
                lock.ok = true;
                if let Some(waker) = lock.waker.take() {
                    println!("准备通知");
                    waker.wake();
                }
            });
        }

        MyFuture { state: state.clone() }
    }
}

impl Future for MyFuture
{
    type Output = i32;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        let mut lock = self.state.lock().unwrap();
        lock.rt += 1;
        println!("轮询{}, ok: {}", lock.rt, lock.ok);
        if lock.ok {
            Poll::Ready(lock.rt)
        } else {
            lock.waker = Some(cx.waker().clone());
            Pending
        }
    }
}

fn main()
{
    block_on(async {
        let f = MyFuture::new(3);
        let rs = f.await;
        println!("结果: {rs}");
    })
}
```