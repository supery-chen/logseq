- 以Mono为例开始我们的探险之旅
- ```java
  Mono.just("tom")
          .map(s -> s.concat("@qq.com"))
          .filter(s -> s.length() > 5)
          .subscribe(System.out::println);
  ```
- 这段代码的意思是，将`String`对象增加一个邮箱后缀，并过滤出长度大于`5`的字符串再打印出来，这是一个非常简单的逻辑
- ## 声明阶段
- ```java
  public static <T> Mono<T> just(T data) {
  	return onAssembly(new MonoJust<>(data));
  }
  ```
- 我们可以看到，这里只是将data包裹成了一个`MonoJust`对象，我们来看看它的声明
- ```java
  final class MonoJust<T> extends Mono<T> 
  	implements Fuseable.ScalarCallable<T>, Fuseable, SourceProducer<T>  {
  	final T value;
  	MonoJust(T value) {
  		this.value = Objects.requireNonNull(value, "value");
  	}
    	//忽略
  }
  ```
- 在具体的实例中，`MonoJust`也仅仅是将`data`储存起来，然后返回回来了，那我们紧接着去看看`.map(s -> s.concat("@qq.com"))`又做了什么
-
-