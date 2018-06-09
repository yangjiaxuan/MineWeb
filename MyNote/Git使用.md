### Git使用
### 一 基础操作
##### 1、初始化
```
git init // 使用当前文件夹作为Git仓储
git init 资源库  // 指定路径为Git仓储
```

##### 2、添加文件到暂存区
```
git add .  // 当前文件全部加入暂存区
git add *.h // 以.h结尾文件名加入暂存区
git add ./a.h // 将文件当前文件夹下的a.h文件添加到暂存区
```

##### 3、将暂存区文件提交到版本区
```
git commit -m 'des' // 提交并描述
```

##### 4、从远程仓储clone到本地仓储
```
git clone git://github.com/***    // clone制定远程仓储到当前文件夹
git clone git://github.com/***  ./Deskstop/***  // clone指定仓储到指定文件夹
```

##### 5、查看状态
```
git status -s    // 查看仓储状态
？？: 文件在工作区，尚未加到暂存区。
A(绿色): 文件在暂存区
M(红色): 文件已经修改
```

##### 6、查看不同
```
git diff // 工作区与版本区不同
git diff -catch  // 工作区与暂存区的不同
```

##### 7、添加反操作
```
文件修改反操作(注意：该文件已经被添加到暂存区，否则git无法管理)
git checkout -- ./   // 撤销文件修改

git add 反操作：
git reset // 将从工作区到暂存区的信息撤回。 


git commit -m "***"
git reset --soft 版本号 // 回退到某个版本，暂存区有修改的代码，修改的状态是即将提交到下一个版本的状态。
git reset --hard 版本号 // 回退到某个版本, 暂存区没有修改的代码，工作区和暂存区均是刚提交到该版本号的状态。

```

##### 8、移除
```
git rm -f a.h  // 将a.h文件彻底移除，移除暂存区 工作区，又要在区中存在即移除。
git rm --cached a.h // 仅仅移除暂存区，工作区保留文件。
```

### 二 分支管理
##### 1、列出分支
```
git branch // 列出本地所有分支
git branch // 列出所有分支 包括远程仓储中的分支
git branch -v // 列出本地所有分支及分支最后一次提交版本号
git branch --merged // 列出本地合并到当前分支的所有分支。(--no-merged 意义相反)
```

##### 2、创建分支
```
git branch *** // 创建名为***的分支
```

##### 3、切换分支
```
git checkout *** // 切换到名为***的分支。
git checkout -b *** // 创建并切换到名为***的分支
```

##### 4、删除分支
```
git branch -d *** // 删除名为***的分支
```

##### 5、合并分支
```
git merge ***  将名为***的分支合并到当前分支
```

### 三、标签管理
```
git tag  // 展示所有tag
git tag -a v1.0.0 // 添加tag
```

### 四、操作日志
```
git log --online   // 简单的版本 修改内容展示
git log --online --graph // 复杂一点的意图的形式展示出来
```

### 五、远程
##### 1、远程信息
```
主机名：不再使用链接，简化操作。
git remote origin git:*** // 给一个远程仓储起一个主机名origin
git remote origin // 查看一个仓储的主机名

git remote -v // 查看一个仓储的远程主机地址
git remote show origin // 显示主机名为origin的主机详细信息
git remote add 主机名 链接 // 给远程主机添加一个主机名
git remote rm 主机名 // 删除主机的一个主机名
```
##### 2、库更新
```
git fitch 主机名 // 将主机名的远程仓储跟新内容拉取到本地分支，默认的本地分支是master。
git fitch 主机名 分支名 // 将主机名的远程仓储跟新内容拉取到指定的本地分支上。
```

```
git pusll origin master:dev // 将远程主机名为origin仓储中的master分支拉去到本地dev分支上。
```
###### fitch 将远程版本库拉倒本地版本库，工作区文件并没有修改，而push则是一步到位，工作区也会改变。

##### 3、提交
```
git pull origin master:master // 将本地master分支提交到远程主机名为origin仓储中的master分支上。

git pull origin master // 将本地master分支提交到远程主机名为origin仓储中的master分支上。如果远程master分支不存在，则会创建。

git pull origin :master // 将本地空分支提交到远程主机名为origin仓储中的master分支上。相当于删除远处分支。
等价于：
git push origin --delete master // 删除远程主机名为origin仓储中的master分支。

```



