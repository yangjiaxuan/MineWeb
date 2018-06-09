### JNI
#### 一、简介
##### JNI:java native interface 一种协议，桥梁作用。<mark>通过JNI就可以让`Java`调用`C语言或者C++代码`，并且可以让`C语言`代表`Java代码`</mark>。

##### 1、为什么用JNI
#####（1）native coder 执行高效，大量的运算。
#####（2）代码复用 
###### `万能解码(ffmpeg)` `openGL(3D渲染)` `onencv(人脸识别库)` `7-zip`

##### 2、怎么用JNI
##### NDK：native develop kits

#### 二、 Java 调 C/C++
##### 1、创建Java接口，并附带main函数
```
class Persion {
	
	public native void setName(String name);

	public native String getName();

	public native void setAge(int age);

	public native int getAge();

	public native void run();

	public static void main(String[] args){

	}
}
```

##### 2、编译Java文件
```
javac Persion.java
```

##### 3、生成JNI接口头文件
```
javah -jni Persion
```

##### 4、JNI接口对接C/C++

