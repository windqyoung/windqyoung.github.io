---
title: 配置 apache https 验证客户端证书
---

# 启动服务器
1. 启动 docker

    `docker run -d -p 15443:443 php:apache`
2. 生成 phpinfo 文件

    `echo '<?php phpinfo();' > /var/www/html/phpinfo.php`    

# 生成证书文件
1. 进入目录

    `mkdir /etc/apache2/ssl`

    `cd /etc/apache2/ssl`
2. 生成服务器密钥

    `openssl genrsa -out serverkey.pem 2048`
3. 生成服务器证书

    `openssl req -new -x509 -out serverca.pem -key serverkey.pem`
4. 生成客户端密钥

    `openssl genrsa -out clientkey.pem 2048`
5. 生成客户端签名请求

    `openssl req -new -key clientkey.pem -out clientreq.pem`
6. 使用(3)生成的证书对(5)签名
    
    `openssl x509 -req -in clientreq.pem -out clientca.pem -CA serverca.pem -CAkey serverkey.pem -CAcreateserial`
    
7. 制作 pfx12 文件

    `openssl pkcs12 -export -in clientca.pem -inkey clientkey.pem -out client.pfx` 
8. 把(7)pfx12 文件导入windows, 一直点下一步       


# 配置 apache
1. 启用 apache ssl 模块

    `a2enmod ssl`
2. 启用 apache ssl 配置

    `a2ensite default-ssl.conf`
3. 修改 ssl 配置

    `vim /etc/apache2/sites-enabled/default-ssl.conf`
    ```apacheconfig
    SSLCertificateFile /etc/apache2/ssl/serverca.pem
    SSLCertificateKeyFile /etc/apache2/ssl/serverkey.pem
    
    # ca使用服务器相同的证书
    SSLCACertificateFile /etc/apache2/ssl/serverca.pem
    
    SSLVerifyClient require
    SSLVerifyDepth  10
    ``` 
4. 重启

    `service apache2 reload`


# nginx 配置
    5条指令一模一样