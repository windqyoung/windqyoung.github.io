---
title: ubuntu/debian 下, 中文乱码问题解决
---

[文档说明](https://manpages.debian.org/bullseye/locales/locale-gen.8.en.html)

```
帮助说明
 localedef --help

 Input Files:
  -f, --charmap=FILE         /usr/share/i18n/charmaps 目录下的文件名, 比如 UTF-8
  -i, --inputfile=FILE       /usr/share/i18n/locales 目录下的文件名, 比如 zh_CN

```

```

# 查看支持的编码
locale -a

# 添加语言区域字符集
localedef -f UTF-8 -i zh_CN zh_CN

# 查看支持的编码
locale -a


# 以下处理方式需要安装locales
# 安装工具
apt install locales

# 生成本地化文件
locale-gen en_US.UTF-8 zh_CN.UTF-8

# 设置使用语言
export LANG=en_US.UTF-8
locale -a


```
