---
title: 计算mysql的行大小
---

mysql最大行限制为65536字节, 由所有列共享.


varchar
---
小于等于255时, 额外加1 byte
大于255时, 额外加2 byte

null
---
如果有null值, 每列额外加1 bit

text, blob
---
TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT 分别额外增加 9, 10, 11, 12 byte

