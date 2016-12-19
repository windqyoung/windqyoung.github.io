---
title: 把\uxxxx格式的字符串转换成utf-8
---

```php

// $str = json_encode('helo, 你好, 我是中国人');
$str = 'helo, \u4f60\u597d, \u6211\u662f\u4e2d\u56fd\u4eba';

$replaced = preg_replace_callback('/\\\\u(....)/', function ($match) {
    return mb_convert_encoding(hex2bin($match[1]), 'utf-8', 'ucs-2');
}, $str);

var_dump($replaced);

```
