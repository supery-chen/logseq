- ((62563a6e-c819-492f-be28-d4cc5903bdcf))
- ## 基本概念
  collapsed:: true
	- ### CEP是什么?
		- Complex Event Processing: 复杂事件处理
		- Flink CEP是Flink实现的一个用于复杂事件处理的库
		- CEP的流程可以分为三个步骤:
			- 定义一个匹配规则
			- 将匹配规则应用到事件流上,检测满足规则的复杂事件
			- 对检测到的复杂事件进行处理,得到结果输出
			- ((62563b16-a26e-4e28-9a40-9868d77f5a0d))
			- CEP是针对流处理而言的,分析的是低延迟、频繁产生的事件流
			- 主要目的就是在无界流中检测出特定的数据组合,让我们有机会掌握数据中重要的高阶特征
	- ### 模式(Pattern)
		- 模式的定义就是两部分内容
			- 每个简单事件的特征
			- 简单事件之间的组合关系
		- ((62563bc1-a315-44e1-b2cf-c076c09f46b5))
	- ### 应用场景
		- ((62563bd9-5f9a-4465-8c30-21e31ca3d218))
		- ((62563bdd-0477-449a-8744-2ccba22f41c6))
		- ((62563be1-6f7a-40b0-9b2b-655d28fe6aca))
-
- ## 快速上手
	- ### 引入依赖
		- ```xml
		  <dependency>
		  	<groupId>org.apache.flink</groupId>
		  	<artifactId>flink-cep_${scala.binary.version}</artifactId>
		  	<version>${flink.version}</version>
		  </dependency>
		  ```
		-
	-