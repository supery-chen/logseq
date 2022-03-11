- > 原理:借助nginx提供的[njs](https://nginx.org/en/docs/njs/install.html)模块,分析数据包格式,判断是否为http数据包,如果满足,则转发至后端http服务进行处理,否则转发至后端tcp服务
- **Nginx的安装比较简单,网上文档很多,这里就不再说明,主要讲解njs模块的安装与使用**
-
- ## [njs](https://nginx.org/en/docs/njs/)
	- > njs is a subset of the JavaScript language that allows extending nginx functionality. njs is created in compliance with ECMAScript 5.1 (strict mode) with some ECMAScript 6 and later extensions. The compliance is still evolving.
	  从[nginx官方文档介绍](https://nginx.org/en/docs/njs/)可以看到,njs是nginx提供的一个JavaScript的子集,用于扩展nginx功能
	- 本次使用的服务器为`CentOS 7`, `nginx`版本为`1.20.2`
	- 根据`nginx`安装方式不同,`njs`需要使用相同的安装方式
	- ### [包管理工具安装](https://nginx.org/en/docs/njs/install.html#install_package)
		- Install the prerequisites:
			- ```shell
			  sudo yum install yum-utils
			  ```
		- To set up the yum repository, create the file named /etc/yum.repos.d/nginx.repo with the following contents:
			- ```
			  [nginx-stable]
			  name=nginx stable repo
			  baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
			  gpgcheck=1
			  enabled=1
			  gpgkey=https://nginx.org/keys/nginx_signing.key
			  module_hotfixes=true
			  
			  [nginx-mainline]
			  name=nginx mainline repo
			  baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
			  gpgcheck=1
			  enabled=0
			  gpgkey=https://nginx.org/keys/nginx_signing.key
			  module_hotfixes=true
			  ```
		- To install njs, run the following command:
			- ```shell
			  yum -y install nginx-module-njs
			  ```
	- ### [编译安装](https://nginx.org/en/docs/njs/install.html#install_sources)
		-
-
-
- ## 参考文档
	- [choosing-upstream-in-stream-based-on-the-underlying-protocol-stream-detect-http](https://github.com/nginx/njs-examples#choosing-upstream-in-stream-based-on-the-underlying-protocol-stream-detect-http)