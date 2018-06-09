##创建cocoapods私有库

###1、注册Trunk
##### (1) 查看cocoapods版本 
##### trunk需要Cocoapods 0.33版本以上
###### 使用下面命令查看cocoapods版本
```
pod --version 
```
##### 如果版本过低需要升级
###### 使用下面命令进行升级
```
sudo gen install cocoapods 
pod setup
```
#####(2) 查看是否注册Trunk
```
pod trunk me
```
#####(3) 注册Trunk
```
pod trunk register ***.com "name" --verbose
***.com : 邮箱
```
###### 成功之后再次执行（2）操作查看注册信息。


###2、在GitHub上创建一个私有仓储
###### 具体步骤此处省略。


###3、创建.podspec文件
```
cd 项目路径
pod spec create 项目名称
```


###4、编辑.podspec文件
###### 使用其它编辑期打开创建的 .podspec 文件。具体字段解释如下：
```
s.name：名称，pod search 搜索的关键词,注意这里一定要和.podspec的名称一样,否则报错。
s.version：版本号
s.ios.deployment_target:支持的pod最低版本
s.summary: 简介
s.homepage:项目主页地址
s.social_media_url:社交网址,这里我写的微博默认是百度,如果你写的是你自己的博客的话,你的podspec发布成功后会@你
s.license:许可证
s.author:作者
s.source:项目的地址
s.requires_arc: 是否支持ARC
s.source_files:需要包含的源文件
s.public_header_files:公开的头文件
s.resources: 资源文件
s.dependency：依赖库，不能依赖未发布的库，可以写多个依赖库
```

###5、创建授权文件 LICENSE
###### 如果项目中没有的话需要创建，具体的内容仅需修改首行
```
Copyright (c) 2013-2015 ZYRunTimeCoT (https://github.com/zhangyqyx/ZYRunTimeCoT)


Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in

all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

THE SOFTWARE.
```


###6、项目上传Git
##### 将包含配置文件 .podspec LICENSE 的项目上传至Git仓储。

###7、项目Git打tag
###### 方法：
```
git tag "v1.0.0"  // 打tag
git push --tags  // 上传tag
git tag // 查看tag
git tag -d yourbranch // 删除tag
git push origin:refs/tags/yourbranch // 重新上传tag
```

###8、验证.podsepc文件
###### 方法：
```
pod spec lint 项目名.podspec --verbose
pod lib lint --allow-warnings
```


###9、发布
######  发布时会验证 Pod 的有效性，如果你在手动验证 Pod 时使用了 --use-libraries 或 --allow-warnings 等修饰符，那么发布的时候也应该使用相同的字段修饰，否则出现相同的报错。
```
pod trunk push ZYRunTimeCoT.podspec
```
###### 注意：发布之后需要审核。


###10、查看状态
###### 方法：
```
pod search ZYRunTimeCoT
```


<mark> 参考： </mark>
<http://www.cocoachina.com/ios/20180308/22509.html>

