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
将git 配置文件 `core.quotepath` 设置为 `false` `quotepath` 表示引用路径

    git config --global core.quotepath false

`rebase` 为变基
`git rebase -i` 命令可以压缩合并多次提交
格式：`git rebase -i [startpoint] [endpoint]`


切换远程分支：
`git branch -a` 查看所有远程分支

---

`git checkout -b` 分支名 origin/远程分支名

---

`git fetch origin(--all)`

`git reset --hard origin/master` 强制拉取线上代码 

`git push origin 分支名 --force` 强制推送代码到线上

---

`git reset --hard HEAD@{n}`    （注意：n是你要回退到的引用位置）可以用id

---

`isMerged: false`

---

`git rebase --abort`   回到rebase执行之前的状态

---

`git cherry-pick (commit-id)`

将一个分支A上提交的内容合并到B分支

1. 切换到B分支
2. 在A分支上查看 `git log` 提交的`commit id`
3. `git cherry-pick #####` 合并
4. 如果正常的话就会自动合并，如果出现冲突后需要先解决冲突再合并

---

`git config --list`
查看全局配置

---

`git config --global user.name/user.email`

配置全局用户名或邮箱

---

`git config core.quotepath false`

在使用git的时候，经常会碰到有一些中文文件名或者路径被转义成\xx\xx\xx之类的，
此时可以通过git的配置来改变默认转义

---

方法一 通过命令直接修改远程地址
进入git_test根目录
`git remote` 查看所有远程仓库， `git remote xxx` 查看指定远程仓库地址
`git remote set-url origin http://192.168.100.235:9797/john/git_test.git`

方法二 通过命令先删除再添加远程仓库

1. 进入git_test根目录

2. `git remote` 查看所有远程仓库， `git remote xxx` 查看指定远程仓库地址

3. `git remote rm origin`

4. `git remote add origin http://192.168.100.235:9797/john/git_test.git`

`git remote show origin`;
`git remote prune origin` 本地跟远程分支同步更新或删除

---

关于`git rebase` 合并多个（以3个commit为例）commit提交

1. `git rebase -i HEAD~3` 进入vim编辑窗口,将要合并的commit的pick改为squash或者s
2. 保存当前窗口并退出（在当前窗口按下Esc键然后:wq保存退出）
3. 退出后Git会陆续压缩提交历史（commit）,如果有冲突需要修改，选择保留最新的提交历史
4. `git add .` 将修改添加到暂存区
5. `git rebase --continue`