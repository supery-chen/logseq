- ## 基本API
  collapsed:: true
	- ### 程序架构
	  collapsed:: true
		- ```java
		  // 创建表环境
		  TableEnvironment tableEnv = ...;
		  // 创建输入表，连接外部系统读取数据
		  tableEnv.executeSql("CREATE TEMPORARY TABLE inputTable ... WITH ( 'connector' = ... )");
		  // 注册一个表，连接到外部系统，用于输出
		  tableEnv.executeSql("CREATE TEMPORARY TABLE outputTable ... WITH( 'connector' = ... )");
		  //执行SQL对表进行查询转换，得到一个新的表
		  Table table1= tableEnv.sqlQuery("SELECT ... FROM inputTable... ");
		  // 使用TableAPI对表进行查询转换，得到一个新的表
		  Table table2= tableEnv.from("inputTable").select(...);
		  // 将得到的结果写入输出表
		  TableResult tableResult = table1.executeInsert("outputTable");
		  ```
	- ### 创建表环境
	  collapsed:: true
		- Table API和SQL需要一个特别的运行时环境,就是所谓的"表环境"(TableEnvironment).它主要负责:
			- 注册Catalog和表
			- 执行SQL查询
			- 注册用户自定义函数(UDF)
			- DataStream和表之间的转换
	- ### 创建表
	  collapsed:: true
		- #### 连接器表(Connector Tables)
			- ((6255138a-7c0d-41d5-97d5-7564d310dd77))
			- ```java
			  tableEnv.executeSql("CREATE [TEMPORARY]TABLE MyTable ... WITH ( 'connector' = ... )");
			  ```
		- #### 虚拟表
			- 在虚拟环境注册之后,我们就可以在SQL中直接使用这张表进行查询转换了
			- ```java
			  Table newTable = tableEnv.sqlQuery("SELECT ... FROM MyTable... ");
			  ```
			- 这里调用了表环境的sqlQuery,直接传入一条SQL语句作为参数执行查询,得到的一个Table对象.Table是Table API中提供的核心接口类,就代表一个Java中定义的表实例
			- 得到的newTable是一个中间转换结果,如果之后希望直接使用这个表执行SQL,又该怎么做呢?由于newTable是一个Table对象,并没有在表环境中注册;所以我们还需要将这个中间结果表注册到环境中,才能在SQL中使用
			- ```java
			  tableEnv.createTemporaryView("NewTable", newTable);
			  ```
	- ### 表的查询
	  collapsed:: true
		- ((6255158a-a6ef-4264-b231-3def7889e51d))
		- #### 执行SQL进行查询
			- ((625515ad-2cc6-4101-9ee6-c737a55a0cb3))
		- #### 调用Table API进行查询
			- ((625515b6-4cf6-4076-af5a-1e6d260ea333))
		- #### 结合使用
			- ((625515cb-85f3-488b-b5cd-a8164f6f4fc8))
			- (1) 无论是那种方式得到的Table对象，都可以继续调用Table API进行查询转换；
			- (2) 如果想要对一个表执行SQL操作(用FROM关键字引用)，必须先在环境中对它进行注册。所以我们可以通过创建虚拟表的方式实现两者的转换：
			- ```java
			  tableEnv.createTemporaryView("NewTable", newTable);
			  ```
			- > 另外要说明的是，在11.1.2小节的简单示例中，我们并没有将Table对象注册为虚拟表就直接在SQL中使用了：
			  ```java
			  Table clickTable = tableEnvironment.sqlQuery("select url, user from " + eventTable);
			  ```
			  这其实是一种简略的写法，我们将Table对象名eventTable直接以字符串拼接的形式添加到SQL语句中，在解析时会自动注册一个同名的虚拟表到环境中，这样就省略了创建虚拟视图的步骤
	- ### 输出表
	  collapsed:: true
		- ((62551cee-6d38-42f7-a471-1f72e966bb88))
	- ### 表和流的转换
	  collapsed:: true
		- ((62551d28-22c4-4fbf-ae2c-996e4d64d5f9))
		  collapsed:: true
			- ((62552ae9-09b4-415d-9d45-be8cd248dab6))
			- ((62552af4-7cc9-4984-9fe3-81445329a362))
				- ((62552b09-bdf9-43fa-9661-a3e1f4a7aef3))
		- ((62551d35-ce6a-4225-9eb1-bec347a67897))
		  collapsed:: true
			- ((62552b25-0636-413d-b046-bfa68823f49f))
			- ((62552b33-8471-4e31-88a4-cfa737b234a4))
			- ((62552b3d-9e8d-452f-af7f-d57b963112e9))
		- ((62551d54-3f53-4ea1-a91c-8893e18f3c81))
			- ((62552b65-ae27-4697-84dc-6e7b69956948))
				- 当原子类型不做重命名时,默认的字段名就是`f0`
			- ((62552b6c-d473-4055-bb96-db1543dce882))
			- ((62552bba-b27d-4dae-97ba-8e02e26912b3))
			- ((62552bcd-ae41-4b4d-86dd-f1617e515888))
