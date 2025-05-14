---
title: ceph18集群安装记录
---


# 主机列表

10.1.2.14
10.1.2.15
10.1.2.16

# hosts 文件内容

10.1.2.14 host-10-1-2-14
10.1.2.15 host-10-1-2-15
10.1.2.16 host-10-1-2-16

# 更新docker 

dnf remove docker-ce docker-scan-plugin 
dnf list --installed | grep docker
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 解散集群操作

cephadm rm-cluster --force --fsid $(ceph fsid)

systemctl stop ceph.target
rm  /etc/systemd/system/ceph* -rf

docker ps

systemctl list-units 'ceph*'



# 在mon节点上执行以下命令

1. 卸载旧 cephadm 和 ceph-common
[root@host-10-1-2-14 ~]# dnf list --installed | grep ceph
[root@host-10-1-2-14 ~]# dnf remove ceph ceph-common
[root@host-10-1-2-14 ~]# dnf list --installed | grep ceph
[root@host-10-1-2-14 ~]# systemctl list-units 'ceph*'

2. 安装版本18 cephadm 和 ceph-common
[root@host-10-1-2-14 ~]# dnf install cephadm ceph-common ceph-volume ceph-fuse -y

3. 擦除旧的磁盘数据
[root@host-10-1-2-14 ~]# lsblk
[root@host-10-1-2-14 ~]# ceph-volume lvm zap --destroy /dev/vdc 
[root@host-10-1-2-14 ~]# lsblk

6. 添加 harbor域名 
[root@host-10-1-2-14 opt]# cat /etc/hosts
[root@host-10-1-2-14 opt]# echo "10.1.2.100 harbor" >> /etc/hosts
[root@host-10-1-2-14 opt]# echo >> /etc/hosts

7. 编辑docker 安全域名 
vim /etc/docker/daemon.json

cat <<EOF
{
    "insecure-registries": ["https://harbor:8082","harbor:8082"]
}
EOF

8. 重启docker, 登录harbor
[root@host-10-1-2-14 opt]# systemctl restart docker
[root@host-10-1-2-14 opt]# docker login harbor:8082

9. 初始化配置文件  bootstrap.ini

```ini
[global]

# 默认值为 false ，如果要启用 IPv6 ，请将其设置为 true
ms_bind_ipv6 = true

[mgr]

; container_image = harbor:8082/library/m.daocloud.io/quay.io/ceph/ceph@sha256:6ac7f923aa1d23b43248ce0ddec7e1388855ee3d00813b52c3172b0b23b37906
; mgr/cephadm/container_image_base = harbor:8082/library/quay.io/ceph/ceph
mgr/cephadm/container_image_alertmanager = harbor:8082/library/quay.io/prometheus/alertmanager:v0.25.0
mgr/cephadm/container_image_elasticsearch = harbor:8082/library/quay.io/omrizeneva/elasticsearch:6.8.23
mgr/cephadm/container_image_grafana = harbor:8082/library/quay.io/ceph/ceph-grafana:9.4.7
mgr/cephadm/container_image_haproxy = harbor:8082/library/quay.io/ceph/haproxy:2.3
mgr/cephadm/container_image_jaeger_agent = harbor:8082/library/quay.io/jaegertracing/jaeger-agent:1.29
mgr/cephadm/container_image_jaeger_collector = harbor:8082/library/quay.io/jaegertracing/jaeger-collector:1.29
mgr/cephadm/container_image_jaeger_query = harbor:8082/library/quay.io/jaegertracing/jaeger-query:1.29
mgr/cephadm/container_image_keepalived = harbor:8082/library/quay.io/ceph/keepalived:2.2.4
mgr/cephadm/container_image_loki = harbor:8082/library/docker.io/grafana/loki:2.4.0
mgr/cephadm/container_image_node_exporter = harbor:8082/library/quay.io/prometheus/node-exporter:v1.5.0
mgr/cephadm/container_image_nvmeof = harbor:8082/library/quay.io/ceph/nvmeof:1.0.0
mgr/cephadm/container_image_prometheus = harbor:8082/library/quay.io/prometheus/prometheus:v2.43.0
mgr/cephadm/container_image_promtail = harbor:8082/library/docker.io/grafana/promtail:2.4.0
mgr/cephadm/container_image_snmp_gateway = harbor:8082/library/docker.io/maxwo/snmp-notifier:v1.2.1


```

