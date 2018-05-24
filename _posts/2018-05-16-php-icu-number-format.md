---
title: 使用icu类, 把数字转换成财务汉字
---


```

$fmt = new NumberFormatter('zh_CN', NumberFormatter::SPELLOUT);

$fmt->setTextAttribute(NumberFormatter::DEFAULT_RULESET, '%spellout-cardinal-financial');

echo $fmt->format(123456789.123456);

// 壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖点壹贰叁肆伍陆


/**
 * 人民币转汉字
 * @param number $number
 */
function money_cn($number)
{
    return '人民币' . money_yuan($number) . money_jiao_fen($number);
}

/**
 * 整数为元
 * @param number $number
 */
function money_yuan($number)
{
    $fmt = new NumberFormatter('zh_CN', NumberFormatter::SPELLOUT);

    $fmt->setTextAttribute(NumberFormatter::DEFAULT_RULESET, '%spellout-cardinal-financial');

    $yuan = (int) $number;

    return $fmt->format($yuan) . '元';
}

/**
 * 参数为小数, 0.12 1角2分
 * 无视整数
 * @param number $number
 */
function money_jiao_fen($number)
{
    $fmt = new NumberFormatter('zh_CN', NumberFormatter::PATTERN_RULEBASED, '
0: 整;
1: 零壹分;
2: 零贰分;
3: 零叁分;
4: 零肆分;
5: 零伍分;
6: 零陆分;
7: 零柒分;
8: 零捌分;
9: 零玖分;
10: <%%jiao<>%%fen>;
100: 超出元;

%%jiao:
1: 壹角;
2: 贰角;
3: 叁角;
4: 肆角;
5: 伍角;
6: 陆角;
7: 柒角;
8: 捌角;
9: 玖角;
10: 超出角;

%%fen:
0: ;
1: 壹分;
2: 贰分;
3: 叁分;
4: 肆分;
5: 伍分;
6: 陆分;
7: 柒分;
8: 捌分;
9: 玖分;
10: 超出分;
');

    $jf = ($number - (int)$number) * 100;
    return $fmt->format($jf);
}

for ($y = 0; $y < 200; $y += 3) {
    for ($jf = 0; $jf < 1; $jf += 0.03) {
        printf("%5s: %s\n", $money = $y + $jf, money_cn($money));
    }
}


```
