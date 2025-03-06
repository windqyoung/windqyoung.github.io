---
title: mock sse数据未刷新问题
---

在进行前端开发时, 使用mock插件提供的server, 
用这个服务器写sse接口, 浏览器总是收不到实时数据
经过各种资料和测试, 是server启动了压缩中间件,
这个中间件总是等数据全了才会刷新,
同时这个插件也给 `response` 对象提供了`flush`方法, 调用一下即可.

说明地址

https://express.js.cn/en/resources/middleware/compression.html

https://www.npmjs.com/package/compression
