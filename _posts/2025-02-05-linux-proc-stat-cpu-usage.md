---
title: Linux中计算cpu使用率
---


```php 
<?php 

function get_cpu_parts()
{
    $file = '/proc/stat';

    $content = file_get_contents($file);
    $lines = explode("\n", $content);
    $line1 = $lines[0];

    $parts = preg_split("/\s+/", $line1);
    array_shift($parts);

    return $parts;
}

$cpu_old = get_cpu_parts();

while (true) {
    usleep(1000000);

    $cpu_new = get_cpu_parts();

    // 下标3为idle时间
    $idle = $cpu_new[3] - $cpu_old[3];

    $total = array_sum($cpu_new) - array_sum($cpu_old);

    printf("cpu useage: %f\n", ($total - $idle) / $total);

    $cpu_old = $cpu_new;
}

```