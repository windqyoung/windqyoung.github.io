---
title: rust练习 cpu多线程计算
---

```rust

use chrono::Local;
use clap::Parser;
use rand::Rng;
use std::thread;
use std::time::{Duration, Instant};
use sysinfo::System;

#[derive(Parser, Debug, Clone)]
#[command(version, about, long_about = None)]
struct Args {
    #[arg(long, help = "使用的线程数", default_value_t = 2)]
    thread_count: u32,

    #[arg(long, default_value_t = 50, help = "每个线程执行计算的时间比例",
        value_parser = clap::value_parser!(u32).range(1..100)
    )]
    thread_percent: u32,

    #[arg(long, default_value_t = 30, help = "CPU总的最大的一分钟负载, 达到后, 程序睡眠. 此值为 (htop_load_average_1分钟 / CPU核数 * 100)",
        value_parser = clap::value_parser!(u32).range(1..100)
    )]
    max_load_average_percent: u32,

    #[arg(long, action=clap::ArgAction::SetTrue)]
    verbose: bool,
}

fn run_task(tid: u32, args: Args) {
    let sys = System::new_all();
    let cpu_nb = sys.cpus().len();

    let max_load_avg = args.max_load_average_percent as f64 / 100f64 * cpu_nb as f64;

    println!(
        "[{:?}]启动线程: {tid}, CPU: {cpu_nb}, 最大负载: {max_load_avg:.2}(={}%x{})",
        Local::now(),
        args.max_load_average_percent,
        cpu_nb,
    );

    let mut rng = rand::rng();

    loop {
        // 秒
        let run_interval = rng.random_range(5..10) as f64;
        let run_sec = run_interval * args.thread_percent as f64 / 100f64;
        let sleep_sec = run_interval - run_sec;

        let run_du = Duration::from_secs_f64(run_sec);
        let sleep_du = Duration::from_secs_f64(sleep_sec);

        if args.verbose {
            println!(
                "[{:?}]线程{tid} 执行计算: {run_du:?}, 睡{sleep_du:?}",
                Local::now()
            );
        }

        let now = Instant::now();
        let mut sum: i64 = 0;
        loop {
            if now.elapsed() > run_du {
                break;
            }

            sum = sum.wrapping_add(1);
        }

        if args.verbose {
            println!(
                "[{:?}]线程{tid} 执行睡眠: {run_du:?}, 睡{sleep_du:?}",
                Local::now()
            );
        }
        thread::sleep(sleep_du);

        loop {
            let load_avg = System::load_average();
            if load_avg.one < max_load_avg {
                break;
            }
            let sleep_du = Duration::from_secs(rng.random_range(5..10));

            if args.verbose {
                println!(
                    "[{:?}]线程{tid} 检测到超过最大负载 {} > {}, 睡眠 {:?}",
                    Local::now(),
                    load_avg.one,
                    max_load_avg,
                    sleep_du
                );
            }

            thread::sleep(sleep_du);
        }
    }
}

fn main() {
    let args = Args::parse();

    println!(
        "启动线程 {}, 每线程计算时间占比: {}%, 最高负载: {}%, 打印日志: {}",
        args.thread_count, args.thread_percent, args.max_load_average_percent, args.verbose
    );

    for tid in 0..args.thread_count {
        let args = args.clone();
        thread::spawn(move || {
            run_task(tid, args);
        });
    }

    let sys = System::new_all();
    let cpu_nb = sys.cpus().len();


    let sleep_du = Duration::from_millis(5000);
    loop {
        thread::sleep(sleep_du);

        let avg = System::load_average();

        println!(
            "[{:?}]当前负载: {:.2}%, {:?}",
            Local::now(),
            avg.one / cpu_nb as f64 * 100f64,
            avg,
        );
    }
}


```