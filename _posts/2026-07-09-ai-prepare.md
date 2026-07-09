---
title: "安装AI工具的准备工作"
---


# 工具准备

## **powershell**
https://github.com/PowerShell/PowerShell/releases
下载 win-x64.msi 安装包, 安装即可.

## **git**
https://git-scm.com/
直接访问安装即可. 用于管理文件版本. **必选**

## **fnm**
很多工具都是用的node开发的, **必选**
node版本管理 [文档](https://github.com/Schniz/fnm) [下载](https://github.com/Schniz/fnm/releases)
在文档中, 根据使用的shell设置一下环境变量, 包括 bash zsh fish [powershell](https://github.com/Schniz/fnm#powershell).
```bash
# 安装node版本
fnm install 24
# 查看已安装版本
fnm list
# 设置默认版本
fnm default 24
```

### 设置 fnm 环境变量. 
```powershell
echo $PROFILE
```
查看前面变量, 然后编辑这个文件, 在文件中添加如下内容:
```powershell
fnm env --shell powershell | Out-String | Invoke-Expression
```

## **ollama**
https://ollama.com/
可以在本地跑的大模型, 可选.

## **trae**
https://www.trae.cn/
AI编辑器, 可选.

## **codebuddy**
https://www.codebuddy.cn/
AI编辑器, 可选.
