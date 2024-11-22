---
title: rust 练习, 调用wsl git命令
---

```rust
use std::env;
use std::process::{Command, ExitCode};

fn main() -> ExitCode {

    let mut command = Command::new("wsl");
    command.arg("git");

    for arg in env::args().skip(1) {
        command.arg(arg);
    }

    let mut child = command.spawn().expect("启动wsl失败");

    let rs = child.wait().expect("执行wsl git失败");

    ExitCode::from(rs.code().unwrap_or(-1) as u8)
}

```
