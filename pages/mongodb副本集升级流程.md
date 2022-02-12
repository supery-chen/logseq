- > 副本集升级按先升级SECONDARY、ARBITER，最后升级PRIMARY的顺序逐个升级
- ## 前置条件
	- 1. [[mongodump]]备份所有数据
	  2. 下载要升级的版本对应压缩包，此处为[4.4.12](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.12.tgz)
- ## ARBITER、SECONDARY升级
	- 1. 停掉进程
	  2. 备份`bin/mongo`、`bin/mongod`、`bin/mongos`三个文件
	  3.
-
- ## PRIMARY升级
-