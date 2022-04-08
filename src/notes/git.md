`git commit --amend` 修改上一个commit信息
!q 强制退出
qa! 放弃修改退出

`git reflog` 查看历史操作记录

`git log` 查看历史commit记录

`git stash` 暂存当前更改

`git stash save 'msg'` 将当前代码暂存同时添加注释

`git stash list` 查看当前暂存列表

`git stash show stash@{num}` 查看指定暂存代码具体内容 -p 或者--patch 查看全部diff

`git stash drop stash@{num}` 删除指定暂存

`git show commitId` 显示某个commit下详细的内容信息


git-bash 中文乱码解决

原因：在默认设置下，中文文件名在工作区状态输出，显示为八进制字符编码

解决办法：
将git 配置文件 `core.quotepath` 设置为 `false` 
    `quotepath` 表示引用路径

    
    git config --global core.quotepath false


`rebase` 为变基
`git rebase -i` 命令可以压缩合并多次提交
格式：`git rebase -i [startpoint] [endpoint]`