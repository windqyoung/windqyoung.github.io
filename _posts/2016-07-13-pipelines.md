---
title: 实现Pipeline
---

有以下代码, 请实现一个Pipeline
----
{% highlight php %}
$pipes = [
    function ($args, $next) {
        $args['line'][] = __LINE__;
        return $next($args);
    },
    function ($args, $next) {
        $args['line'][] = __LINE__;
        return $next($args);
    },
    function ($args, $next) {
        $args['line'][] = __LINE__;
        return $next($args);
    },
    function ($args, $next) {
        $args['line'][] = __LINE__;
        return $next($args);
    },
];
{% endhighlight %}


1. 使用array_reduce

{% highlight php %}

$then = function ($args) {
    $args['line'][] = __LINE__;
    return $args;
};

$func = array_reduce(array_reverse($pipes), function ($next, $current) {
    return function ($args) use ($next, $current) {
        return $current($args, $next);
    };
}, $then);

$data = ['hello'];
var_dump($func($data));
{% endhighlight %}


结果:

![Pipeline](/images/out-pipeline.png)

2\. 使用类实现
{% highlight php %}
class Pipeline
{
    private $pipes;
    public function __construct($pipes)
    {
        $this->pipes = $pipes;
        reset($this->pipes);
    }

    public function __invoke($args)
    {
        $func = current($this->pipes);
        next($this->pipes);

        if (! $func)
        {
            reset($this->pipes);
            return $args;
        }

        return $func($args, $this);
    }
}

$func = new Pipeline($pipes);
$data = ['hello'];
var_dump($func($data));
{% endhighlight %}



结果:

![Pipeline](/images/out-pipeline-class.png)
