---
title: Docker使用systemd启动
---

大概思路是在镜像中安装systemd, 启动容器的时候添加参数 `--privileged`, 启动命令是 init

操作步骤, 以ubuntu为例
1. 启动ubuntu容器

    docker run --it --name docker-systemd ubuntu bash

2. 安装systemd, 如果已经安装了则忽略.

    apt update ; apt install systemd

3. 打包镜像

    docker commit docker-systemd docker-systemd.c

4. 启动支持systemd的容器

    docker run -d --privileged --name docker-with-systemd docker-systemd.c init

