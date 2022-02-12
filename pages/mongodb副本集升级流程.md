- > 副本集升级按先升级SECONDARY、ARBITER，最后升级PRIMARY的顺序逐个升级
- ## 前置条件
	- 1. [[mongodump]]备份所有数据
	  2. [下载](https://www.mongodb.com/try/download/community?tck=docs_server)要升级的版本对应压缩包，此处为[4.4.12](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.12.tgz)
	  3. 解压下载的压缩包，提取其中bin目录下的`mongo`、`mongod`、`mongos`三个二进制文件，上传至服务器
	  4. SECONDARY节点必须要配置为优先级(`priority`)大于0，且允许参与选举PRIMARY节点(`"votes" : 1`)，否则当进行
- ## ARBITER、SECONDARY升级
	- 1. 停掉进程
	  2. 备份`bin/mongo`、`bin/mongod`、`bin/mongos`三个文件
	  3. 使用下载的新的`mongo`、`mongod`、`mongos`三个二进制文件进行替换
	  4. 重新启动，并通过rs.status()命令观察节点状态，直至恢复至ARBITER或SECONDARY
-
- ## PRIMARY升级
	- 待ARBITER节点以及所有SECONDARY节点都升级完成后，即可进行PRIMARY节点的升级，PRIMARY节点升级比其它节点稍微复杂些，需要先将当前的PRIMARY节点进行降级，并等待其它SECONDARY节点选举出新的PRIMARY节点([[#red]]==从降级到选举出新节点这段时间服务无法使用，尽量挑选夜间升级，不要影响线上用户使用==)后方可开始升级
	- 1. 连接上PRIMARY节点(`mongo host:port` host与port为PRIMARY节点的连接地址)
	  2. mongo命令行执行`rs.stepDown()`，将PRIMARY节点降级
	  3. 降级完成后，退出命令行，停掉进程
	  4. 备份`bin/mongo`、`bin/mongod`、`bin/mongos`三个文件
	  5. 使用下载的新的`mongo`、`mongod`、`mongos`三个二进制文件进行替换
	  6. 重新启动，并通过rs.status()命令观察节点状态，直至恢复至PRIMARY