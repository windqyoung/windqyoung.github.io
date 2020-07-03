---
title: PHP $_SERVER 总结

---

# 示例
 以`URL = http://s.com/path/to/file.php/pathinfo/to/info/?q1=qv1&q2=qv2`, `DOCUMENT_ROOT = /var/www/html` 为例

# REQUEST_URI
URL中域名端口之后, #之前的部分
:= `$PHP_SELF?$QUERY_STRING`
:= `$SCRIPT_NAME$PATH_INFO?$QUERY_STRING`

# SCRIPT_NAME
以WEB服务器根目录开始的脚本路径
`/path/to/file.php`

# QUERY_STRING
第一个问号之后的部分
`q1=qv1&q2=qv2`

# SCRIPT_FILENAME
以文件系统根开始的路径
`/var/www/html/path/to/file.php`

# PATH_INFO
附在`SCRIPT_NAME`之后, 问号之前的部分
`/pathinfo/to/info/`

# PATH_TRANSLATED
把`PATH_INFO`转换成文件系统路径, 前缀为`DOCUMENT_ROOT`
:= `$DOCUMENT_ROOT$PATH_INFO` 

# PHP_SELF
:= `$SCRIPT_NAME$PATH_INFO`
