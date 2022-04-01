- 一个Flink程序,其实就是对DataStream的各种转换.具体来说,代码基本都由以下几部分构成
	- 获取执行环境(execution environment)
	- 读取数据源(source)
	- 定义基于数据的转换操作(transformation)
	- 定义计算结果的输出位置(sink)
	- 触发程序执行(execute)
- ((624551f0-6d44-4f88-b3d9-9d73db8febc9))
-
- ## 执行环境(Execution Environment)
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
	- ((6245550b-ea82-43bc-ab73-c4b9d079dd19))
	- ### 内置的数据源获取方式
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
		- 实现`SourceFunction`接口,实现其内部的`run`方法与`cancel`方法
		- import org.apache.flink.streaming.api.functions.source.SourceFunction;
		  
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
-
- ## 定义基于数据的转换操作(transformation)
-
-
- ## 定义计算结果输出位置(sink)
-
-
- ## 触发程序执行(execute)
-
-