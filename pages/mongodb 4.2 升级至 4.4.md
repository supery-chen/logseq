- [upgrade-revision](https://docs.mongodb.com/manual/tutorial/upgrade-revision/)
- ## 升级前
- ### 备份
	- 保证备份了最新的数据，参考[MongoDB Backup Methods](https://docs.mongodb.com/manual/core/backups/)
- ### 维护窗口
	- 如果您的安装包含副本集([replica sets](https://docs.mongodb.com/manual/reference/glossary/#std-term-replica-set))，请在预定义的维护时段内计划升级
- ### 更改流
	- Starting in MongoDB 4.0.7, change streams use a version 1 v1 resume tokens. MongoDB versions earlier than 4.0.7 use v0 resume tokens.
	- When upgrading from MongoDB 4.0.6 or earlier to MongoDB 4.0.7 or later, a client may try to resume change streams using the new v1 resume token when connected to a member that has not been updated (i.e. only accepts v0 or BinData token) and fail. In such cases, the client must wait for the upgrade to complete before resuming change streams.
- ### 暂存环境检查
	- 在升级生产环境之前，请按照本文档中的过程来升级复制生产环境的暂存环境，以确保您的配置与所有更改兼容
- ## 升级程序
- > 在升级MongoDB之前，一定要备份所有数据，具体参考 [[MongoDB备份恢复]]
- 使用此处描述的过程分别升级每一个mongod与mongos的二进制文件。升级二进制文件时，使用过程[[升级MongoDB实例]]
- 请遵循以下升级过程：
	- 1. 对于使用身份验证的部署，首先升级所有MongoDB驱动程序。要升级，请参阅[您的驱动程序文档](https://docs.mongodb.com/drivers/)
	  2. 升级分片集群，参考[升级分片集群](https://docs.mongodb.com/manual/tutorial/upgrade-revision/#std-label-upgrade-sharded-cluster)中所述
	  3. 升级任何独立实例，参考 [[升级MongoDB实例]]
	  4. 升级任何不属于分片集群的副本集，如[[升级副本集]]中所述
-