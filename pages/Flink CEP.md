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
  collapsed:: true
	- ### 引入依赖
	  collapsed:: true
		- ```xml
		  <dependency>
		  	<groupId>org.apache.flink</groupId>
		  	<artifactId>flink-cep_${scala.binary.version}</artifactId>
		  	<version>${flink.version}</version>
		  </dependency>
		  ```
	- ### 简单实例
	  collapsed:: true
		- ```java
		  package com.superychen.chapter12;
		  
		  import org.apache.flink.api.common.eventtime.WatermarkStrategy;
		  import org.apache.flink.cep.CEP;
		  import org.apache.flink.cep.PatternSelectFunction;
		  import org.apache.flink.cep.PatternStream;
		  import org.apache.flink.cep.pattern.Pattern;
		  import org.apache.flink.cep.pattern.conditions.SimpleCondition;
		  import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
		  import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
		  
		  import java.time.Duration;
		  import java.util.List;
		  import java.util.Map;
		  
		  public class FrequentLoginFailedDetectExample {
		      public static void main(String[] args) throws Exception {
		          StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
		          env.setParallelism(1);
		          //获取登录事件流
		          SingleOutputStreamOperator<LoginEvent> loginEventStream = env.fromElements(
		                  new LoginEvent("user_1", "192.168.0.1", "fail", 2000L),
		                  new LoginEvent("user_1", "192.168.0.2", "fail", 3000L),
		                  new LoginEvent("user_2", "192.168.1.29", "fail", 4000L),
		                  new LoginEvent("user_1", "172.56.23.10", "fail", 5000L),
		                  new LoginEvent("user_2", "192.168.1.29", "fail", 7000L),
		                  new LoginEvent("user_2", "192.168.1.29", "fail", 8000L),
		                  new LoginEvent("user_2", "192.168.1.29", "success", 6000L)
		          ).assignTimestampsAndWatermarks(
		                  WatermarkStrategy.<LoginEvent>forBoundedOutOfOrderness(Duration.ZERO)
		                          .withTimestampAssigner((e, t) -> e.timestamp)
		          );
		          //定义模式,连续三次登录失败
		          Pattern<LoginEvent, LoginEvent> failPattern = Pattern
		                  //第一次登录失败
		                  .<LoginEvent>begin("first").where(new SimpleCondition<LoginEvent>() {
		                      @Override
		                      public boolean filter(LoginEvent value) {
		                          return "fail".equals(value.eventType);
		                      }
		                  })
		                  .next("second").where(new SimpleCondition<LoginEvent>() {
		                      @Override
		                      public boolean filter(LoginEvent value) {
		                          return "fail".equals(value.eventType);
		                      }
		                  })
		                  .next("third").where(new SimpleCondition<LoginEvent>() {
		                      @Override
		                      public boolean filter(LoginEvent value) {
		                          return "fail".equals(value.eventType);
		                      }
		                  });
		  
		          //将模式应用到数据流上,检测复杂事件
		          PatternStream<LoginEvent> loginEventPatternStream =
		                  CEP.pattern(loginEventStream.keyBy(e -> e.userId), failPattern);
		  
		          //将检测到的复杂事件提取出来,进行处理得到报警信息
		          SingleOutputStreamOperator<String> alarmStream = loginEventPatternStream.select(new PatternSelectFunction<LoginEvent, String>() {
		              @Override
		              public String select(Map<String, List<LoginEvent>> map) throws Exception {
		                  //提取复杂事件中的三次登陆失败事件
		                  LoginEvent firstFailedEvent = map.get("first").get(0);
		                  LoginEvent secondFailedEvent = map.get("second").get(0);
		                  LoginEvent thirdFailedEvent = map.get("third").get(0);
		                  return firstFailedEvent.userId + " 连续三次登录失败! 登录时间 " + firstFailedEvent.timestamp + ", " + secondFailedEvent.timestamp + ", " + thirdFailedEvent.timestamp;
		              }
		          });
		          alarmStream.print("alarm");
		  
		          env.execute();
		      }
		  }
		  ```
