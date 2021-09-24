---
title: 创建mysql innodb cluster
---

0. 首先使用 mysqlsh 连接到服务器

1. 检查服务器配置

    dba.checkInstanceConfiguration()

2. 根据上一步的提示, 修改配置

    dba.configureInstance()

3. 在主机上执行dba.createCluster()创建集群

4. 添加从机到 cluster.addInstance()

    [主从用户密码要一致](https://dev.mysql.com/doc/mysql-shell/8.0/en/creating-user-accounts-for-admin-api.html)

5. 管理用户

    使用 Cluste.setupAdminAccount('用户名') 创建用于管理集群的用户, 并分配权限

6. 连接到主服务器

    shell.connectToPrimary([instance, password])

7. 检查集群状态

    Cluster.status()

8. innodb cluster 需要mysql router的支持.

    因为集群有故障转移功能, 在主服务器挂了之后, 会重新选出一个主服务器. mysql router 会识别这个变化, 自动修改写端口的映射地址

9. 创建mysqlrouter服务

    mysqlrouter --bootstrap localhost:3310 --directory /opt/myrouter --user mysqlrouter --account 用于获取元数据的mysql用户

10. 集群所有结点都挂了之后重启

    dba.rebootClusterFromCompleteOutage()

11. 集群中存活节点数量不足时, 将无法选出主服务器.
    此时, 需要手工处理.

    cluster.forceQuorumUsingPartitionOf('指定为主机的节点')

    如果集群中有节点状态不正常, 使用 cluster.rejoinInstance() 重新添加到集群.