-
- ## 流处理中的表
  collapsed:: true
	- ||关系型表/SQL|流处理|
	  |处理的数据对象|字段元组的有界集合|字段元组的无限序列|
	  |--|--|--|
	  |查询(Query)|可以访问到完整的数据输入|无法访问到所有数据,必须"持续"等待流输入|
	  |对数据的访问|||
	  |查询终止条件|生成固定大小的结果集后终止|永不停止,根据持续收到的数据不断更新查询结果|
	- ### 动态表和持续查询
	  collapsed:: true
		- #### 动态表
			- ((62552da6-5944-4d50-8de3-10b0455a454e))
		- #### 持续查询
			- ((62552db2-a0d8-41ca-b4ef-f58819fa2ca7))
			- ((625530f1-da93-49b7-922d-d06ff6415928))
	- ### 将流转换成动态表
	  collapsed:: true
		- ((625531bd-461b-43be-9aa5-2beb05fa7f40))
	- ### 用SQL持续查询
	  collapsed:: true
		- #### 更新查询
			- ((6255322a-5a8b-4674-bc23-2f1e9ae175d8))
			- 具体步骤解释如下:
				- 当查询启动时,原始动态表EventTable为空
				- 当第一行Alice的点击数据插入EventTable表时,查询开始计算结果表,urlCountTable中插入一行数据[Alice, 1]
				- 当第二行Bob点击数据插入EventTable表时,查询将更新结果表并插入新行[Bob, 1]
				- 当第三行数据到来,同样是Alice的点击事件,这时不会插入新行,而是生成一个针对已有行的更新操作.这样,结果表中第一行[Alice, 1]就更新为[Alice, 2]
				- 当第四行Cary的点击数据插入到EventTable表时,查询将第三行[Cary, 1]插入到结果表中
		- #### 追加查询
			- ((62553324-15ab-45d7-9dc8-1198af59bde2))
			- ((62553338-4ca4-4874-9f74-31035c29f180))
			- 聚合结果保持不变的一个典型的例子就是窗口聚合
			- ((625533d1-021f-4487-ad63-3a747aadfaef))
		- #### 查询限制
			- ((62553468-e6a6-4f38-80cc-540050a238af))
	- ### 将动态表转换成流
	  collapsed:: true
		- ((6255354c-b0fc-4ada-8a92-6f93c8a9ddee))
			- ((62553554-73b9-4a9a-9791-45baf4ba83c5))
			- ((62553559-0930-4942-b41f-0d3a4757e8b4))
			- ((62553560-dc5f-4aa0-b697-4ed1f942a380))
				- ((625535f4-7572-427a-9a88-77171f616e0d))
				- ((625535fe-8c3a-4c56-a568-81679d489afa))
				- ((6255360e-50d1-473e-8d68-144ad93bd1b5))
-
- ## 时间属性和窗口
  collapsed:: true
	- ((6255392b-7da9-4d65-aa96-237af57c7411))
	- ### 事件时间
		- #### 在创建表的DDL中定义
			- ((625539a0-c1b3-43a4-be23-97bf834c2ac1))
			- ```sql
			  CREATE TABLE EventTable(
			    user STRING,
			    url STRING,
			    ts TIMESTAMP(3),
			    WATERMARK FOR ts AS ts -INTERVAL '5' SECOND
			  ) WITH (
			    ...
			  );
			  ```
			- ((625539f8-c868-4dc2-8cb5-5f6e8e653ffc))
			- ((625539ff-590a-42f0-9aef-43dda244f83a))
			- ```sql
			  CREATE TABLE events (
			    user STRING,
			    url STRING,
			    ts BIGINT,
			    ts_ltz AS TO_TIMESTAMP_LTZ(ts, 3),
			    WATERMARK FOR ts_ltz AS time_ltz -INTERVAL '5' SECOND
			  ) WITH (
			    ...
			  );
			  ```
			- ((62553a37-fa2a-467b-965b-d8c263debf8c))
		- #### 在数据流转换为表时定义
			- ((62553a57-32e6-43eb-a751-e4c34d10f230))
	- ### 处理时间
		- ((62554311-c581-4134-b602-c3b27fa74b1c))
		- ((6255431a-a128-48df-8dcd-c1ff7605b73e))
		- ((62554322-bf67-4e26-b058-7ce2ccd622ad))
	- ### 窗口
		- ((625543ad-b397-46dc-b491-940dfb30413c))
		- ((62554e23-67a2-4c75-9aff-d4a380e88ba6))
		- ((62554e2a-caeb-443e-a020-ad8c0084ac1e))
		- ((62554e31-8844-4dfe-940e-38eba7551833))
-
- ## 聚合(Aggregation)查询
	- ((62554e63-dfc8-4d4a-a3d8-56e6ea3b2542))
	- ### 分组聚合
		- ((62554f49-cd1a-43ec-a931-6511e2b576c4))
	- ### 窗口聚合
		- ((62554f6e-8840-43af-824b-a4797c6cfad8))
		- ((62554f7d-42da-4d36-8248-3b0f099c4a59))
		- ((62554f88-cc1b-48ea-b4d9-eddd612cce24))
		- ((62554f97-a55e-4cd0-afef-ded15d295882))
		-