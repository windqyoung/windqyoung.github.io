---
title: rust静态链接libc
---


通过如下参数开启libc的静态链接

```
rustc -C target-feature=+crt-static foo.rs
```

如果要在cargo是使用, 设置环境变量如下

```
RUSTFLAGS='-C target-feature=+crt-static' cargo build
```

在powershell中, 如下

```
$env:RUSTFLAGS='-C target-feature=+crt-static'
cargo build
```