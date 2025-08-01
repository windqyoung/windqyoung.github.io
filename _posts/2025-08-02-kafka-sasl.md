---
title: kafka认证配置
---

# 服务器
```conf

listeners=SASL_SSL://host.name:port
security.inter.broker.protocol=SASL_SSL
sasl.mechanism.inter.broker.protocol=PLAIN
# 关键点
sasl.enabled.mechanisms=PLAIN,SCRAM-SHA-256

# listener.name.client.scram-sha-256.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
#     username="admin" \
#     password="admin-secret";
# listener.name.client.plain.sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
#     username="admin" \
#     password="admin-secret" \
#     user_admin="admin-secret" \
#     user_alice="alice-secret";
```
# 服务器jaas.conf
```conf

# username 是和其它 broker 通信的。
client1.KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="admin-secret"
    user_admin="admin-secret"
    user_alice="alice-secret";
};

```

# 服务器启动
```bash
export KAFKA_OPTS="-Djava.security.auth.login.config=/mnt/d/devapps/kafka/kafka_2.13-4.0.0/kafka_server_jaas.conf"
bin/kafka-server-start.sh config/server.properties
```

# 客户端

```conf
# 三个属性都不能缺
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
    username="alice" \
    password="alice-secret";

security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN

```

# 客户端命令
```bash
bin/kafka-topics.sh  --bootstrap-server localhost:9094   --list --command-config kafka-client-props.conf
```