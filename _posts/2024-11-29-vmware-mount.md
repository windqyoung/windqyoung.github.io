---
title: VMware 挂载共享文件夹设置
---

在 `VMware Workstation` 虚拟机设置中添加共享文件夹后,
当时会把共享夹挂载到 `/mnt/hgfs` 下.

重启虚拟机后, 不会自动挂载

需要在 `/etc/fstab` 文件中添加以下设置

```fstab
.host:/ /mnt/hgfs       fuse.vmhgfs-fuse        allow_other,defaults    0       0
```

可以使用命令 `vmware-hgfsclient` 查看当前虚拟机的共享文件夹
