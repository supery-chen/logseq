title:: mongodb线上4.4.4升级至4.4.12

- ## 节点地址
- PRIMARY：172.24.60.173:27017
- SECONDARY：172.24.60.175:27017
- ARBITER：172.24.71.31:27017
-
- ## 配置文件
	- ### master
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
	- ### slave
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
	- ### arbiter
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