10. 查看机器ip
[root@host-10-1-2-14 ceph-install]# ip addr

11. cephadm 部署集群       
[root@host-10-1-2-14 ceph-install]# cephadm --image harbor:8082/library/quay.io/ceph/ceph:v18 bootstrap --config bootstrap.ini --mon-ip 2409:xxxx::15f,10.1.2.14 


12. 部署结果
Ceph Dashboard is now available at:

             URL: https://host-10-1-2-16:8443/
            User: admin
        Password: 12345678

Enabling client.admin keyring and conf on hosts with "admin" label
Saving cluster configuration to /var/lib/ceph/b46d9718-145f-11f0-b5a7-fa163e4567d1/config directory
Enabling autotune for osd_memory_target
You can access the Ceph CLI as following in case of multi-cluster or non-default config:

        sudo /usr/sbin/cephadm shell --fsid b46d9718-145f-11f0-b5a7-fa163e4567d1 -c /etc/ceph/ceph.conf -k /etc/ceph/ceph.client.admin.keyring

Or, if you are only running a single cluster on this host:

        sudo /usr/sbin/cephadm shell 

Please consider enabling telemetry to help improve Ceph:

        ceph telemetry on

For more information see:

        https://docs.ceph.com/en/latest/mgr/telemetry/

Bootstrap complete.


13. 检查结果
[root@host-10-1-2-14 ceph-install]# ceph orch host ls
HOST                ADDR                          LABELS  STATUS  
host-10-1-2-14  2409:xxxx::1df  _admin          
1 hosts in cluster
[root@host-10-1-2-14 ceph-install]# ceph -s
  cluster:
    id:     e9b12066-0eab-11f0-ba8e-fa163e3df45b
    health: HEALTH_OK
 
  services:
    mon: 1 daemons, quorum host-10-1-2-14 (age 60s)
    mgr: host-10-1-2-14.obwzzc(active, since 19s)
    osd: 0 osds: 0 up, 0 in
 
  data:
    pools:   0 pools, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 B used, 0 B / 0 B avail
    pgs:     


14. 添加主机

## 把公钥放到主机的 /root/.ssh/authorized_keys 权限 644
ceph cephadm get-pub-key > ceph.pub
ssh-copy-id -f -i ./ceph.pub host-10-1-2-14
ssh-copy-id -f -i ./ceph.pub host-10-1-2-15
ssh-copy-id -f -i ./ceph.pub host-10-1-2-16


## 注意: 主机名要和hostname的返回值相同
ceph orch host add host-10-1-2-15 2409:xxxx::15f
ceph orch host add host-10-1-2-16 2409:xxxx::1c6
ceph orch host add host-10-1-2-14 2409:xxxx::1df

## 查看主机列表
ceph orch host ls

## 查看服务列表
ceph orch ls

### 问题处理 node-exporter 端口和 主机上本地部署的 node-exporter 有冲突, 换一端口

cat <<EOF > node-exporter-config.yaml
service_type: node-exporter
placement:
  host_pattern: '*'
spec:
  port: 9137  # 替换为新的端口号，例如 9200
EOF


ceph orch apply -i node-exporter-config.yaml



15. 添加osd磁盘

## 查看可用 磁盘
ceph orch device ls

