- 以Mono为例开始我们的探险之旅
- ```java
  Mono.just("tom")
          .map(s -> s.concat("@qq.com"))
          .filter(s -> s.length() > 5)
          .subscribe(System.out::println);
  ```
- 这段代码的意思是，将`String`对象增加一个邮箱后缀，并过滤出长度大于`5`的字符串再打印出来，这是一个非常简单的逻辑
-
-