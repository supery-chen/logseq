public:: true

- ## 下载
	- 到[下载页面](https://www.eclipse.org/mat/downloads.php)选择最新版下载即可
	- > 建议选择国内镜像，南京大学的镜像，下载速度很快
	  ![img](../assets/image_1647443228331_0.png)
-
- ## 启动
	- 下载后得到的是一个免安装的压缩包，解压后点击**MemoryAnalyzer.exe**即可启动
	- 如果启动时提示需要jdk11或以上版本，需要先在本机安装jdk或11以上版本，安装完成后，修改**MemoryAnalyzer.ini**，在顶部添加如下两行
	- ```ini
	  -vm
	  path-to-jdk/bin/javaw.exe
	  ```
	- 以我的为例，修改后的`MemoryAnalyzer.ini`内容如下
	- ```ini
	  -vm
	  D:/Program Files/Java/jdk-17.0.2/bin/javaw.exe
	  -startup
	  plugins/org.eclipse.equinox.launcher_1.6.200.v20210416-2027.jar
	  --launcher.library
	  plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_1.2.200.v20210429-1609
	  -vmargs
	  -Xmx1024m
	  ```
	- 保存后再次点击exe文件即可打开