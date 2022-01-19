public:: false

- # 响应式编程
- 本质上是一个`观察者模式`
- ![image.png](../assets/image_1642490318088_0.png)
- # 官方示例
- ```java
  userService.getFavorites(userId) ➊
             .flatMap(favoriteService::getDetails)  ➋
             .switchIfEmpty(suggestionService.getSuggestions())  ➌
             .take(5)  ➍
             .publishOn(UiUtils.uiThreadScheduler())  ➎
             .subscribe(uiList::show, UiUtils::errorPopup);  ➏
  ```
- ➊ 根据用户ID查询喜欢的信息(打开一个Publisher)
- ➋ 使用flatMap操作获取喜欢信息详情
- ➌ 使用switchIfEmpty，在喜欢信息为空的情况下填充推荐信息
- ➍ 取前5个
- ➎ 发布到UI线程
- ➏ 最终的消费行为
-
- 前4步的行为看起来类似Java8中的Stream编程，但这里的实现与Stream是不同的，后续会展开分析
- 后两步在我们之前的编码中没有遇到过类似的，这里的行为，我们可以在后续的[Reference#schedulers](http://projectreactor.io/docs/core/release/reference/#schedulers)中得知，`publishOn`将影响后续的行为操作所在的线程，对应的还有`subscribeOn`，这个函数仅影响`事件源`所在的线程
-
- # SPI模型定义
- ## Publisher(发布者、被观察者)
- ```java
  package org.reactivestreams;
  public interface Publisher<T> {
      public void subscribe(Subscriber<? super T> s);
  }
  ```
- 从定义可以看出来，其接收一个`Subscriber`
-
- ## Subscriber(观察者)
- ```java
  public interface Subscriber<T> {
      public void onSubscribe(Subscription s); ➊
      public void onNext(T t); ➋
      public void onError(Throwable t); 
      public void onComplete(); ➍
  }
  ```
- ➊ 订阅的时候被触发
- ➋ 每接收一个元素时被触发一次
- ➌ 错误时被触发
- ➍ 接收完最后一个元素后被触发
- 根据源码中的注释可以看出，`Publisher`是主要行为对象
-
- ## Subscription(桥接者)
- ```java
  package org.reactivestreams;
  public interface Subscription {
      public void request(long n); ➊
      public void cancel(); ➋
  }
  ```
- ➊ 获取N个元素往下传递
- ➋ 取消执行
- 笔者认为这个元素的作用一是为了解耦，二是在`Reference`中有提到`Backpressure`也就是下游可以保护自己不受上游大流量冲击，这个在`Stream`中式无法做到的，想要做到这点，就需要控制流速，那秘密看起来也就是在`request(long n)`中
- [[draws/2022-01-18-16-21-11.excalidraw]]
-
- # 他们是如何工作的
- 我们使用一个最简单的例子进行探索
- ```java
  Flux.just("tom", "jack", "allen")
      .map(s-> s.concat("@qq.com"))
      .subscribe(System.out::println);
  ```
- ## 声明阶段
- `Flux.just("tom", "jack", "allen")`
- ```java
  	public static <T> Flux<T> fromArray(T[] array) {
        	//检查略
  		return onAssembly(new FluxArray<>(array));
  	}
  ```
- 可以看到，这里只是将`array`包裹成了一个`FluxArray`对象
- ```java
  final class FluxArray<T> extends Flux<T> implements Fuseable, SourceProducer<T> {
  	final T[] array;
  	@SafeVarargs
  	public FluxArray(T... array) {
  		this.array = Objects.requireNonNull(array, "array");
  	}
  }
  ```
- 在具体的实例中，`FluxArray`也仅仅是将`array`储存起来，然后就返回回来了，那我们紧接着去看看`.map(s->s.concat("@qq.com"))`又做了什么
- ```java
  public final <V> Flux<V> map(Function<? super T, ? extends V> mapper) {
  	if (this instanceof Fuseable) {
  		return onAssembly(new FluxMapFuseable<>(this, mapper));➊
  	}
  	return onAssembly(new FluxMap<>(this, mapper));➋
  }
  ```
- 在➊➋处，我们发现都是简单的将`Function`包装成了一个新的`FluxMapFuseable/FluxMap`对象返回，我们看到`FluxMap`的构造函数需要两个入参
- ```java
  FluxMap(Flux<? extends T> source,
  		Function<? super T, ? extends R> mapper) {
  	super(source);
  	this.mapper = Objects.requireNonNull(mapper, "mapper");
  }
  ```
- 这和设计模式中的代理模式极为接近，我们每次将一个操作和源`Publisher`组合变成一个`新Publisher`，到这里我们已经明白了，在`subscribe()`之前，我们什么都没做，只是在不断包裹`Publisher`将作为原始的`Publisher`一层又一层的返回回来。终于到了我们最为激动人心的`subscribe()`函数了
- ## subscribe阶段
- 通过一顿`Jump Definition`大法，我们找到
- ```java
  //org.reactivestreams.Publisher#subscribe
  public void subscribe(Subscriber<? super T> s);
  ```
- 通过代码调试，我们看到代码走入了`reactor.core.publisher.Flux#subscribe(org.reactivestreams.Subscriber<? super T>)`
- ```java
  public final void subscribe(Subscriber<? super T> actual) {
  	CorePublisher publisher = Operators.onLastAssembly(this);
  	CoreSubscriber subscriber = Operators.toCoreSubscriber(actual);
  	//异常捕获忽略
  	if (publisher instanceof OptimizableOperator) {
  		OptimizableOperator operator = (OptimizableOperator) publisher;➊
  		while (true) {
  			subscriber = operator.subscribeOrReturn(subscriber);
  			if (subscriber == null) {
  				// null means "I will subscribe myself", returning...
  				return;
  			}
  			OptimizableOperator newSource = operator.nextOptimizableSource();
  			if (newSource == null) {
  				publisher = operator.source();
  				break;
  			}
  			operator = newSource;
  		}
  	}
  	publisher.subscribe(subscriber);➋
  	//异常捕获忽略
  }
  ```
- ➊ 这里我们看到，`publisher`被强转为了`OptimizableOperator`类型，对应的实现为`FluxMapFuseable`，具体实现如下
- ```java
  @Override
  @SuppressWarnings("unchecked")
  public CoreSubscriber<? super T> subscribeOrReturn(CoreSubscriber<? super R> actual) {
  	if (actual instanceof ConditionalSubscriber) {
  		ConditionalSubscriber<? super R> cs = (ConditionalSubscriber<? super R>) actual;
  		return new MapFuseableConditionalSubscriber<>(cs, mapper);
  	}
  	return new MapFuseableSubscriber<>(actual, mapper);
  }
  ```
- 我们自己的`Subscriber`在这里被包裹成一个`MapFuseableSubscriber`对象，虽然这个方法叫做`subscribeOrReturn`，但从代码中来看，此方法仅做了包装并`return`，具体订阅是在➋ 处，这里的`publisher`就是我们上面看的`FluxArray`
- 那我们继续看看`FluxArray`是如何处理`subscribe()`函数的
- ```java
  @SuppressWarnings("unchecked")
  public static <T> void subscribe(CoreSubscriber<? super T> s, T[] array) {
  	if (array.length == 0) {
  		Operators.complete(s);
  		return;
  	}
  	if (s instanceof ConditionalSubscriber) {
  		s.onSubscribe(new ArrayConditionalSubscription<>((ConditionalSubscriber<? super T>) s, array));➊
  	}
  	else {
  		s.onSubscribe(new ArraySubscription<>(s, array));➋
  	}
  }
  ```
- 熟悉的味道，➊➋将Subscriber和Publisher包裹成一个Subscription对象，并将其作为onSubscribe函数调用的对象，这样的话，我们就可以完全理解，为什么`Nothing Happens Until You subscribe()`，因为实际上我们在调用`subscribe()`之前的所有方法都只是在申明对象。只有`在subscribe()`之后才能触发`onSubscribe`调用
- 那问题又来了，`onSubscribe`又做了什么？我们知道现在的这个`s`也就是`MapFuseableSubscriber`，我们去看看它的`onSubscribe`实现
- ## onSubscribe阶段
- ```java
  @SuppressWarnings("unchecked")
  @Override
  public void onSubscribe(Subscription s) {
  	if (Operators.validate(this.s, s)) {
  		this.s = (QueueSubscription<T>) s;
  		actual.onSubscribe(this);
  	}
  }
  ```
- 很简单，我们又获得了我们所定义的`Subscriber`，并调用它的`onSubscribe`函数，因为我们采用Lambda的方式生成的`Subscriber`所以也就是`LambdaSubscriber`对象，具体实现如下
- ## request阶段
- ```java
  	@Override
  	public final void onSubscribe(Subscription s) {
  		if (Operators.validate(subscription, s)) {
  			this.subscription = s;
  			if (subscriptionConsumer != null) {
  				try {
  					subscriptionConsumer.accept(s);➊
  				}
  				catch (Throwable t) {
  					Exceptions.throwIfFatal(t);
  					s.cancel();
  					onError(t);
  				}
  			}
  			else {
  				s.request(Long.MAX_VALUE);➋
  			}
  		}
  	}
  ```
- 无论是➊还是➋最为核心的都是调用了`Subscription.request`函数，这里的`s`也就是我们上一步的`MapFuseableSubscriber`
- ```java
  @Override
  public void request(long n) {
  	s.request(n);
  }
  ```
- 而这里的`s`，又是我们最开始的`FluxArray`，继续往下看
- ```java
  @Override
  public void request(long n) {
  	if (Operators.validate(n)) {
  		if (Operators.addCap(REQUESTED, this, n) == 0) {
  			if (n == Long.MAX_VALUE) {
  				fastPath();➊
  			}
  			else {
  				slowPath(n);➋
  			}
  		}
  	}
  }
  ```
- ➊处进行了一个简单的优化，我们直接去阅读`fastPath()`函数
- ```java
  void fastPath() {
  	final T[] a = array;
  	final int len = a.length;
  	final Subscriber<? super T> s = actual;
  
  	for (int i = index; i != len; i++) {➊
  		if (cancelled) {
  			return;
  		}
  		T t = a[i];
  		if (t == null) {/**忽略**/}
  		s.onNext(t);
  	}
  	if (cancelled) {
  		return;
  	}
  	s.onComplete();
  }
  ```
-
-