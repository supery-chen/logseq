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
- 可以看到，这里只是将array包裹成了一个FluxArray对象
-
-
-
-
-
-
-
-