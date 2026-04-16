---
title: systemd-notify 的使用
---

**test1.service**

```systemd
[Unit]
Description=Test1 Service
After=network.target

[Service]
Type=notify
NotifyAccess=all
ExecStart=/bin/bash test1-service.sh
Restart=always
```

**test1-service.sh**

```bash
#!/bin/bash
env  

ST=1

systemd-notify  --status 状态1
systemd-notify --ready
echo 准备好

systemd-notify  --reloading

sleep 5
systemd-notify --ready

while true; do 
    sleep 1
    ST=$((ST+1))
    systemd-notify  --status 状态$ST
done
```