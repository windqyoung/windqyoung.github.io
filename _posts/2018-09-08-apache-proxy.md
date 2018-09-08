---
title: apache 代理配置
---


本机域名为 proxy.com

http
---
http://proxy.com/proxy => http://remote.com
```
ProxyPass /proxy http://remote.com
```

ftp
---
```
ProxyPass /ftp ftp://fpt.host.com
```
fcgi
---
```

ProxyPass /proxy fcgi://localhost:9000
<Proxy fcgi://localhost:9000>
    ProxyFCGISetEnvIf true SCRIPT_FILENAME "%{DOCUMENT_ROOT}%{REQUEST_URI}"
    ProxyFCGISetEnvIf true HTTP_TEST "%{SCRIPT_FILENAME}, %{DOCUMENT_ROOT}, %{REQUEST_FILENAME}, %{REQUEST_URI}"
</Proxy>

```
