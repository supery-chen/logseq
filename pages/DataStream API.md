- 一个Flink程序,其实就是对DataStream的各种转换.具体来说,代码基本都由以下几部分构成
  collapsed:: true
	- 获取执行环境(execution environment)
	- 读取数据源(source)
	- 定义基于数据的转换操作(transformation)
	- 定义计算结果的输出位置(sink)
	- 触发程序执行(execute)
- ((624551f0-6d44-4f88-b3d9-9d73db8febc9))
-
- ## 执行环境(Execution Environment)
  collapsed:: true
	- ### 创建执行环境
		- #### getExecutionEnvironment
			- 最简单的方法,会根据当前运行的上下文直接得到正确的结果,是最常用的一种创建执行环境的方式
			- ((6245531d-7ab5-43c2-8e46-cace6d0eb13c))
		- #### createLocalEnvironment
			- 返回一个本地执行环境.可以在调用时传入一个参数,指定默认的并行度;如果不传入,则默认并行度就是本地CPU核心数
			- ((62455327-4900-47c2-a95b-64c588a3069e))
		- #### createRemoteEnvironment
			- 返回集群执行环境.需要在调用时指定JobManager的主机名和端口号,并指定要在集群中运行的Jar包
			- ((62455333-4059-4d0a-a266-e4d36f31f389))
		- ((6245533d-b444-4af3-855e-91035b9a28e8))
	- ### 执行模式
		- `bin/flink run -Dexecution.runtime-mode=BATCH`
		- `bin/flink run -Dexecution.runtime-mode=STREAMING`
		- `bin/flink run -Dexecution.runtime-mode=AUTOMATIC`
	- ### 触发程序执行
		- `env.execute()`
-
- ## 源算子(source)
  collapsed:: true
	- ((6245550b-ea82-43bc-ab73-c4b9d079dd19))
	- ### 内置的数据源获取方式
	  collapsed:: true
		- ```java
		  //创建执行环境
		  StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
		  //从文件读取数据
		  env.readTextFile("input/clicks.txt");
		  //从集合读取数据
		  List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);
		  env.fromCollection(nums);
		  //从元素读取数据
		  env.fromElements(1,2,3,4,5,6);
		  //从socket读取数据
		  env.socketTextStream("node110", 7777);
		  //从kafka读取数据
		  Properties properties = new Properties();
		  properties.setProperty("bootstrap.servers", "node110:9092");
		  properties.setProperty("auto.offset.reset", "latest");
		  env.addSource(new FlinkKafkaConsumer<>("clicks", new SimpleStringSchema(), properties));
		  //....除了上述这些,flink还为我们提供了很多内置的数据源获取方式
		  ```
	- ### 自定义数据源
	  collapsed:: true
		- 实现`SourceFunction`接口,实现其内部的`run`方法与`cancel`方法
		- > 直接实现`SourceFunction`,不能并行处理,如果想要并行处理,需要实现`ParallelSourceFunction`
		- ```java
		  import org.apache.flink.streaming.api.functions.source.SourceFunction;
		  
		  import java.util.Calendar;
		  import java.util.Random;
		  
		  public class ClickSource implements SourceFunction<Event> {
		  
		      //声明一个标志位
		      private volatile boolean running = true;
		  
		      @Override
		      public void run(SourceContext<Event> ctx) {
		          //随机生成数据
		          final Random random = new Random();
		          //定义字段选取数据集
		          final String[] users = {"Mary", "Alice", "Bob", "Cary"};
		          final String[] urls = {"./home", "./cart", "./fav", "./prod?id=100", "./prod?id=10"};
		          while (running) {
		              String user = users[random.nextInt(users.length)];
		              String url = urls[random.nextInt(urls.length)];
		              long timestamp = Calendar.getInstance().getTimeInMillis();
		              ctx.collect(new Event(user, url, timestamp));
		              Thread.sleep(1000);
		          }
		      }
		  
		      @Override
		      public void cancel() {
		          running = false;
		      }
		  }
		  ```
	-
-
- ## 转换算子(transformation)
  collapsed:: true
	- ((62466b57-e09a-407f-bdf8-4e7212545c6e))
	- ### 基本转换
		- map
		- filter
		- flatMap
	- ### 聚合算子
		- keyBy(按键区分)
		- 简单聚合
			- sum
			- min
			- max
			- minBy
			- maxBy
		- reduce(归约聚合)
	- ((6246c794-102a-411c-8d96-1a780b226178))
	- ### 物理分区
		- 随机分区-`shuffle`
		- 轮询分区-`round-robin`
		- 重缩放分区-`rescale`
		- 广播-`broadcast`
		- 全局分区-`global`
-
- ## 输出算子(sink)
	- ((624d0a28-e019-4df0-b32c-11d000f59cf8))
	- ((624d0aa0-3e59-4af2-87e7-97cfae105126))
	- ### 输出到文件
		- ((624d5897-727a-4259-ba83-8dfcd325e250))
		- ((624d58b3-f284-494c-b4db-60cdbbf1b3bf))
		-
-
- ## 触发程序执行(execute)
-
-