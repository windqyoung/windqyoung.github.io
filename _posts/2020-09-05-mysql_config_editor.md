---
title: mysql_config_editor 命令
---

```shell
# 保存主机用户名密码
mysql_config_editor set --login-path loginpathname -uuser -hhostname -p
Enter password: ************

# 显示保存的信息
mysql_config_editor print --all

# 显示密码
my_print_defaults loginpathname --show

```
