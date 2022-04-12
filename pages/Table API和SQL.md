- ## 基本API
	- ### 程序架构
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
		- Table API和SQL需要一个特别的运行时环境,就是所谓的"表环境"(TableEnvironment).它主要负责:
			- 注册Catalog和表
			- 执行SQL查询
			- 注册用户自定义函数(UDF)
			- DataStream和表之间的转换
	- ### 创建表
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
			-
-