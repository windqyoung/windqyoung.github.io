---
title: Apache Nginx 配置 https
---

1. 生成证书及密钥(自签名)

```openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout apache-selfsigned.key -out apache-selfsigned.crt```

2. Apache配置


```httpd.conf
<IfModule mod_ssl.c>

    <VirtualHost *:${VM_PORT_HTTPS}>
        ServerName "${SERVER_NAME_TEMP}"
        DocumentRoot "${DOCUMENT_ROOT_TEMP}"

        SSLEngine on
        SSLCertificateFile    ${W_CERT_DIR}/${SERVER_NAME_TEMP}/apache-selfsigned.crt
        SSLCertificateKeyFile ${W_CERT_DIR}/${SERVER_NAME_TEMP}/apache-selfsigned.key
        <Directory "${DOCUMENT_ROOT_TEMP}">
            Options Indexes FollowSymLinks Includes ExecCGI
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>
</IfModule>

```

3. Nginx配置

```nginx.conf
    server {
        listen 8443 ssl;

        server_name  localhost;

        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        ssl_ciphers         AES128-SHA:AES256-SHA:RC4-SHA:DES-CBC3-SHA:RC4-MD5;
        ssl_certificate "D:/devapps/nginx/certs/localhost/apache-selfsigned.crt";
        ssl_certificate_key "D:/devapps/nginx/certs/localhost/apache-selfsigned.key";

    }

```