HOST                PATH      TYPE  DEVICE ID              SIZE  AVAILABLE  REFRESHED  REJECT REASONS  
host-10-1-2-14  /dev/vdb  hdd   61ff8d3a-fc94-4f03-9   100G  Yes        18m ago                    
host-10-1-2-14  /dev/vdc  hdd   1238abd0-d17d-4eee-a  9900G  Yes        18m ago                    
host-10-1-2-15  /dev/vdb  hdd   0e03d1e5-22e1-4023-b   100G  Yes        4m ago                     
host-10-1-2-15  /dev/vdc  hdd   b5b8da58-46db-4660-9  9900G  Yes        4m ago                     
host-10-1-2-16  /dev/vdb  hdd   acdcf561-efbf-49bd-b   100G  Yes        3m ago                     
host-10-1-2-16  /dev/vdc  hdd   53301663-8160-4986-a  9900G  Yes        3m ago     
## 添加磁盘
ceph orch daemon add osd host-10-1-2-14:/dev/vdc
ceph orch daemon add osd host-10-1-2-15:/dev/vdc
ceph orch daemon add osd host-10-1-2-16:/dev/vdc


16. 验证

## a. 验证 block 设备

### 创建rbd 池
[root@host-10-1-2-14 mnt]# ceph osd pool create pool1
[root@host-10-1-2-14 mnt]# ceph osd pool application enable pool1 rbd
[root@host-10-1-2-14 mnt]# rbd pool init -p pool1pool 'pool1' created
[root@host-10-1-2-14 mnt]# ceph osd pool application enable pool1 rbd
enabled application 'rbd' on pool 'pool1'
[root@host-10-1-2-14 mnt]# rbd pool init -p pool1
[root@host-10-1-2-14 mnt]# ceph osd pool ls
pool1

### 创建rbd image
rbd create image1 --size 1024 --pool pool1

### 列出池设备
rbd ls pool1

[root@host-10-1-2-14 mnt]# rbd --image image1 info --pool pool1
rbd image 'image1':
        size 1 GiB in 256 objects
        order 22 (4 MiB objects)
        snapshot_count: 0
        id: 3c0fd02af3cf
        block_name_prefix: rbd_data.3c0fd02af3cf
        format: 2
        features: layering, exclusive-lock, object-map, fast-diff, deep-flatten
        op_features: 
        flags: 
        create_timestamp: Thu Apr  3 15:20:10 2025
        access_timestamp: Thu Apr  3 15:20:10 2025
        modify_timestamp: Thu Apr  3 15:20:10 2025

#### 内核挂载

ceph osd pool create pool2
ceph osd pool application enable pool2 rbd
rbd pool init -p pool2
rbd create image1 --size 1024 --pool pool2 --image-feature layering
rbd map --pool pool2 image1 --id admin

rbd map --pool pool1 image1 --id admin

rbd device map pool1/image1 --id admin


## b. 验证 volume 设备

### 创建 volume 
### 方法1. 使用 ceph fs volume 来创建 MDS 守护进程。这将创建 CephFS 卷和与 CephFS 关联的池，也会在主机上启动 MDS 服务。
[ceph: root@host01 /]# ceph fs volume create test --placement="2"

### 方法2. 分步创建
[ceph: root@host01 /]# ceph osd pool create cephfs_data 64
[ceph: root@host01 /]# ceph osd pool create cephfs_metadata 64
[ceph: root@host01 /]# ceph fs new test cephfs_metadata cephfs_data

[ceph: root@host01 /]# ceph orch apply mds test --placement="2"

### 验证 volume
[root@host-10-1-2-14 ~]# ceph orch ls
NAME           PORTS        RUNNING  REFRESHED  AGE  PLACEMENT    
alertmanager   ?:9093,9094      1/1  9m ago     44h  count:1      
ceph-exporter                   3/3  9m ago     44h  *            
crash                           3/3  9m ago     44h  *            
grafana        ?:3000           1/1  9m ago     44h  count:1      
mds.test                        2/2  6m ago     2h   count:2      
mgr                             2/2  9m ago     44h  count:2      
mon                             3/5  9m ago     44h  count:5      
node-exporter  ?:9137           3/3  9m ago     44h  *            
osd                               3  9m ago     -    <unmanaged>  
prometheus     ?:9095           1/1  9m ago     44h  count:1      

[root@host-10-1-2-14 ~]# ceph fs ls
name: test, metadata pool: cephfs.test.meta, data pools: [cephfs.test.data ]
[root@host-10-1-2-14 ~]# ceph fs status
test - 0 clients
====
RANK  STATE                MDS                   ACTIVITY     DNS    INOS   DIRS   CAPS  
 0    active  test.host-10-1-2-15.zrlfcz  Reqs:    0 /s    10     13     12      0   
      POOL          TYPE     USED  AVAIL  
