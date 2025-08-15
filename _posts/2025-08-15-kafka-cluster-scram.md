---
title: kafka 集群 安装
---


# 机器信息

 IPV4 | IPV6 
 ---  | --- 
10.240.190.103 | 2409:800b:5a06:1c06::ce
10.240.190.92 | 2409:800b:5a06:1c06::19
10.240.190.68 | 2409:800b:5a06:1c06::a8


# 程序文件目录
`/opt/kafka4`

# 配置目录
`/opt/kafka4/kafka_2.13-4.0.0/config`

# 存储地址
`/mnt/msft_hbkafka/kafkadata/logs`


# 集群要求
同时开启 IPV4和IPV6 监听, 
集群间使用 SASL_PLAINTEXT, 
客户端使用 SASL_PLAINTEXT, 
控制器之间使用 PLAIN
生成 kafka_server_jaas.conf 文件
集群ID使用ipv4的最后一部分


# 解压文件
```bash
git config --global user.name root
git config --global user.email root@loc

cd /opt/kafka4

tar axvf kafka_2.13-4.0.0.tgz 

cd kafka_2.13-4.0.0/config
git init
git add .
git commit -m initconfig
```


# 初始化存储
```bash
#!/bin/bash

rm /mnt/msft_hbkafka/kafkadata/logs -rf

KAFKA_CLUSTER_ID=nQzUtfYR0CCzlL4MXbaEg
bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/server.properties --add-scram 'SCRAM-SHA-512=[name="admin",password="admin-Sc@9"]'
```

# 启动脚本
```bash
#!/bin/bash
CURDIR=`dirname $0`
CURDIR=`realpath $CURDIR`
CLIENT_CONFIG=$CURDIR/kafka_server_jaas.conf
echo "使用认证文件 $CLIENT_CONFIG"
export KAFKA_HEAP_OPTS="-Xms12g -Xmx24g" 
export KAFKA_OPTS="-Djava.security.auth.login.config=$CLIENT_CONFIG"
bin/kafka-server-start.sh -daemon config/server.properties
echo "查看日志文件"
echo 'tail -f logs/kafkaServer.out'
if [ "$1" == "tail" ]; then
    tail -f logs/kafkaServer.out
fi
```

# 软链logs文件

logs文件有一些日志数据, 转移到 存储盘.
```bash
cd /opt/kafka4/kafka_2.13-4.0.0
mkdir -p /mnt/msft_hbkafka/opt/kafka4/kafka_2.13-4.0.0
mv logs  /mnt/msft_hbkafka/opt/kafka4/kafka_2.13-4.0.0/
ln -s /mnt/msft_hbkafka/opt/kafka4/kafka_2.13-4.0.0/logs logs

ls -al
ls -al /mnt/msft_hbkafka/opt/kafka4/kafka_2.13-4.0.0/logs
```

# 集群测试

## 一台服务器上执行 消费者
`bash upload/run-console-consumer.sh --topic test1`

## 另一台执行生产者
`bash upload/run-console-prod.sh --topic test1`

## 列出topics
`bash upload/run-topics.sh --list`
`bash upload/run-topics.sh --describe`


## 集群连接信息
IP可以使用v4,或v6, 端口9092
kafka-client-props.conf

```conf
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
    username="admin" \
    password="admin-Sc@9";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512
```


## 列出授权表
```bash
bin/kafka-acls.sh --bootstrap-server '[::1]:9092' --command-config  upload/kafka-client-props.conf  --list
bin/kafka-acls.sh --bootstrap-server '[::1]:9092' --command-config  upload/kafka-client-props.conf  --list --topic test1
```


## 查看用户列表
```bash
bin/kafka-configs.sh --bootstrap-server localhost:9092 --command-config  upload/kafka-client-props.conf  --describe --all --entity-type users 
```

# 测试alice 用户

## 添加测试用户
```bash
bin/kafka-configs.sh --bootstrap-server localhost:9092  --command-config  upload/kafka-client-props.conf  --alter --add-config 'SCRAM-SHA-512=[iterations=8192,password=alice-secret]' --entity-type users --entity-name alice
```

## 删除 测试用户
```bash
bin/kafka-configs.sh --bootstrap-server localhost:9092  --command-config  upload/kafka-client-props.conf  --alter --delete-config 'SCRAM-SHA-512' --entity-type users --entity-name alice
```


## 允许用户 alice 读写主题 test1
```bash
bin/kafka-acls.sh --bootstrap-server localhost:9092 --command-config  upload/kafka-client-props.conf   --add --allow-principal User:alice   --operation Read --operation Write   --topic test1 
## 同时需要授权组
bin/kafka-acls.sh --bootstrap-server '[::1]:9092'  --command-config  upload/kafka-client-props.conf  --add   --allow-principal User:alice   --consumer   --topic test1   --group alice-group
```


