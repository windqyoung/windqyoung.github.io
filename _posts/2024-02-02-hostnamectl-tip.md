---
title: hostnamectl修改主机名时注意
---

要注意把主机名加到 `/etc/hosts` 文件中.

曾经遇到一个问题, 修改主机名后, python的邮件模块崩溃了.
因为python发邮件时, 需要查询主机名IP, 结果直接报错, 退出了.
