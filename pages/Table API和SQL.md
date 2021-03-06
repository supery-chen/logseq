public:: true

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
  collapsed:: true
	- ((62554e63-dfc8-4d4a-a3d8-56e6ea3b2542))
	- ### 分组聚合
	  collapsed:: true
		- ((62554f49-cd1a-43ec-a931-6511e2b576c4))
	- ### 窗口聚合
	  collapsed:: true
		- ((62554f6e-8840-43af-824b-a4797c6cfad8))
		- ((62554f7d-42da-4d36-8248-3b0f099c4a59))
		- ((62554f88-cc1b-48ea-b4d9-eddd612cce24))
		- ((62554f97-a55e-4cd0-afef-ded15d295882))
	- ### 开窗聚合
	  collapsed:: true
		- ((625555c0-af03-4f47-8529-18bd4109e10b))
		- ```sql
		  SELECT
		  	<聚合函数> OVER (
		        [PARTITION BY <字段1>[, <字段2>, ...]]
		        ORDER BY <时间属性字段>
		        <开窗范围>),
		  	...
		  FROM ...
		  ```
		- ((6255560a-3305-4083-86cd-f28109030b71))
		- ((62555615-f117-41d8-adce-5ac6454bd780))
		- ((6255561e-b0d6-4907-ba8c-978d45b7c067))
			- ((62555625-b1a2-4734-b83b-9b1e088c3dc1))
			- ((6255562a-5916-409d-a4c2-9020fddce33b))
		- ((62555750-c2e3-4e6d-9eb5-1ea7ff1784c8))
-
- ## 联结(Join)查询
  collapsed:: true
	- ((62556ef9-9495-4bde-bc1c-7f547178abcd))
	- ((62556f10-2f77-404f-bfbd-1d09ab46a87c))
	- ### 常规联结查询
		- > ((62556f6a-7c92-4216-9e64-ca53a8ddc236))
		- #### 等值内联结
			- ((62556f38-ce83-4289-ad7f-b6ee58a1c9f1))
		- #### 等值外联结
			- ((62556f3f-cdc0-4f81-b2b8-eeefa3302a9a))
	- ### 间隔联结查询
		- ((62556fc0-727e-421c-a24a-73913fd76a11))
			- ((62556fc5-e1de-4f86-8e06-eb5106a090c1))
				- 不需要JOIN关键字,直接在FROM后将要联结的两表列出来就可以,用逗号分隔.与标准SQL一致
			- ((62556fc9-3d0c-43a7-8d32-b40a0739df11))
				- 用WHERE子句来定义,用一个等值表达式描述
			- ((62556fce-dfc8-42db-b7b0-dc46976ef211))
				- 可以在WHERE子句中,连接条件后用AND追加一个时间间隔限制条件
				- ((62557374-b0ce-4876-85b9-67374199fbaf))
