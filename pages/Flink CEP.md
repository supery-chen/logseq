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
		- ((62565e9a-ab53-47e3-a356-3fa0c388b8e1))
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
		- 每个个体模式都以一个**连接词**开始定义,如begin、next等.这些连接词方法有一个String类型的参数,就是当前模式