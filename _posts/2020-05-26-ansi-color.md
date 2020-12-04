---
title: 显示ansi控制台颜色
---



```php
<?php

echo "\n默认7位\n";
for ($i = 0; $i < 128; $i ++) {
    echo "\e[{$i}m" . "color $i" . "\e[m ";
}

echo "\n256色字体\n";
for ($i = 0; $i < 256; $i ++) {
    echo "\e[38;5;{$i}m" . "color $i" . "\e[m ";
}

echo "\n256色背景\n";
for ($i = 0; $i < 256; $i ++) {
    echo "\e[48;5;{$i}m" . "color $i" . "\e[m ";
}

echo "\n24位字体\n";
$step = 15;
for ($r = 0; $r < 256; $r+=$step) {
    for ($g = 0; $g < 256; $g+=$step) {
        for ($b = 0; $b < 256; $b+=$step) {
            echo "\e[38;2;{$r};{$g};{$b}m" . "$r.$g.$b" . "\e[m ";
        }
    }
}

echo "\n24位背景\n";
$step = 15;
for ($r = 0; $r < 256; $r+=$step) {
    for ($g = 0; $g < 256; $g+=$step) {
        for ($b = 0; $b < 256; $b+=$step) {
            echo "\e[48;2;{$r};{$g};{$b}m" . "$r.$g.$b" . "\e[m ";
        }
    }
}

```


```python

print("默认7位")
for i in range(256):
    print(f"\x1b[{i}mcolor {i}\x1b[m ", end='')

print()
print("256色字体")
for i in range(256):
    print(f"\x1b[38;5;{i}mcolor {i}\x1b[m ", end='')

print()
print("256色背景")
for i in range(256):
    print(f"\x1b[48;5;{i}mcolor {i}\x1b[m ", end='')

print()
print("24位字体")
step = 15;
for r in range(0, 256, step):
    for g in range(0, 256, step):
        for b in range(0, 256, step):
            print(f"\x1b[38;2;{r};{g};{b}m{r}.{g}.{b}\x1b[m ", end='')


print()
print("24位背景")
step = 15;
for r in range(0, 256, step):
    for g in range(0, 256, step):
        for b in range(0, 256, step):
            print(f"\x1b[48;2;{r};{g};{b}m{r}.{g}.{b}\x1b[m ", end='')


```