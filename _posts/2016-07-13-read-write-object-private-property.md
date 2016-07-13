---
title: 读写一个对象的非公开属性
---

问题
---
假设有以下对象, 如何读写其中的非公开属性?


{% highlight php %}
<?php
class Dog
{
    private $name = 'jim';
    private $age = 3;
    protected $master = 'keta';
    public $color = 'black';
}

$dog = new Dog();
{% endhighlight %}

1. 使用数组读
{% highlight php %}
$dogArray = (array)$dog;

$name = $dogArray["\0Dog\0name"];
$age = $dogArray["\0Dog\0age"];
$master = $dogArray["\0*\0master"];
$color = $dogArray['color'];

var_dump($dog, $dogArray, $name, $age, $master, $color);
{% endhighlight %}

结果:

![数组读结果](/images/out-array-r.png)


2\. 使用反射读写
{% highlight php %}
$refName = new ReflectionProperty('Dog', 'name');
/* >>> */$refName->setAccessible(true); /* <<< */
// 读
$name = $refName->getValue($dog);
var_dump($dog, $name);
// 写
$refName->setValue($dog, 'hanmeimei');
var_dump($dog);
{% endhighlight %}

结果:

![反射结果](/images/out-ref-rw.png)



3\. 使用匿名函数读写
{% highlight php %}

$rw = Closure::bind(function ($key, $value = null) {
    if (null !== $value)
    {
        $this->$key = $value;
        return;
    }

    return $this->$key;
}, $dog, Dog::class);

// 读
$name = $rw('name');
var_dump($dog, $name);

// 写
$rw('name', 'kailei');
var_dump($dog);
{% endhighlight %}

结果:

![反射结果](/images/out-closure-rw.png)
