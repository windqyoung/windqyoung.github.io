---
title: 使用use function as来缩短长函数名
---

use function func_name as fn
-----------------
今天看到有人问PHP里有没有像C里的define一样的宏功能来缩短PHP的函数名.  
在PHP中, 宏是没有的, 不过我想到use function这个语法, 测试了一下,   
还真能把函数名改变, ***不过仅限于同一文件***

{% highlight php %}
use function htmlspecialchars as hs;

echo hs("<>"); // => &lt;&gt;
{% endhighlight %}
