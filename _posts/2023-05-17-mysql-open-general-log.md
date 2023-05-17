---
title: Mysql开启通用日志
---

```
#!/bin/bash
mysql -e "set global general_log = 1;"
mysql -e "select @@general_log;"

stopmysqlgeneral() {
        echo
        echo "received sig"
        mysql -e "set global general_log = 0;"
        mysql -e "select @@general_log;"
}

trap stopmysqlgeneral exit

filename=$(mysql -e 'select @@general_log_file' --skip-column-names )
tail -f $filename
```
