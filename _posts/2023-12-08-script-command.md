---
title: 如何记录控制台的操作日志
---

在linux中, 可以使用 script 命令记录终端上的操作到文件中

可以使用命令 mkfifo创建一个管道, 另一个用户可以通过管道查看操作记录.

1. 记录操作到文件中
   
    script logfile

2. 追加操作到文件中

    script -a logfile

3. 记录操作到当前目录的 typescript 文件中(默认)

    script

3. 记录操作到管道中

    mkfifo fifo-script
    script fifo-script

4. 在另外一个终端中可以通过 tail 命令观察, 管理只能有一个消费者
    tail -f fifo-script

