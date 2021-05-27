---
title: docker容器添加hosts映射
---

在docker容器中, 如果需要添加域名映射, 不能直接修改`/etc/hosts`.
因为直接修改`/etc/hosts`文件，容器重启后，此文件会恢复原状.

解决方案:
1. 创建network

    ```docker network create newnetworkname```
2. 在添加容器到network时, 添加别名

    ```docker network connect newnetworkname containername --alias my.domain1 --alias my.domain2```
3. 在容器中测试

    ```docker exec --it containername ping my.domain1```
