---
title: sudoers 配置格式
---

使用`visudo`编辑sudo配置时, 格式如下:

```sudoers
用户 主机=(用户:组) TAG: 命令
run-trace ALL=(ALL:ALL) NOPASSWD: /usr/sbin/traceroute
```