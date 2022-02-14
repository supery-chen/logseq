title:: mongodb线上4.4.4升级至4.4.12

- ## 节点服务器
	- **PRIMARY**：`172.24.60.173:27017`
	- **SECONDARY**：`172.24.60.175:27017`
	- **ARBITER**：`172.24.71.31:27017`
	- **部署路径**：`/usr/local/konke/mongodb/mongodb-konke`
	- **日志路径**：`/appdata/logs/mongodb/mongodb.log`
-
- ## 配置文件
	- ### PRIMARY
		- `/usr/local/konke/mongodb/mongodb-konke/bin/mongodb_yaml/master/mongodb.yaml`
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /appdata/logs/mongodb/mongodb.log
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
		     pidFilePath: /appdata/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.24.60.173
		     bindIpAll: false
		     maxIncomingConnections: 10000
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
		     dbPath: /appdata/mongodb/data/db
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 3
		           journalCompressor: snappy
		           directoryForIndexes: true
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
		     replSetName: mongodb-repl-konke
		     enableMajorityReadConcern: true
		  ```
	- ### SECONDARY
		- `/usr/local/konke/mongodb/mongodb-konke/bin/mongodb_yaml/slave1/mongodb.yaml`
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /appdata/logs/mongodb/mongodb.log
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
		     pidFilePath: /appdata/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.24.60.175
		     bindIpAll: false
		     maxIncomingConnections: 10000
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
		     dbPath: /appdata/mongodb/data/db
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 3
		           journalCompressor: snappy
		           directoryForIndexes: true
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
		     replSetName: mongodb-repl-konke
		     enableMajorityReadConcern: true
		  ```
	- ### ARBITER
		- `/usr/local/konke/mongodb/mongodb-konke/bin/mongodb_yaml/arbiter/mongodb.yaml`
		- ```yaml
		  systemLog:
		     verbosity: 0
		     quiet: true
		     traceAllExceptions: false
		     syslogFacility: user
		     path: /data/logs/mongodb/mongodb.log
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
		     pidFilePath: /data/mongodb/mongodb.pid
		     timeZoneInfo: /usr/share/zoneinfo
		  net:
		     port: 27017
		     bindIp: 172.24.71.31
		     bindIpAll: false
		     maxIncomingConnections: 10000
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
		     dbPath: /data/mongodb/data/db
		     journal:
		        enabled: true
		        commitIntervalMs: 100
		     directoryPerDB: true
		     syncPeriodSecs: 60
		     engine: wiredTiger
		     wiredTiger:
		        engineConfig:
		           cacheSizeGB: 0.25
		           journalCompressor: snappy
		           directoryForIndexes: true
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
		     replSetName: mongodb-repl-konke
		     enableMajorityReadConcern: true
		  ```
-
- ## 安装包
	- [MongoDB 4.4.12.tgz](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.12.tgz)
-
- ## 工具包
	- [MongoDB Database Tools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-rhel70-x86_64-100.5.2.tgz)
-
- ## 正常升级流程
	- DONE 上传升级包至服务器
	- TODO 数据备份： [[mongodump]]
	- TODO 升级ARBITER
	- TODO 升级SECONDARY
	- TODO 升级PRIMARY
- ## 异常处理
	- TODO 数据恢复： [[mongorestore]]
	- TODO 重装4.4.12： [[mongodb 4.2安装]]