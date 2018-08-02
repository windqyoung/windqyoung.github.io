---
title: 重置管理员密码
---


在windows下, 使用 `mysqld --skip-grant-tables --console --shared-memory`启动mysql.
此时, 可以不需要密码登录mysql, 并获得管理员权限.
然后执行 `flush privileges`, 启用认证系统.
然后修改密码: `alter user root@localhost identified by 'password'`


