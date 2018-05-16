---
title: 使用icu类, 把数字转换成财务汉字
---


```

$fmt = new NumberFormatter('zh_CN', NumberFormatter::SPELLOUT);

$fmt->setTextAttribute(NumberFormatter::DEFAULT_RULESET, '%spellout-cardinal-financial');

echo $fmt->format(123456789.123456);

// 壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖点壹贰叁肆伍陆


```
