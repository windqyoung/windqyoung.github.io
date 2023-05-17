---
title: Postgres数据库开启日志记录
---

```
# 日志目录, 在数据目录下
log_directory = 'log'
# 收集
logging_collector = on
# 日志文件, 可以带时间参数
log_filename = 'postgresql-dev.log'
# 记录全部日志
log_statement = 'all'
```