## 报错 test2 未授权
```bash
bin/kafka-console-consumer.sh --bootstrap-server '[::1]:9092' --consumer.config "upload/alice-kafka-client-props.conf" --topic test2
bin/kafka-console-producer.sh --bootstrap-server '[::1]:9092' --producer.config "upload/alice-kafka-client-props.conf" --topic test2
```

## 正常生产消费 test1 已授权

### 注意添加组
```bash
bin/kafka-console-consumer.sh --bootstrap-server '[::1]:9092' --consumer.config "upload/alice-kafka-client-props.conf" --topic test1 --group alice-group
bin/kafka-console-producer.sh --bootstrap-server '[::1]:9092' --producer.config "upload/alice-kafka-client-props.conf" --topic test1
```




## 查询集群信息

```bash
# 注意要用最新的 checkpoint
bin/kafka-metadata-shell.sh --snapshot /mnt/msft_hbkafka/kafkadata/logs/__cluster_metadata-0/00000000000000115198-0000000009.checkpoint
# 然后执行tree命令
```


# KafkaServer.jaas

```conf
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="admin-Sc@9"
    user_admin="admin-Sc@9"
    user_native="native1087";


    org.apache.kafka.common.security.scram.ScramLoginModule required
    username="admin"
    password="admin-Sc@9"
    user_admin="admin-Sc@9"
    user_native="native1087";


};
```

# client props
```conf
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \
    username="admin" \
    password="admin-Sc@9";
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-512

```

# server.properties

```conf
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

############################# Server Basics #############################

# The role of this server. Setting this puts us in KRaft mode
process.roles=broker,controller

# The node id associated with this instance's roles
# TODO
node.id=103

# List of controller endpoints used connect to the controller cluster
# controller.quorum.bootstrap.servers=localhost:9093
controller.quorum.voters=103@10.240.190.103:9093,92@10.240.190.92:9093,68@10.240.190.68:9093

############################# Socket Server Settings #############################

# The address the socket server listens on.
# Combined nodes (i.e. those with `process.roles=broker,controller`) must list the controller listener here at a minimum.
# If the broker listener is not defined, the default listener will use a host name that is equal to the value of java.net.InetAddress.getCanonicalHostName(),
# with PLAINTEXT listener name, and port 9092.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
# listeners=PLAINTEXT://:9092,CONTROLLER://:9093
listeners=CONTROLLER://:9093,SASL_PLAINTEXT_V6://[::]:9092,SASL_PLAINTEXT_V4://:9094,LOCAL://127.0.0.1:9097

# Name of listener used for communication between brokers.
# inter.broker.listener.name=PLAINTEXT
inter.broker.listener.name=SASL_PLAINTEXT_V4

# Listener name, hostname and port the broker or the controller will advertise to clients.
# If not set, it uses the value for "listeners".
# advertised.listeners=PLAINTEXT://localhost:9092,CONTROLLER://localhost:9093
# TODO
advertised.listeners=SASL_PLAINTEXT_V6://[2409:800b:5a06:1c06::ce]:9092,CONTROLLER://10.240.190.103:9093,SASL_PLAINTEXT_V4://10.240.190.103:9094


# A comma-separated list of the names of the listeners used by the controller.
# If no explicit mapping set in `listener.security.protocol.map`, default will be using PLAINTEXT protocol
# This is required if running in KRaft mode.
controller.listener.names=CONTROLLER

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
listener.security.protocol.map=CONTROLLER:SASL_PLAINTEXT,PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL,SASL_PLAINTEXT_V4:SASL_PLAINTEXT,SASL_PLAINTEXT_V6:SASL_PLAINTEXT,LOCAL:PLAINTEXT



# 安全配置
# sasl.mechanism.inter.broker.protocol=PLAIN
# sasl.enabled.mechanisms=PLAIN
# # security.inter.broker.protocol=SASL_PLAINTEXT
# sasl.mechanism.controller.protocol=PLAIN


sasl.enabled.mechanisms=PLAIN,SCRAM-SHA-512
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-512
sasl.mechanism.controller.protocol=PLAIN



# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=12

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=24

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
# log.dirs=/tmp/kraft-combined-logs
log.dirs=/mnt/msft_hbkafka/kafkadata/logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets", "__share_group_state" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended to ensure availability such as 3.
offsets.topic.replication.factor=1
share.coordinator.state.topic.replication.factor=1
share.coordinator.state.topic.min.isr=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=72

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000



# 优化参数
auto.create.topics.enable=false
super.users=User:admin
allow.everyone.if.no.acl.found=false
authorizer.class.name=org.apache.kafka.metadata.authorizer.StandardAuthorizer
```

