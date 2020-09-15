---
title: windows端口转发
---

```
# 显示帮助
netsh interface portproxy add v4tov4 ?

netsh interface portproxy add v4tov4 listenport=20080 connectaddress=192.168.2.120 connectport=80

```