-
- ## 函数
  collapsed:: true
	- ((6255739d-143e-4164-9049-a26b73326287))
	- ((625573b0-dbe1-4959-993d-76e5ac919eee))
	- ### 系统函数
	  collapsed:: true
		- ((625573e9-186e-400a-be2a-096a1a9aa6db))
		- #### 标量函数
			- ((62557422-624e-4991-8a19-2d8a3a17c6b3))
			- ((62557435-b60d-4e84-90cd-3561a0b99019))
			- ((6255743d-c3a2-46c4-aed3-624834fdf4a6))
			- ((62557447-a6f5-4c93-94ee-d12c57700b81))
			- ((6255744f-ea60-4b49-a769-151c31894622))
			- ((62557455-0d37-44b5-bbf2-750b1135b014))
		- #### 聚合函数
			- ((6255748b-7a50-4306-8189-fd2adcb554d1))
			- ((62557497-297f-4e3e-9154-39af983838f4))
			- ((625574a1-8f2f-4d2e-aae6-6f0c83936f7b))
			- ((625574a6-7e8d-479c-beb0-3b9f93e84f2b))
			- ((625574ab-b766-4174-85ef-4867e1941b33))
			- ((625574b0-1bf3-46ef-865f-e99a863de297))
	- ### 自定义函数(UDF)
	  collapsed:: true
		- ((62557527-b312-4530-8a95-ea3116cee242))
			- ((6255752d-2f9a-4098-be83-7bdbed1c4767))
			- ((62557531-c142-43df-910d-33af4bbb4c29))
			- ((62557536-f10c-43dd-8bb3-8432c5f96b33))
			- ((6255753a-4dff-4f13-a4d9-46660e4f3808))
		- #### 整体调用流程
			- 注册函数
				- ```java
				  tableEnv.createTemporarySystemFunction("MyFunction", MyFunction.class);
				  ```
			- 使用Table API调用函数
				- ```java
				  tableEnv.from("MyTable").select(call("MyFunction", $("myField")));
				  ```
			- 在SQL中调用函数
				- ```java
				  tableEnv.sqlQuery("SELECT MyFunction(myField) FROM MyTable");
				  ```
				- ((62557613-9d1b-4047-9016-244d14ac52c2))
		- #### 标量函数(Scalar Functions)
			- ((6255763f-a746-4076-b04e-01c8a70a7fd3))
			- ((62557647-ff0d-46b1-8713-cf3f3822c659))
			- ```java
			  public static class HashFunction extends ScalarFunction {
			  	// 接受任意类型输入，返回INT 型输出
			      // 由于TableAPI在对函数进行解析时需要提取求值方法参数的类型引用，所以
			    	// 我们用DataTypeHint(inputGroup = InputGroup.ANY)对输入参数的类型做了标注，表示eval的参数可以是任意类型
			  	public int eval(@DataTypeHint(inputGroup = InputGroup.ANY) Object o) {
			  		return o.hashCode();
			  	}
			  }
			  
			  // 注册函数
			  tableEnv.createTemporarySystemFunction("HashFunction", HashFunction.class);
			  // 在SQL 里调用注册好的函数
			  tableEnv.sqlQuery("SELECT HashFunction(myField) FROM MyTable");
			  ```
		- #### 表函数(Table Functions)
			- ((625578bf-91f1-4c29-aa8a-4f405c318aeb))
			- ((625578d9-7429-4dfd-9d20-424c9a48f658))
			- ((625578e7-6d1e-47ce-9c33-c213ff4c83c6))
			- ```java
			  // 注意这里的类型标注，输出是Row类型，Row中包含两个字段：word和length。
			  @FunctionHint(output = @DataTypeHint("ROW<word STRING, length INT>"))
			  public static class SplitFunction extends TableFunction<Row> {
			      public void eval(String str) {
			          for (String s : str.split(" ")) {
			            	//使用collect()方法发送一行数据
			            	collect(Row.of(s, s.length()));
			          }
			      }
			  }
			  
			  // 注册函数
			  tableEnv.createTemporarySystemFunction("SplitFunction", SplitFunction.class);
			  
			  // 在SQL 里调用注册好的函数
			  // 1. 交叉联结
			  tableEnv.sqlQuery("SELECT myField, word, length " +
			                    "FROM MyTable, LATERAL TABLE(SplitFunction(myField))");
			  // 2. 带ON TRUE条件的左联结
			  tableEnv.sqlQuery("SELECT myField, word, length " +
			                    "FROM MyTable " +
			                    "LEFT JOIN LATERAL TABLE(SplitFunction(myField)) ON TRUE");
			  // 重命名侧向表中的字段
			  tableEnv.sqlQuery("SELECT myField, newWord, newLength " +
			                    "FROM MyTable " +
			                    "LEFT JOIN LATERAL TABLE(SplitFunction(myField)) AS T(newWord, newLength) ON TRUE");
			  ```
		- #### 聚合函数(Aggregate Functions)
			- ((62557c89-7cba-4780-9bce-706df8eaca19))
			- ((62557c93-792b-441c-98fb-64951d252568))
			- ((62557c9b-7f66-46f2-a0da-14aaae888d9c))
			- ((62557ca1-32b3-4793-aef8-4a23c53ca917))
			- ((62557ca8-a98b-49de-96da-3ee5af033c9c))
			- ((62557cb0-0309-4ee8-ba0f-a2b3740d1c7a))
				- ((62557cb6-d431-4d13-9a4a-ee5925271c39))
					- ((62557cbb-79e4-49db-a20d-eea26ad6b14d))
				- ((62557cc7-244e-46bb-ae6b-ee16a35e30d0))
					- ((62557cdc-beee-4a47-af70-26c30c5a0994))
				- ((62557ce4-552e-49d4-82b0-2171b1b441f6))
					- ((62557ceb-81c6-4d74-b52b-7c8ec69da065))
			- ((62557cf6-0b70-4b6c-aebe-835ac202a6d1))
		- #### 表聚合函数(Table Aggregate Functions)
			- ((62557d3d-78a3-4f4e-b246-8d3aabb68317))
			- ((62557d4b-ca7b-45e0-9c89-84784be30eb9))
				- ((62557d54-aef5-4dfa-98b9-c599c7b46d1a))
				- ((62557d5a-a192-4e46-8ee0-b211463b565d))
				- ((62557d5e-6d77-4ae3-80a4-906afab59b55))
					- ((62557d6d-8a87-41a1-bf2f-cdb325cc7c04))
			- > 表聚合函数目前SQL中支持不好,所以使用Table API进行调用(flatAggregate)
-
- ## SQL客户端
  collapsed:: true
	- ((62562b76-84ab-4802-95cb-67afeee40b0f))
