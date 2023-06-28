---
title: Docker Swarm 网络服务
---

## Docker Swarm 概念
1. 任务(Task) 一个容器
2. 服务(Service) 由多个容器组成的服务集群
3. 节点(Node) 物理宿主机

* 在Docker中, 可以创建overlay网络, 这个网络可以在整个Docker Swarm范围内通信(包括不同宿主机). 

    使用overlay网络必须启动swarm模式

## 创建overlay网络
`docker network create --driver overlay net1`


## 容器对外暴露端口时, 一个容器可以占用宿主机一个端口
`docker run -d -p 8080:80 --hostname run-host --network net1 php:8-apache`

## 服务对外暴露端口时, 一个服务可以占用宿主机一个端口
因为Docker会给服务分配一个虚拟IP(vip), 暴露的是这个VIP的端口, VIP会把流量转发到Task容器中(包括别的宿主机上的任务容器).

`docker service -p 8080:80 --hostname srv-host --network net1 php:8-apache`


如果要对外暴露服务, 
1. 在集群中启动一个nginx, 通过nginx把流量转发到后端的服务(按名称). 
2. 在集群外部启动nginx, 把流量转发到每个节点的端口上. 
3. 直接访问服务暴露的端口, 由集群自动转发流量.
