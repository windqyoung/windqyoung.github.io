---
title: wget 下载整个网站
---

1. `--debug` 可以看到处理详情
2. `-P` `--prefix` 指定保存目录
3. `--adjust-extension` `-E` 按mimetype修改扩展名
4. `--header="Host: foo.bar"`
5. `--referer=url`
6. `--convert-links` `-k` 转换下载页面中的连接地址为本地连接地址(即不需要服务器就可以正常查看)
7. `--page-requisites` `-p` 把当前页面正确显示依赖的css, img都下载下来, 无视`--level`的配置
8. `--span-hosts` `-H` 跨主机递归下载
9. `-I list` `--include-directories=list` 要下载的url中的目录
10. `--no-parent` `-np` 不下载父目录
11 `--restrict-file-names=modes` 文件名转义规则, 例如 `windows` `unix`
12. `-K` `--backup-converted` 改扩展名之前保留文件原始文件名

### 克隆某个地址到本地
`wget -r -P 本地目录 -E -k -p -H -np --restrict-file-names=windows http://host/path/to`
