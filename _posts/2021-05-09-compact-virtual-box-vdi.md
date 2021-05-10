---
title: VirtualBox 磁盘空间瘦身
---

1. 启用单用户模式
    `telinit 1`
2. 只读挂载文件系统
    `mount -o remount,ro /dev/sda1`
    如果是要只读挂载根, 使用以下使用
    a. `echo s >/proc/sysrq-trigger`
    b. `echo u >/proc/sysrq-trigger`
3. 使用 [`zerofree /dev/sda1`](https://manpages.debian.org/buster/zerofree/zerofree.8.en.html) 填充未使用分区
    等到命令运行完成
4. 使用 `VBoxManager modifymedium disk 文件路径.vdi --compact`
5. 完成

