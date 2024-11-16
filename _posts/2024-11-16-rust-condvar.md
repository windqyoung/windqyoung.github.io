---
title: rust 条件变量condvar练习demo
---

```rust

use std::sync::{Arc, Condvar, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    let pair = Arc::new((Mutex::new(0), Condvar::new()));

    for i in 0..3 {
        let pair = pair.clone();
        thread::spawn(move || {
            let (lock, cvar) = &*pair;
            let mut guard = lock.lock().unwrap();

            while *guard < 5 {
                guard = cvar.wait(guard).expect("等待失败");
                println!("等待结果: i={i} v={}", *guard);
            }

            println!("等待结束: i={i} v={}", *guard);
        });
    }

    let (lock, cvar) = &*pair;
    for _ in 0..10 {
        {
            let mut guard = lock.lock().unwrap();
            *guard += 1;
            println!("+1, now is {}", *guard);
        }
        cvar.notify_all();
        thread::sleep(Duration::from_secs(1));
    }
}

```