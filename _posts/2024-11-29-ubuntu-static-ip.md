---
title: Ubuntu 设置静态IP
---

在目录 `/etc/netplan` 下创建一个新文件, 或使用旧文件也行

文件内容
```
network:
    ethernets:
        ens33:
            dhcp4: true
            addresses:
              - 192.168.139.128/24 # 静态IP
    version: 2
```

然后执行命令 `netplan apply`
