---
title: PlantUML内容转图片和PDF
---

1. 安装图片转pdf命令 [官网](http://www.GraphicsMagick.org) [下载](https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick-binaries/)

2. 安装PDF文件操作命令 [官网](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) [下载](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_free-2.02-win-setup.exe)

3. 添加 gm.exe pdftk.exe 到环境变量

4. 执行 run-puml.ps1 脚本

[plantuml下载]( https://plantuml.com/zh/download)

[plantuml样式语法]( https://plantuml.com/zh/skinparam)

[plantuml序列图语法,箭头样式参考]( https://plantuml.com/zh/sequence-diagram)

运行命令  
java -jar plantuml-1.2023.12.jar -Sdpi=200 -gui 目录或文件

-Sdpi表示图片精度, 默认96

-charset是文件的编码, 默认utf8

-gui 启动GUI窗口自动扫描文件(包含 txt, tex, java, htm, html, c, h, cpp, apt, pu, puml, hpp, hh, md)


语法示例
```
@startuml
'skinparam backgroundColor transparent
'skinparam defaultFontColor red
skinparam dpi 300

title TITLE标题
participant Participant as Foo
actor Actor as Foo1
boundary Boundary as Foo2
control Control as Foo3
entity Entity as Foo4
database Database as Foo5
collections Collections as Foo6
queue Queue as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
Foo1 -> Foo3: TO 3
@enduml

```

运行脚本文件
```powershell
# run-puml.ps1

param( 
    [Parameter(Mandatory, HelpMessage="plantuml文件所在的目录")]
    $dir 
)


if (! $dir) {
    echo "输入目录参数"
    exit
}


# 报错停止运行
$ErrorActionPreference = 'stop'
# 调试开关
# Set-PSDebug -Trace 2

$pdftk_exe = resolve-path 'C:\Program Files (x86)\PDFtk Server\bin\pdftk.exe'
$gm_exe = resolve-path 'c:\program files\graphicsmagick-1.3.42-q16\gm.exe'

$build = "build"

$ptfile = resolve-path plantuml-1.2023.12.jar

foreach ($file in $(dir -File $dir)) {
    $outdirRelFile = join-path $build $file.basename
    $pngDir = join-path $dir $outdirRelFile
    $pdfFile = "$($pngDir).pdf"
    
    Write-Host 处理文件 $file.fullname
    Write-Host 输出目录 $pngDir
    Write-Host 输出pdf $pdfFile


    # $outdirRelFile 为相对文件的目录
    java -jar $ptfile -Sdpi=300 -o $outdirRelFile $file

    # 生成pdf, 保持宽度为 1024
    &$gm_exe mogrify -format pdf -resize 1024x "$($pngDir)/*.png"

    # 连接PDF文件
    &$pdftk_exe $pngDir/*.pdf cat output $pdfFile
}



```