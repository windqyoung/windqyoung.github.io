---
title: mysql通过复制.ibd文件来复制表
---

*要求*: innodb_file_per_table=on

源表
```
CREATE TABLE t(c1 INT) ENGINE=InnoDB;
FLUSH TABLES t FOR EXPORT;
# 复制文件 t.cfg, t.ibd 到目录数据库
UNLOCK TABLES;
```

目标表
```
# 要求同名,同结构
CREATE TABLE t(c1 INT) ENGINE=InnoDB;
ALTER TABLE t DISCARD TABLESPACE;
# t.cfg, t.ibd 复制之后
ALTER TABLE t IMPORT TABLESPACE;
```