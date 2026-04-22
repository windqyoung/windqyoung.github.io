---
title: seatunnel Dockerfile
---
 
```dockerfile
FROM ubuntu:24.04


# ENV TZ=Asia/Shanghai
# 设置环境变量
ENV LANG=zh_CN.UTF-8

COPY seatunnel /opt/seatunnel
WORKDIR /opt/seatunnel

RUN <<EOF
#!/bin/bash


mv /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak


echo '
Types: deb
URIs: http://mirrors.aliyun.com/ubuntu
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://mirrors.aliyun.com/ubuntu
Suites: noble-security
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

' > /etc/apt/sources.list.d/aliyun.sources

apt update
echo -e "5\n69\n" | apt install tzdata
apt install -y locales lsof wget curl telnet net-tools inetutils-ping htop dnsutils
apt install -y openjdk-8-jdk
# 生成中文 UTF-8 语言包
locale-gen zh_CN.UTF-8

rm -rf /var/lib/apt/lists/* 
apt clean -y


mkdir -p ~/.m2

echo '<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
  <mirrors>
    <mirror>
        <id>aliyunmaven</id>
        <mirrorOf>*</mirrorOf>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </mirror>

  </mirrors>

</settings>


' > ~/.m2/settings.xml

sh /opt/seatunnel/bin/install-plugin.sh

/opt/seatunnel/mvnw dependency:get -Dtransitive=false -DgroupId=com.mysql -DartifactId=mysql-connector-j -Dversion=8.4.0 -Ddest=/opt/seatunnel/lib
/opt/seatunnel/mvnw dependency:get -Dtransitive=false -DgroupId=org.postgresql -DartifactId=postgresql -Dversion=42.7.10 -Ddest=/opt/seatunnel/lib


rm -rf ~/.m2

EOF


```