---
title: ubuntu/debian 下, 中文乱码问题解决
---

[文档说明](https://manpages.debian.org/bullseye/locales/locale-gen.8.en.html)
```

# 查看支持的编码
locale -a

# 安装工具
apt install locales

# 生成本地化文件
locale-gen en_US.UTF-8 zh_CN.UTF-8

# 设置使用语言
export LANG=en_US.UTF-8
locale -a


```
