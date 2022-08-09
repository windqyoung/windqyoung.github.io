---
title: 使用docker搭建rabbitmq集群记录
---


1. 创建三个docker实例

2. 创建主节点, 导出三个端口供外部访问

    `docker run -d --name rab1 --hostname=rab1 --network=dev.local -p 4600:5672 -p 4601:15672 -p 4602:15692 rabbitmq`

3. 创建节点2,3

    `docker run -d --name rab2 --hostname=rab2 --network=dev.local rabbitmq`

    `docker run -d --name rab3 --hostname=rab3 --network=dev.local rabbitmq`

4. 同步三个节点的cookie

    `docker cp rab1:/var/lib/rabbitmq/.erlang.cookie .`

    `docker cp .erlang.cookie rab2:/var/lib/rabbitmq/.erlang.cookie`

    `docker cp .erlang.cookie rab3:/var/lib/rabbitmq/.erlang.cookie`

5. 重启2,3节点, 因为cookie变了

    `docker restart rab2 rab3`

6. 在节点1上执行

    创建用户及赋权

    `rabbitmqctl add_user admin admin ; rabbitmqctl set_user_tags admin administrator`

    启动http插件
    
    `rabbitmq-plugins enable rabbitmq_management`

7. 在2,3上执行命令, 加信节点1的集群

    `rabbitmqctl stop_app ; rabbitmqctl join_cluster rabbit@rab1 ; rabbitmqctl start_app`    