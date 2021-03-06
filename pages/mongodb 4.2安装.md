title:: mongodb 4.2安装

- [mongodb主从仲裁节点配置](https://blog.csdn.net/weixin_33691817/article/details/91431611)
- ## 安装环境准备
	- ### 安装包下载
		- ```shell
		  curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.6.tgz
		  ```
	- ### 安装包解压
		- ```shell
		  tar -xvzf mongodb-linux-x86_64-rhel70-4.2.6.tgz
		  ```
	- ### 创建log、data目录
		- ```shell
		  mkdir log
		  mkdir data
		  ```
- ## 准备配置文件
	- > `replSetName`需要保持一致
	- ### 主
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /usr/local/konke/mongodb/log/mongodb.log
		     logAppend: true
		     logRotate: rename
		     destination: file
		     timeStampFormat: iso8601-local
		     component:
		        accessControl:
		           verbosity: 0
		        command:
		           verbosity: 0
		  processManagement:
		     fork: true
		     pidFilePath: /usr/local/konke/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.25.240.160
		     bindIpAll: false
		     maxIncomingConnections: 819
		     wireObjectCheck: true
		     ipv6: false
		     unixDomainSocket:
		        enabled: true
		        pathPrefix: /tmp
		        filePermissions: 0700
		     compression:
		        compressors: snappy,zstd,zlib
		     serviceExecutor: synchronous
		  storage:
		     dbPath: /usr/local/konke/mongodb/data
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 7.5
		           journalCompressor: snappy
		           directoryForIndexes: true
		           maxCacheOverflowFileSizeGB: 0
		        collectionConfig:
		           blockCompressor: snappy
		        indexConfig:
		           prefixCompression: true
		  operationProfiling:
		     mode: slowOp
		     slowOpThresholdMs: 100
		     slowOpSampleRate: 1.0
		  replication:
		     oplogSizeMB: 4096
		     replSetName: mongodb-repl-test
		     enableMajorityReadConcern: true
		  ```
	- ### 从
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /usr/local/konke/mongodb/log/mongodb.log
		     logAppend: true
		     logRotate: rename
		     destination: file
		     timeStampFormat: iso8601-local
		     component:
		        accessControl:
		           verbosity: 0
		        command:
		           verbosity: 0
		  processManagement:
		     fork: true
		     pidFilePath: /usr/local/konke/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.25.240.167
		     bindIpAll: false
		     maxIncomingConnections: 819
		     wireObjectCheck: true
		     ipv6: false
		     unixDomainSocket:
		        enabled: true
		        pathPrefix: /tmp
		        filePermissions: 0700
		     compression:
		        compressors: snappy,zstd,zlib
		     serviceExecutor: synchronous
		  storage:
		     dbPath: /usr/local/konke/mongodb/data
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 7.5
		           journalCompressor: snappy
		           directoryForIndexes: true
		           maxCacheOverflowFileSizeGB: 0
		        collectionConfig:
		           blockCompressor: snappy
		        indexConfig:
		           prefixCompression: true
		  operationProfiling:
		     mode: slowOp
		     slowOpThresholdMs: 100
		     slowOpSampleRate: 1.0
		  replication:
		     oplogSizeMB: 4096
		     replSetName: mongodb-repl-test
		     enableMajorityReadConcern: true
		  ```
	- ### 仲裁
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /usr/local/konke/mongodb/log/mongodb.log
		     logAppend: true
		     logRotate: rename
		     destination: file
		     timeStampFormat: iso8601-local
		     component:
		        accessControl:
		           verbosity: 0
		        command:
		           verbosity: 0
		  processManagement:
		     fork: true
		     pidFilePath: /usr/local/konke/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.25.240.168
		     bindIpAll: false
		     maxIncomingConnections: 819
		     wireObjectCheck: true
		     ipv6: false
		     unixDomainSocket:
		        enabled: true
		        pathPrefix: /tmp
		        filePermissions: 0700
		     compression:
		        compressors: snappy,zstd,zlib
		     serviceExecutor: synchronous
		  storage:
		     dbPath: /usr/local/konke/mongodb/data
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 3.5
		           journalCompressor: snappy
		           directoryForIndexes: true
		           maxCacheOverflowFileSizeGB: 0
		        collectionConfig:
		           blockCompressor: snappy
		        indexConfig:
		           prefixCompression: true
		  operationProfiling:
		     mode: slowOp
		     slowOpThresholdMs: 100
		     slowOpSampleRate: 1.0
		  replication:
		     oplogSizeMB: 2048
		     replSetName: mongodb-repl-test
		     enableMajorityReadConcern: true
		  ```
- ## 脚本
	- ### 启动脚本
		- ```shell
		  bin/mongod --config mongo.conf
		  ```
	- ### 停止脚本
		- ```shell
		  bin/mongod --config mongo.conf --shutdown
		  ```
- ## 配置节点
	- ### 启动三个服务
	- ### 控制台连接主节点
		- ```shell
		  bin/mongo 127.0.0.1:27017
		  ```
	- ### 初始化副本集
		- ```
		  use admin;
		  config={_id:"mongodb-repl-test",members:[{_id:0,host:"172.25.240.160","priority":20}]}
		  rs.initiate(config);
		  ```
	- ### 添加仲裁节点
		- ```
		  rs.addArb("172.25.240.168:27017");
		  ```
	- ### 添加从节点
		- ```
		  rs.add("172.25.240.167:27017");
		  ```
	- ### 配置集群
		- ```
		  rs.config();
		  ```
		- 显示结果如下
		- ```json
		  {
		  	"_id" : "mongodb-repl-test",
		  	"version" : 5,
		  	"protocolVersion" : NumberLong(1),
		  	"writeConcernMajorityJournalDefault" : true,
		  	"members" : [
		  		{
		  			"_id" : 0,
		  			"host" : "172.25.240.160:27017",
		  			"arbiterOnly" : false,
		  			"buildIndexes" : true,
		  			"hidden" : false,
		  			"priority" : 20,
		  			"tags" : {
		  				
		  			},
		  			"slaveDelay" : NumberLong(0),
		  			"votes" : 1
		  		},
		  		{
		  			"_id" : 1,
		  			"host" : "172.25.240.168:27017",
		  			"arbiterOnly" : true,
		  			"buildIndexes" : true,
		  			"hidden" : false,
		  			"priority" : 0,
		  			"tags" : {
		  				
		  			},
		  			"slaveDelay" : NumberLong(0),
		  			"votes" : 1
		  		},
		  		{
		  			"_id" : 2,
		  			"host" : "172.25.240.167:27017",
		  			"arbiterOnly" : false,
		  			"buildIndexes" : true,
		  			"hidden" : false,
		  			"priority" : 20,
		  			"tags" : {
		  				
		  			},
		  			"slaveDelay" : NumberLong(0),
		  			"votes" : 1
		  		}
		  	],
		  	"settings" : {
		  		"chainingAllowed" : true,
		  		"heartbeatIntervalMillis" : 2000,
		  		"heartbeatTimeoutSecs" : 10,
		  		"electionTimeoutMillis" : 10000,
		  		"catchUpTimeoutMillis" : -1,
		  		"catchUpTakeoverDelayMillis" : 30000,
		  		"getLastErrorModes" : {
		  			
		  		},
		  		"getLastErrorDefaults" : {
		  			"w" : 1,
		  			"wtimeout" : 0
		  		},
		  		"replicaSetId" : ObjectId("6204bb08b57d79d357b0fa31")
		  	}
		  }
		  ```
		- 修改从节点为只读，且永远不可被选为主节点(非必须)
		- ```
		  cfg = rs.config();
		  cfg.members[2].priority=0;
		  cfg.members[2].votes=0;
		  rs.reconfig(cfg);
		  ```