-
- ## 模式API(Pattern API)
	- ### 个体模式
	  collapsed:: true
		- ((62565e9a-ab53-47e3-a356-3fa0c388b8e1))
		- #### 基本形式
			- 在上面的简单实例中,每一个登陆失败事件的选取规则,就是一个个体模式.比如
			- ```java
			  //第一次登录失败
			  .<LoginEvent>begin("first").where(new SimpleCondition<LoginEvent>() {
			  	@Override
			  	public boolean filter(LoginEvent value) {
			  		return "fail".equals(value.eventType);
			  	}
			  })
			  ```
			- 或者后面的
			- ```java
			  .next("second").where(new SimpleCondition<LoginEvent>() {
			  	@Override
			  	public boolean filter(LoginEvent value) {
			  		return "fail".equals(value.eventType);
			  	}
			  })
			  ```
			- 这些都是个体模式.个体模式一般都会匹配接收一个事件
			- 每个个体模式都以一个**连接词**开始定义,如`begin`、`next`等.这些连接词方法有一个`String`类型的参数,就是当前模式唯一的名字.在之后检测到匹配事件时,就会以这个名字来指代匹配事件
			- 个体模式需要一个过滤条件,用来指定具体的匹配规则.这个条件一般通过调用`where()`方法来实现.具体的过滤逻辑则通过传入的`SimpleCondition`内的`filter()`方法定义
		- #### 量词(Quantifiers)
		  collapsed:: true
			- ((62566e21-3cc4-4e42-8690-86f457fa6f82))
			- ((62566e30-9a45-4624-9466-f8ccb4ca7261))
			- ((62566e43-2e0d-4532-a289-36465544f82a))
			- ##### .oneOrMore()
			- ##### .times(times)
			- ##### .timesOrMore(times)
			- ##### .greedy()
			- ##### .optional()
			- 对于一个个体模式pattern来说,后面所有可以添加的量词如下
			- ```java
			  // 匹配事件出现4次
			  pattern.times(4);
			  // 匹配事件出现4次,或者不出现
			  pattern.times(4).optional();
			  // 匹配事件出现2,3或者4次
			  pattern.times(2,4);
			  // 匹配事件出现2,3或者4次,并且尽可能多地匹配
			  pattern.times(2,4).greedy();
			  // 匹配事件出现2,3,4次或者不出现
			  pattern.times(2,4).optional();
			  // 匹配事件出现2,3,4次,或者不出现,并且尽可能多地匹配
			  pattern.times(2,4).optioanl().greedy();
			  // 匹配事件出现1次或多次
			  pattern.oneOrMore();
			  // 匹配事件出现1次或多次,并且尽可能多地匹配
			  pattern.oneOrMore().greedy();
			  // 匹配事件出现1次或多次,或者不出现
			  pattern.oneOrMore().optional();
			  // 匹配事件出现1次或多次,或者不出现,并且尽可能多地匹配
			  pattern.oneOrMore().optional().greedy();
			  // 匹配事件出现2次或多次
			  pattern.timesOrMore(2);
			  // 匹配事件出现2次或多次,并且尽可能多地匹配
			  pattern.timesOrMore(2).greedy();
			  // 匹配事件出现2次或多次,或者不出现
			  pattern.timesOrMore(2).optional();
			  // 匹配事件出现2次或多次,或者不出现,并且尽可能多地匹配
			  pattern.timesOrMore(2).optional().greedy();
			  ```
			-
		- #### 条件(Conditions)
			- ((6256706a-3d12-4427-9990-bb044a067b88))
			- ((62567090-8ee3-4e7e-8c6f-cb3b179cf9aa))
			- ((6256709c-04c8-49ae-8125-0430718760bc))
			- ((625670a9-70a2-4272-80a7-8d63132f2444))
				- ((62568911-d322-4219-a4ff-8670ac4f8844))
				- ((6256891c-50a4-4534-94fb-0f420762a677))
			- ((62568929-f9d6-49cf-91b8-f1139d65b38b))
				- ((62568959-7efa-4a5a-b6c4-6329783b8307))
				- ((62568963-af51-4226-a663-5b5680950a01))
				- ((62568969-e787-4a9a-bd72-cac7dc25e1c2))
			- ((6256893b-23ef-4605-8718-966c61ef08bd))
				- 对于循环模式而言,还可以指定一个终止条件(Stop Condition),表示遇到某个特定事件时当前模式就不再继续循环匹配了
				- 通过`.until()`方法来定义,同样传入一个`IteractiveCondition`作为参数
				- 终止条件只能与`oneOrMore()`或者`oneOrMore().optional()`结合使用
				- ((62568a06-c9cc-401d-adc4-7d549d3ea5c2))
	- ### 组合模式
	  collapsed:: true
		- ((62568a2c-cd55-4a8a-990b-753dcf05aadc))
		- ((62568a5f-afd3-417d-b496-66fbbdd009e1))
		- #### 初始模式(Initial Pattern)
		  collapsed:: true
			- ((62568a88-c545-4760-b550-e7d5abf2ecc8))
			- ```java
			  Pattern<Event, ?> start = Pattern.<Event>begin("start");
			  ```
		- #### 近邻条件(Contiguity Conditions)
		  collapsed:: true
			- ##### 严格近邻
				- ((625697d0-a60e-4e18-8520-32b37a7566af))
			- ##### 宽松近邻
				- ((625697df-4df1-4818-97b4-334b7b6f4f90))
				- ((625697f3-10e7-4cbc-98b3-6e1729dcb0b9))
			- ##### 非确定性宽松近邻
				- ((6256982f-26e6-48a5-989b-fac7457f20dc))
				- ((6256983f-e126-4b41-aee5-b68481b2cfca))
		- #### 其它限制条件
		  collapsed:: true
			- ((625698c6-e3af-475d-81d8-aad93d760057))
			- ((625698cc-deab-4659-af00-887a9fc3bd56))
			- ((625698df-1860-4982-8893-fb05b168622c))
			- ((625698ef-7c1b-4ce4-b4a6-bb6e10071439))
			- ((62569904-e473-45d3-995c-08d3884b407f))
			- ```java
			  // 严格近邻条件
			  Pattern<Event, ?> strict = start.next("middle").where(...);
			  // 宽松近邻条件
			  Pattern<Event, ?> relaxed = start.followedBy("middle").where(...);
			  // 非确定性宽松近邻条件
			  Pattern<Event, ?> nonDetermin = start.followedByAny("middle").where(...);
			  // 不能严格近邻条件
			  Pattern<Event, ?> strictNot = start.notNext("not").where(...);
			  // 不能宽松近邻条件
			  Pattern<Event, ?> relaxedNot = start.notFollowedBy("not").where(...);
			  // 时间限制条件
			  middle.within(Time.seconds(10));
			  ```
		- #### 循环模式中的近邻条件
		  collapsed:: true
			- ((62569b1c-1ceb-457d-9e28-57c31d4fb11e))
			- ((62569b25-85f3-466c-b09e-8811e14f9c1b))
			- ((62569b3f-7792-4eb0-abaa-a3d44cf6b72b))
				- ((62569b47-43a7-4797-9226-4e54019cf583))
				- ((62569b55-d137-4714-a32f-07dbe208d124))
			- ((62569b69-e7e8-454a-9f27-12f52b99d9cc))
				- ((62569b75-9241-4603-8078-527228b0dbf6))
		-
	- ### 模式组
		- ((62569bab-3738-4fae-b923-ce9407a73ef7))
		-