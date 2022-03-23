## 记录开发过程中使用到的cmd命令

#### 查看当前端口以及占用情况
```
netstat -ano  // 查看所有端口情况
netstat -ano|findstr "3000" // 具体端口
tasklist|findstr "listenin" // 查看当前PID对应的任务进程
taskkill /f /t /im node.exe // 结束当前进程
```