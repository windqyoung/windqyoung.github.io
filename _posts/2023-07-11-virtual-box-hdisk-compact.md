---
title: VBox虚拟机磁盘文件空间清理
---

# 步骤如下

1. 使用单用户模式启动ubuntu

    > 开机按住shift进启动菜单, 在高级菜单下recovery模式按e, 找到linux行, 删除 `ro` 后面的内容, 追加 `single init=/bin/bash`, 然后重启

2. 使用ro选项挂载磁盘分区

    `mount -a -o ro`
    或者
    `mount -a -o remount,ro`
    
    > 如果分区显示忙, 使用 `lsof /var/lib` 查看哪些进程在使用分区, 然后关闭相应的服务/进程.

    > 如果正常启动无法关闭程序, 可以使用单用户模式启动系统, 重新挂载.
      
    
2. 使用zerofree命令把虚拟机的磁盘空间用0填充.

    ```
    for x in $(dir /dev/mapper/ubuntu--vg*); do
        echo zerofreeing $x
        zerofree -v $x
    done
    ```

3. 执行虚拟磁盘空间清理命令.

    `VBoxManage modifymedium disk ubuntu-base-node-disk001.vdi --compact`
