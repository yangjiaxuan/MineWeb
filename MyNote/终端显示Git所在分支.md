### 终端显示Git所在分支
##### 1、在~目录下创建文件 ./bashrc 并编辑
```
vim ~/.bashrc
```
###### 将下面代码写入文件中
```
function git_branch {
  branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
  if [ "${branch}" != "" ];then
      if [ "${branch}" = "(no branch)" ];then
          branch="(`git rev-parse --short HEAD`...)"
      fi
      echo " ($branch)"
  fi
}

export PS1='\u@\h \[\033[01;36m\]\W\[\033[01;32m\]$(git_branch)\[\033[00m\] \$ '
```

##### 2、编辑 ~/.bash_profile文件
###### 由于在Mac中shell是login shell，加载的配置文件是.bash_profile, 并不会加载创建的.bashrc, 所以需要在.bash_profile文件中植入运行.bashrc的代码。
```
echo "[ -r ~/.bashrc ] && source ~/.bashrc" >> .bash_profile
```

##### 3、重新执行加载命令
```
source ~/.bashrc
```