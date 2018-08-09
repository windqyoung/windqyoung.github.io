---
title: MySQL函数 statement_digest_text
---

[此函数会把给定的sql语句标准化, 并添加占用符.](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-statement-digests.html)


```+------------------------------------------------------------------------------------------+
| statement_digest_text('select * from table_tbl where c1 = 1 and c2 = c3 or c4 = "text"') |
+------------------------------------------------------------------------------------------+
| SELECT * FROM `table_tbl` WHERE `c1` = ? AND `c2` = `c3` OR `c4` = ?                     |
+------------------------------------------------------------------------------------------+

```