-
- ## 连接到外部系统
  collapsed:: true
	- ### Kafka
	  collapsed:: true
		- #### 引入依赖
		  collapsed:: true
			- ```xml
			  <dependency>
			  	<groupId>org.apache.flink</groupId>
			  	<artifactId>flink-connector-kafka_${scala.binary.version}</artifactId>
			  	<version>${flink.version}</version>
			  </dependency>
			  ```
			- ((62562c0e-bf5c-4591-97e8-1d85bf9ea387))
			- ((62562c18-cc13-4443-9466-477199add86f))
			- ```xml
			  <dependency>
			  	<groupId>org.apache.flink</groupId>
			  	<artifactId>flink-csv</artifactId>
			  	<version>${flink.version}</version>
			  </dependency>
			  ```
		- #### 创建连接到Kafka的表
		  collapsed:: true
			- ```sql
			  CREATE TABLE KafkaTable {
			    `user` STRING,
			    `url`	STRING,
			    `ts`	TIMESTAMP(3) METADATA FROM `timestamp`
			  } WITH {
			    'connector' = 'kafka',
			    'topic' = 'events',
			    'properties.bootstrap.servers' = 'localhost:9092',
			    'properties.group.id' = 'testGroup',
			    'scan.startup.mode' = 'earliest-offset',
			    'format' = 'csv'
			  }
			  ```
			- ((62562d37-0826-48de-acd6-79707b52d8ca))
			- > connector为kafka类型,只能处理仅追加模式的数据,如果我们要将有更新操作的结果表写入kafka,就会因为kafka无法识别撤回或更新插入消息而导致异常
		- #### Upsert Kafka
		  collapsed:: true
			- > 为了解决上面的问题,Flink单独提供了`upsert-kafka`类型的connector.这个连接器支持以更新插入的方式向kafka的topic中读写数据
	- ### 文件系统
	  collapsed:: true
		- Flink内置`filesystem`类型的connector,支持从本地或者分布式的文件系统中读写数据
		- ```sql
		  CREATE TABLE MyTable (
		  	column_name1 INT,
		  	column_name2 STRING,
		  	...
		  	part_name1 INT,
		  	part_name2 STRING
		  ) PARTITIONED BY (part_name1, part_name2) WITH (
		  	'connector' = 'filesystem',	--连接器类型
		  	'path' = '...',				--文件路径
		  	'format' = '...'			--文件格式
		  )
		  ```
	- ### JDBC
	  collapsed:: true
		- ((62563095-e26e-4f0c-b8fb-052eb98f89b8))
		- ((625630a6-3fff-46c1-a2a5-6d41f718afa5))
		- #### 引入依赖
		  collapsed:: true
			- ```xml
			  <dependency>
			  	<groupId>org.apache.flink</groupId>
			  	<artifactId>flink-connector-jdbc_${scala.binary.version}</artifactId>
			  	<version>${flink.version}</version>
			  </dependency>
			  ```
			- 此外,为了连接特定数据库,我们还要引入相关的驱动器依赖,以MySQL为例
			- ```xml
			  <dependency>
			  	<groupId>mysql</groupId>
			  	<artifactId>mysql-connector-java</artifactId>
			  	<version>${mysql-connector.version}</version>
			  </dependency>
			  ```
		- #### 创建JDBC表
		  collapsed:: true
			- 与创建Upsert Kafka大同小异
			- ```sql
			  --创建一张连接到MySQL的表
			  CREATE TABLE MyTable (
			  	id BIGINT,
			  	name STRING,
			  	age INT,
			  	status BOOLEAN,
			  	PRIMARY KEY (id) NOT ENFORCED
			  ) WITH (
			  	'connector' = 'jdbc',
			  	'url' = 'jdbc:mysql://localhost:3306/mydatabase',
			  	'table-name' = 'users'
			  );
			  --将另一张表T的数据写入到MyTable 表中
			  INSERT INTO MyTable
			  	SELECT id, name, age, status FROM T;
			  ```
			- 这里创建表的DDL中定义了主键，所以数据会以Upsert模式写入到MySQL表中；而到MySQL的连接，是通过WITH子句中的url定义的。要注意写入MySQL中真正的表名称是users，而MyTable是注册在Flink表环境中的表
	- ### Elasticsearch
	  collapsed:: true
		- ((62563238-5a64-4551-b2d1-3a53cad7106b))
	- ### HBase
	  collapsed:: true
		- ((62563249-fb10-4116-b05e-47e58ec7c44c))
	- ### Hive
	  collapsed:: true
		- ((6256326d-dcbd-4aa7-9885-c37eb0deb099))
		- ((62563291-1654-4195-839a-a6ebbad8be62))
			- ((6256329b-b26d-4846-b0b8-81c86e1d056f))
			- ((625632a1-450e-406b-ae5e-cda1f6f1bc9b))
			- ((625632cd-a70c-4a5e-85c9-96a3711b96d5))