---
title: 优秀的调试辅助工具 Laravel-debugbar


---


[github地址](https://github.com/barryvdh/laravel-debugbar)

安装过程

---

1. 安装php包  
    
```shell
$ composer require barryvdh/laravel-debugbar -vvv
```
    
2. 添加service到config/app.php文件的provider数组中  

```php
// config/app.php
return [
    // ...
    'providers' => [
        // ...
        Barryvdh\Debugbar\ServiceProvider::class,
    ], 
];
```


    
安装以后页面显示内容


![Screenshot](https://cloud.githubusercontent.com/assets/973269/4270452/740c8c8c-3ccb-11e4-8d9a-5a9e64f19351.png)



