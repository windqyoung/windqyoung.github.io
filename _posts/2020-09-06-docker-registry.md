---
title: 部署 docker registry
---

[官方部署文档](https://docs.docker.com/registry/deploying/)
[使用非安全证书文档](https://docs.docker.com/registry/insecure/)

# 不使用https证书

直接修改文件 `C:\ProgramData\docker\config\daemon.json`,
`/etc/docker/daemon.json`, 添加以下内容:

```json
{
    "insecure-registries" : ["myregistrydomain.com:5000"]
}
```

当 `docker push` 时, 会使用 `http` 协议, 否则除了 `localhost` 之外,
会使用 `https` 协议.

# 使用https证书

```
# 创建证书
# 创建IP证书(是域名则不需要), 要包含 `-addext "subjectAltName=IP:192.168.56.120"`

IP=192.168.56.120
DOMAIN=192.168.56.120
PORT=5443

mkdir certs

openssl req -new -x509 -nodes \
  -newkey rsa:4096 -keyout certs/domain.key \
  -out certs/domain.crt \
  -subj "/CN=$DOMAIN/" \
  -addext "subjectAltName=IP:$IP"


# 安装自签名证书
# linux
mkdir /etc/docker/certs.d/$DOMAIN:$PORT -p
cp certs/domain.crt /etc/docker/certs.d/$DOMAIN:$PORT/ca.crt
# windows
# 安装为可信根证书


# 启动 `docker registry`

docker run -d --restart=always \
  --name myregistry \
  -v "$(pwd)"/certs:/certs \
  -v "$(pwd):/var/lib/registry" \
  -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  -p $PORT:443 \
  registry


# 测试推送
# docker tag registry $DOMAIN:$PORT/registry
# docker push $DOMAIN:$PORT/registry
```
