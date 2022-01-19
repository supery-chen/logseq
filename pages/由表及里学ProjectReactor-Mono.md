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
- ```java
  public final <R> Mono<R> map(Function<? super T, ? extends R> mapper) {
  	if (this instanceof Fuseable) {
  		return onAssembly(new MonoMapFuseable<>(this, mapper)); ➊
  	}
  	return onAssembly(new MonoMap<>(this, mapper)); ➋
  }
  ```
- 在➊➋处，我们发现都是简单的将这个`Function`包装成一个新的`MonoMapFuseable/MonoMap`对象返回，但是我们可以看到在`MonoMapFuseable`的构造函数中需要两个值
- ```java
  MonoMapFuseable(Mono<? extends T> source, Function<? super T, ? extends R> mapper) {
  	super(source);
  	this.mapper = Objects.requireNonNull(mapper, "mapper");
  }
  ```
- 这里和设计模式中的`代理模式`极为接近，我们每次将一个操作和源`Publisher`组合变成一个新`Publisher`，到这里我们已经明白在`subscribe()`之前，我们什么都没做，只是在不断包裹`Publisher`将作为原始的`Publisher`一层又一层的返回回来
- 下一步我们再去看看`.filter(s -> s.length() > 5)`又做了什么
- ```java
  public final Mono<T> filter(final Predicate<? super T> tester) {
  	if (this instanceof Fuseable) {
  		return onAssembly(new MonoFilterFuseable<>(this, tester)); ➊
  	}
  	return onAssembly(new MonoFilter<>(this, tester)); ➋
  }
  ```
- 在➊➋处，起始和上面类似，这里也就是简单的将Predicate包装成一个新的`MonoFilterFuseable/MonoFilter`对象返回，我们可以看到在`MonoFilterFuseable`的构造函数中也需要两个值
- ```java
  MonoFilterFuseable(Mono<? extends T> source, Predicate<? super T> predicate) {
  	super(source);
  	this.predicate = Objects.requireNonNull(predicate, "predicate");
  }
  ```
- 这里也和上面类似，不再细说。终于到了我们最为激动人心的`subscribe()`函数了
-
- ## subscribe阶段
- 在`subscribe`方法调用之前，我们分别包装了`MonoJust`->`MonoMapFuseable`->`MonoFilterFuseable`对象
- ```java
  @Override
  @SuppressWarnings("unchecked")
  public final void subscribe(Subscriber<? super T> actual) {
  	CorePublisher publisher = Operators.onLastAssembly(this);
  	CoreSubscriber subscriber = Operators.toCoreSubscriber(actual);
  	try {
  		if (publisher instanceof OptimizableOperator) {
  			OptimizableOperator operator = (OptimizableOperator) publisher;
  			while (true) {
  				subscriber = operator.subscribeOrReturn(subscriber); ➊
  				if (subscriber == null) {
  					// null means "I will subscribe myself", returning...
  					return;
  				}
  				OptimizableOperator newSource = operator.nextOptimizableSource(); ➋
  				if (newSource == null) {
  					publisher = operator.source(); ➌
  					break;
  				}
  				operator = newSource; ➍
  			}
  		}
  		publisher.subscribe(subscriber);
  	}
  	catch (Throwable e) {...}
  }
  ```
- `Operators.onLastAssembly(this)`返回的实际就是我们最后包装出来的`MonoFilterFuseable`，而subscriber则是
-