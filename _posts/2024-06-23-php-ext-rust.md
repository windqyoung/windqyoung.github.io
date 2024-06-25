---
title: 使用rust创建php扩展
---


# windows
1. 安装Visual Studio的 clang和llvm包
2. 设置环境变量LIBCLANG_PATH = 'Microsoft Visual Studio\2022\Community\VC\Tools\Llvm\x64\bin'
    注意是32还是64位
3. 设置环境变量 PHP=php.exe 或者 在PATH中可以找到php.exe
4. 跟着文档做 https://davidcole1340.github.io/ext-php-rs/getting-started/hello_world.html     
5. cargo build
6. php '-dextension=.\target\debug/hello_world.dll' -m

# Linux
1. 跟着错误提示处理
2. 如果有多个版本, 注意环境变量 PHP PHP_CONFIG
3. cargo build
4. php '-dextension=.\target\debug/hello_world.dll' -m
    注意php的版本和编译版本
    
