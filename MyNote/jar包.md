## jar包
#### 一、简介
##### 在我们实际编程的过程中，为了避免类名之间发生冲突，从而引入了包机制，但是有的人说我写的程序不会发生类名的冲突，我都用不同的名字不就行了，但是你应该考虑到的是，你应该是一个团队的协作开发，基本不是一个人的单打独斗，所以在这种情况下我们是无法避免类名发生冲突的，怎么办呢？那就是打包，经过合适的打包，可以避免类名重复的冲突。
##### `jar文件`：Java Archive File，也即Java归档文件，也被称作jar包。jar文件是一种压缩文件，与常见的ZIP压缩文件兼容，与zip文件的去区别就是在JAR文件中默认包含了一个名为META-INF/MANIFEST.MF的清单文件，这个清单文件是在生成JAR文件时系统自动创建的。

#### 二、优点
- 安全。能够对JAR文件进行数字签名，只让能够识别数字签名的用户使用里面的东西。
- 加快下载速度。在网上使用applet时，如果存在多个文件而不打包，为了能够把每个文件都下载到客户端，需要为每个文件单独建立一个HTTP连接，这是非常耗时的工作。将这些文件压缩成一个JAR包，只要建立一个http连接就能够一次下载所有的文件。
- 压缩。使文件变小，JAR的压缩机制和zip完全相同
- 包封装。能够让JAR包里面的文件依赖于统一版本的类文件。
- 可一致性。JAR包作为内嵌在Java平台内部处理的标准，能够在各种平台上直接使用。

#### 三、方法
##### 1. 在jar文件夹下创建 YSTool.java 文件，编码如下：
```
package com.ys;
class YSTool{
	public static void  main(String[] args){
		System.out.println("=== 哇咔咔，调用成功了！！！ ===");
	}
}
```

##### 2. 编译文件，在jar路径下，使用下面命令：
```
cd ***/jar
javac -d ./ YSTool.java // 编译YSTool.java 在当前目录下
```
###### 此时在jar文件夹下出现com文件夹，jar路径tree:
```
 jar
   |_ YSTool.java
   |_ com
        |_ys
           |_YSTool.class
        
```

##### 3. 打jar包 在jar路径下，执行下面命令：
```
jar -cvf YSTool.jar ./com // 把com文件夹打成jar包，名为YSTool.jar
```
###### 此时jar路径下增加 YSTool.jar 文件

##### 4. 修改配置文件
###### 解压YSTool.jar 编辑 ./YSTest/META-INF/MANIFEST.MF 文件，在最后一行增加如下代码并保存。
```
Main-Class: com.ys.YSTool // 注意冒号后面有一个空格
```

##### 5. 修改之后，进入YSTest路径，重新打包
```
cd YSTest
jar -cvfm YSTest.jar META-INF/MANIFEST.MF com/     // MANIFEST.MF文件和com文件夹军打入jar包

```

##### 6. 运行jar包
###### 接着我们双击这个jar包之后发现，并不能运行，不是说打包为jar包之后就可以运行的吗？是这样的，但是打包成为jar包之后能运行仅仅限于窗体程序，对于命令行程序需要在命令行中输入下面指令：
```
java -jar YSTool.jar
```


#### 四、最后附上jar常用命令
```
1.
jar -cf A.jar A
```
###### 该命令没有显示圧缩过程，执行结果是将当期那路径下的A路径下的全部内容生成一个A.jar文件，相当于zip压缩A路径，并压缩包里增加一个文件META-INF/MANIFEST.MF。如果当前目录中已经存在A.jar文件，那么该文件将被覆盖。

```
2.
jar -cvf A.jar A
```
###### 命令同上，只不过在控制台显示压缩过程。

```
3.
jar -cvfm A.jar A
```
###### 命令`3` 同 命令`2`类似，只不过在压缩过程中不生成`META-INF/MANIFEST.MF`文件，相当于文件修改为*.jar的zip压缩。

```
4.
jar -cvfm A.jar manifest.mf A
```
###### 命令`4`自定义清单，-m不生成清单，但可以指定清单。

```
5.
jar -tf A.jar

eg:
jar -tf YSTest.jar

结果：
  META-INF/
  META-INF/MANIFEST.MF
  com/
  com/ys/
  com/ys/YSTest.class
```
###### 命令`5`查看jar包结构。

```
6.
jar -xf A.jar
```
###### 命令`6`解压A.jar

```
7.
jar -uf A.jar A.class
```
###### 命令`7`更新jar包文件。

```
8.
jar -cvfe A.jar com.ys.Main A
```
###### 命令`8`<font color='red'>指定主类的类名</font>，上面的命令表示 把A路径下的文件打成A.jar，生成META-INF/MANIFEST.MF文件，主类名为



