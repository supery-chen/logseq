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
			-
-