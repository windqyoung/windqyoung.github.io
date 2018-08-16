---
title: mysql创建表时, 指定保存目录
---

条件:
===
Innodb engine && @@global.innodb_file_per_table = 1

MyIsam随意



```
create table dir1 (id int) data directory 'e:/mysqldata';
```


