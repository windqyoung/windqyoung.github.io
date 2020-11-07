---
title: nginx 无缓冲刷新数据
---

[文档说明](https://www.nginx.com/resources/wiki/start/topics/examples/x-accel/)

```php

# 关闭nginx的代理缓冲
header('X-Accel-Buffering: no');

for ($i = 0; $i < 10; $i ++) {  
    echo $i . date('c') . "<br>\n";
    ob_flush();
    flush();
}

```