cephfs.test.meta  metadata  96.0k  9404G  
cephfs.test.data    data       0   9404G  
         STANDBY MDS            
test.host-10-1-2-16.vzmlrk  
MDS version: ceph version 18.2.4 (e7ad5345525c7aa95470c26863873b581076945d) reef (stable)
[root@host-10-1-2-14 ~]# ceph orch ps --daemon_type=mds
NAME                                HOST                PORTS  STATUS        REFRESHED  AGE  MEM USE  MEM LIM  VERSION  IMAGE ID      CONTAINER ID  
mds.test.host-10-1-2-15.zrlfcz  host-10-1-2-15         running (2h)     7m ago   2h    25.3M        -  18.2.4   2bc0b0f4375d  a24c4bdf9450  
mds.test.host-10-1-2-16.vzmlrk  host-10-1-2-16         running (2h)     7m ago   2h    22.1M        -  18.2.4   2bc0b0f4375d  6d5355e62d15  


### 清除 测试的volume

[root@host-10-1-2-14 ~]# ceph config set mon mon_allow_pool_delete true
[root@host-10-1-2-14 ~]# ceph fs volume rm test --yes-i-really-mean-it
metadata pool: cephfs.test.meta data pool: ['cephfs.test.data'] removed
[root@host-10-1-2-14 ~]# ceph fs volume rm cephfs --yes-i-really-mean-it
metadata pool: cephfs.cephfs.meta data pool: ['cephfs.cephfs.data'] removed

[root@host-10-1-2-14 ~]# ceph orch ls
NAME           PORTS        RUNNING  REFRESHED   AGE  PLACEMENT    
alertmanager   ?:9093,9094      1/1  4m ago      45h  count:1      
ceph-exporter                   3/3  7m ago      45h  *            
crash                           3/3  7m ago      45h  *            
grafana        ?:3000           1/1  4m ago      45h  count:1      
mds.cephfs                      2/2  <deleting>  4m   count:2      
mds.test                        0/2  <deleting>  2h   count:2      
mgr                             2/2  7m ago      45h  count:2      
mon                             3/5  7m ago      45h  count:5      
node-exporter  ?:9137           3/3  7m ago      44h  *            
osd                               3  7m ago      -    <unmanaged>  
prometheus     ?:9095           1/1  4m ago      45h  count:1      
[root@host-10-1-2-14 ~]# ceph orch ls
NAME           PORTS        RUNNING  REFRESHED  AGE  PLACEMENT    
alertmanager   ?:9093,9094      1/1  7s ago     45h  count:1      
ceph-exporter                   3/3  21s ago    45h  *            
crash                           3/3  21s ago    45h  *            
grafana        ?:3000           1/1  7s ago     45h  count:1      
mgr                             2/2  21s ago    45h  count:2      
mon                             3/5  21s ago    45h  count:5      
node-exporter  ?:9137           3/3  21s ago    44h  *            
osd                               3  21s ago    -    <unmanaged>  
prometheus     ?:9095           1/1  7s ago     45h  count:1      

### 重点, 恢复不可删除设置
ceph config rm mon mon_allow_pool_delete


### 测试挂载 volume

#### 创建卷
ceph fs volume create cephfs01
#### 添加卷访问用户
[root@host-10-1-2-14 ~]# ceph fs authorize cephfs01 client.1 / rw
[client.1]
        key = AQDbI/521Ubfswag==

#### 导出密钥
[root@host-10-1-2-14 ~]# ceph auth get client.1 > ceph.client.1.keyring

#### 在当前机器上挂载
[root@host-10-1-2-14 ~]# scp ceph.client.1.keyring /etc/ceph
[root@host-10-1-2-14 ~]# ll /etc/ceph/
total 20
-rw-r--r-- 1 root root 184 Apr  3 14:02 ceph.client.1.keyring

