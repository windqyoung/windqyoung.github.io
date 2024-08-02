---
title: 使用icu实现汉字拼音,简繁转换
---


intl扩展的Transliterator类可以实现一些字符集之间的转换.


##transliterator IDs

不同的ID用分号分隔, ID的格式为 FROM-TO 

比如 `Any-Latin` 表示把任何字符转换中拉丁字符

```php
<?php 
// 列出支持的转换类型

var_dump(Transliterator::listIDs());

// 把中文转换成拼音

$str = '测试用的汉字么, test for log';
var_dump(transliterator_transliterate('Any-Latin', $str));

// 简繁转换
var_dump($hant = transliterator_transliterate('Hans-Hant', $str));

// 繁简转换
var_dump(transliterator_transliterate('Hant-Hans', $hant));

// 多个转换
var_dump(transliterator_transliterate('Any-Latin; Latin-ASCII; upper; title', $str));


?>
```


## Java用例
```java
/**
 * 依赖
        <dependency>
            <groupId>com.ibm.icu</groupId>
            <artifactId>icu4j</artifactId>
            <version>74.2</version>
        </dependency>
 * 
 */

package org.example;

import com.ibm.icu.text.Transliterator;

public class Main {
    public static void main(String[] args) {
        var ids = Transliterator.getAvailableIDs();
        ids.asIterator().forEachRemaining((id) -> {
            System.out.println("id = " + id);
        });

        var trans = Transliterator.getInstance("Any-Latin");
        var str = "你好me";
        var transrs = trans.transliterate(str);
        System.out.println("transrs = " + transrs);
    }
}

```