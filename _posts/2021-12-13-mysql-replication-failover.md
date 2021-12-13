---
title: mysql复制停止从节点处理
---

[官方文档](https://dev.mysql.com/doc/refman/8.0/en/replication-gtids-failover.html)

摘录:


使用空事务
```
show slave status\G /* 查看本从节点已经执行的gtid */

SET GTID_NEXT='上一行语句中的gtid数字+1';

/* 跳过一个相同gtid的空事务 */
BEGIN;
COMMIT;

/* 恢复执行 */
SET GTID_NEXT='AUTOMATIC';


/* 启动从节点 */
start slave;

```
