---
title: IDE 提示生成工具, Laravel-ide-helper

---



让我们的 IDE 提示 Laravel 框架中的别名类, 如 DB, View, Blade, ...  
以及Model中的字段名.

[git地址](https://github.com/barryvdh/laravel-ide-helper)



1. 安装 

    ```shell
    $ composer require barryvdh/laravel-ide-helper
    ```

2. 配置

{% highlight php %}

// config/app.php
return [
    // ...
    'providers' => [
        // ...
        Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
    ],

];

{% endhighlight %}  

3. 生成helper文件  
    
    ```shell
    $ php artisan ide-helper:generate
    ```
    
    给Eloqent模型类中添加注释, 提示数据库字段，这儿如果报错, 安装doctrine包.  
    
    ```shell
    $ php artisan ide-helper:model -WR
    ```
    
