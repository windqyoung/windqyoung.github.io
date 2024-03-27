---
title: VirtualBox Soft Lockup 问题解决记录
---


在使用VirtualBox虚拟机的时候, 经常报类似 
`BUG: soft lockup - CPU#1 stuck for 23s! [systemd:1]` 的错误.
虚拟机经常会卡住不动, 需要按一下键盘才能继续跑.


在vbox论坛查看解决方法, 都是说要关掉hyper-v虚拟机, 但这个功能本身就是关的.
后面在程序和功能列表中, 看到另一个叫`虚拟机平台`的功能, 把这功能关闭, 发现vbox运行正常了.
不卡, 占用内存也小了.

经测试`虚拟机平台`这个功能是用于wsl的.
