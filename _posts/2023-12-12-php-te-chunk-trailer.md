---
title: PHP输出chunked格式的消息,附带trailer尾部
---

```php
<?php
// chunk.php
// 经测试, 不能加 ob_flush(), 原因未知

function chunk_print($msg)
{
    printf("%x\r\n%s\r\n", strlen($msg), $msg);
    flush();
}

// 主动发送 TE 头后, 输出由PHP完全决定, 需要符合 TE=chunked 格式, 否则客户端无法识别
header('Transfer-Encoding: chunked');
header('Trailer: X-My-Tr');
flush();

// 构建自定义HTTP输出
chunk_print("helo");
chunk_print("");

// 最后的挂载完全自定义
echo "X-My-Tr: this is a header\r\n";
flush();
```

curl 请求命令 `curl localhost/chunk.php -i --raw -H "TE: trailers"`
输出结果
```
HTTP/1.1 200 OK
Date: Tue, 12 Dec 2023 06:35:28 GMT
Server: Apache/2.4.41 (Ubuntu)
Transfer-Encoding: chunked
Trailer: X-My-Tr
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8

4
helo
0

X-My-Tr: this is a header
```
