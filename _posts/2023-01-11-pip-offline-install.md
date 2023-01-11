---
title: pip 离线安装
---

1. 先下载要安装的包, 会自动下载依赖包

    `pip download --dest 目录 pip包名`

2. 把目录中的打包上传到服务器

3. 服务器执行安装命令

    `pip install --no-index --find-links 解压的目录 pip包名`

