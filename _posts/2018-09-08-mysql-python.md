---
title: MySQL使用Python连接
---


```
# pip install mysql-connector-python

import mysql.connector as mc

conn = mc.connect(host='127.0.0.1', port=3306, user='root', password='1234', db='sakila');

c = conn.cursor(dictionary=True);

c.execute('select * from actor where actor_id > %s', (10,))

print(c.fetchall())

```
