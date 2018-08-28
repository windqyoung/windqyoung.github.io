---
title: ajax 跨域获取cookie
---


```
// 服务器端
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : ''));
header('Access-Control-Allow-Credentials: true');

```

```
// 客户端
var url = 'http://localhost/path';
$.ajax({
    type: 'post',
    url: url,
    data: {
        name: 'admin',
        password: '1234',
    },
    xhrFields: {
        withCredentials: true
    },
});
```
