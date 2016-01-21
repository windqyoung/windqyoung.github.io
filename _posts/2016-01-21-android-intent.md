---
title: 对android中Intent.data的理解
---

从web的角度理解
-------------

startActivity(intent)相当于UA,  
里面的data就是服务器的地址以及URL的参数.  
mimeType可以理解为Accept, 表示UA期望服务器响应什么格式,  
如果一个服务器可以响应此格式, 那会出现在选择列表中.

*****

接收Intent的就是服务器, 解析URL参数, 来执行自己的逻辑.  

{% highlight java %}
// 和restful真是极相似  
data = Uri.parse("content://contacts/people/1")
{% endhighlight %}  
