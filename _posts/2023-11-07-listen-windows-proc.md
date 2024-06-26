---
title: 监听windows下进程启动与关闭
---


### 隔一秒运行一次

```powershell
function out_proc_info($tip, $p, $showPath) {
    write-host -NoNewline $tip ""
    write-host -NoNewline -ForegroundColor DarkBlue $p.ID
    write-host -NoNewline " " $p.Name $p.Path $p.CommandLine

    while ($p.Parent) {
        $p = $p.Parent
        write-host -NoNewline "->"
        write-host -NoNewline $p.Id -ForegroundColor Red
        write-host -NoNewline "(" $p.Name ")"
    }
    echo ""
}

# 初始化
$last_set = @{}
$ps = Get-Process
foreach ($p in $ps) {
    $last_set[$p.Id] = $p
}

while ($true) {
    $ps = Get-Process
    $this_set = @{}
    foreach ($p in $ps) {
        $id = $p.Id
        # 添加到当前中
        $this_set[$id] = $p
        if ($last_set[$id]) {
            # 已存在, 忽略
        } else {
            out_proc_info "CREATE"  $p
        }
    }

    foreach ($last_pid in $last_set.Keys) {
        if ($this_set[$last_pid]) {
            # 没变化
        } else {
            # 已关闭
            $p = $last_set[$last_pid]
            out_proc_info "    CLOSED" $p
        }
    }
    $last_set = $this_set
    sleep 1
}
```


# 使用 Get-CimInstance, 可以获取到 CommandLine

```powershell


function out_proc_info($tip, $p, $processSet) {
    write-host -ForegroundColor Green $tip $p.ProcessId
    write-host "`t" $p.ProcessId $p.ProcessName $p.Path $p.Description 'PID' $p.ParentProcessId
    write-host "`t" -ForegroundColor Green $p.CommandLine
}


function Get-Process-Cim-List()
{
    Get-CimInstance -ClassName Win32_Process
}

# 初始化
$last_set = @{}
$ps = Get-Process-Cim-List
foreach ($p in $ps) {
    $last_set[$p.ProcessId] = $p
}

# 进程ID短期内不会重用

while ($true) {
    write-host -NoNewline .
    $ps = Get-Process-Cim-List
    $this_set = @{}
    foreach ($p in $ps) {
        $id = $p.ProcessId
        # 添加到当前中
        $this_set[$id] = $p
        if ($last_set[$id]) {
            # 已存在, 忽略
        } else {
            out_proc_info "CREATE"  $p
        }
    }

    foreach ($last_pid in $last_set.Keys) {
        if ($this_set[$last_pid]) {
            # 没变化
        } else {
            # 已关闭
            $p = $last_set[$last_pid]
            out_proc_info "    CLOSED" $p
        }
    }
    $last_set = $this_set
    sleep 1
}
```