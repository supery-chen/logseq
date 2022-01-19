- 以Mono为例开始我们的探险之旅
- ```java
  Mono.just("tom")
          .map(s -> s.concat("@qq.com"))
          .filter(s -> s.length() > 5)
          .subscribe(System.out::println);
  ```
- 我们代码中
-