[root@host-10-1-2-14 ~]# mkdir /mnt/mycephfs
[root@host-10-1-2-14 ~]# ceph-fuse /mnt/mycephfs/ -n client.1 --client-fs=cephfs01
2025-04-03T14:04:15.671+0800 7fa9826bd5c0 -1 init, newargv = 0x555c8e882fd0 newargc=15
ceph-fuse[2562171]: starting ceph client
ceph-fuse[2562171]: starting fuse


#### 显示挂载成功
[root@host-10-1-2-14 mnt]# stat -f /mnt/mycephfs/
  File: "/mnt/mycephfs/"
    ID: 0        Namelen: 255     Type: fuseblk
Block size: 4194304    Fundamental block size: 4194304
Blocks: Total: 2407662    Free: 2407662    Available: 2407662
Inodes: Total: 2          Free: -1

#### 测试卷中的文件

[root@host-10-1-2-14 mnt]# touch /mnt/mycephfs/mounttest 
[root@host-10-1-2-14 mnt]# umount /mnt/mycephfs 
[root@host-10-1-2-14 mnt]# ll /mnt/mycephfs/
total 0
[root@host-10-1-2-14 mnt]# ceph-fuse /mnt/mycephfs/ -n client.1 --client-fs=cephfs01
2025-04-03T14:08:43.816+0800 7f1a4963a5c0 -1 init, newargv = 0x557408f6af00 newargc=15
ceph-fuse[2565977]: starting ceph client
ceph-fuse[2565977]: starting fuse
[root@host-10-1-2-14 mnt]# ll
total 1
drwxr-xr-x 2 root root 0 Apr  3 14:05 mycephfs
[root@host-10-1-2-14 mnt]# ll mycephfs/
total 0
-rw-r--r-- 1 root root 0 Apr  3 14:05 mounttest

#### 挂载volume测试通过


#### 测试挂载内核客户端
[root@host-10-1-2-14 mnt]# ceph mon dump
epoch 3
fsid 7939c920-0ed6-11f0-af2a-fa163e3df45b
last_changed 2025-04-01T08:55:08.997550+0000
created 2025-04-01T08:51:19.432897+0000
min_mon_release 18 (reef)
election_strategy: 1
0: [v2:[2409:xxxx::1df]:3300/0,v1:[2409:xxxx::1df]:6789/0] mon.host-10-1-2-14
1: [v2:[2409:xxxx::15f]:3300/0,v1:[2409:xxxx::15f]:6789/0] mon.host-10-1-2-15
2: [v2:[2409:xxxx::1c6]:3300/0,v1:[2409:xxxx::1c6]:6789/0] mon.host-10-1-2-16
dumped monmap epoch 3

mkdir  /mnt/mycephfs-kernel
mount -t ceph '[2409:xxxx::1df]:6789,[2409:xxxx::15f]:6789,[2409:xxxx::1c6]:6789:/' /mnt/mycephfs-kernel -o name=1,fs=cephfs01

mount -t ceph 1@7939c920-0ed6-11f0-af2a-fa163e3df45b.cephfs01=/ /mnt/mycephfs-kernel



# 在 非admin 结点上执行以下命令

1. 卸载旧 cephadm 和 ceph-common
dnf list --installed | grep ceph
dnf remove ceph ceph-common
dnf list --installed | grep ceph
systemctl list-units 'ceph*'


4. 安装版本18 cephadm 和 ceph-common (可选)
dnf install cephadm ceph-common ceph-volume

5.擦除旧的磁盘数据
lsblk
ceph-volume lvm zap --destroy /dev/vdc 
lsblk

6. 添加 harbor域名 
cat /etc/hosts
echo "2409:xxxx::0123 harbor harbor.k8s" >> /etc/hosts
echo >> /etc/hosts

7. 编辑docker 安装域名 
cat /etc/docker/daemon.json

cat <<EOF > /etc/docker/daemon.json
{
    "insecure-registries": ["https://harbor:8082","harbor:8082"]
}
EOF

8. 重启docker, 登录harbor
systemctl restart docker
docker login harbor:8082

9. 检查是否允许root ssh登录. 要把 `ceph cephadm get-pub-key` 有值放到.ssh目录下

