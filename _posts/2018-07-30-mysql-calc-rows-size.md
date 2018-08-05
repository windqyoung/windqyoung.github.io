---
title: 计算mysql的行大小
---


mysql表大列数为4096.

mysql最大行限制为65536字节, 由所有列共享.



# null
---
如果有null值, 每列额外加1 bit

# text, blob
---
TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT 分别额外增加 9, 10, 11, 12 byte


# 数字类型
---
| 类型 | 长度 |
| --- | --- |
| TINYINT | 1 byte | 
| SMALLINT | 2 bytes | 
| MEDIUMINT | 3 bytes | 
| INT, INTEGER | 4 bytes | 
| BIGINT | 8 bytes | 
| FLOAT(p) | 4 bytes if 0 <= p <= 24, 8 bytes if 25 <= p <= 53 | 
| FLOAT | 4 bytes | 
| DOUBLE [PRECISION], REAL | 8 bytes | 
| DECIMAL(M,D), NUMERIC(M,D) | Varies; see following discussion | 
| BIT(M) | approximately (M+7)/8 bytes | 


# decimal
---
每9个数字需要4字节

不足9个数字的如下:

| Leftover Digits | Number of Bytes |
| --- | --- |
| 0 | 0 |
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 2 |
| 5 | 3 |
| 6 | 3 |
| 7 | 4 |
| 8 | 4 |

# 时间日期
---

Data Type | Storage Required Before MySQL 5.6.4 | Storage Required as of MySQL 5.6.4
--- | --- | ---
YEAR | 1 byte | 1 byte
DATE | 3 bytes | 3 bytes
TIME | 3 bytes | 3 bytes + fractional seconds storage
DATETIME | 8 bytes | 5 bytes + fractional seconds storage
TIMESTAMP | 4 bytes | 4 bytes + fractional seconds storage

# 时间的小数部分
---


Fractional Seconds Precision | Storage Required
--- | ---
0 | 0 bytes
1, 2 | 1 byte
3, 4 | 2 bytes
5, 6 | 3 bytes


# 字符串
---
M = 字符数, L = 字符数 * 字符占用字节(最大)

Data Type | Storage Required
--- | ---
CHAR(M) | The compact family of InnoDB row formats optimize storage for variable-length character sets. See COMPACT Row Format Characteristics. Otherwise, M × w bytes, <= M <= 255, where w is the number of bytes required for the maximum-length character in the character set.
BINARY(M) | M bytes, 0 <= M <= 255
VARCHAR(M), VARBINARY(M) | L + 1 bytes if column values require 0 − 255 bytes, L + 2 bytes if values may require more than 255 bytes
TINYBLOB, TINYTEXT | L + 1 bytes, where L < 28
BLOB, TEXT | L + 2 bytes, where L < 216
MEDIUMBLOB, MEDIUMTEXT | L + 3 bytes, where L < 224
LONGBLOB, LONGTEXT | L + 4 bytes, where L < 232
ENUM('value1','value2',...) | 1 or 2 bytes, depending on the number of enumeration values (65,535 values maximum)
SET('value1','value2',...) | 1, 2, 3, 4, or 8 bytes, depending on the number of set members (64 members maximum)