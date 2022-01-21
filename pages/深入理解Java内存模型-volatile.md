- ## volatile的特性
- 当我们声明共享变量为volatile后，对这个变量的读写将会很特别
- 理解volatile特性的一个好方法是：把对volatile变量的单个读写看成是使用同一个监视器锁对单个读写操作做了同步
- ```java
  public class VolatileFeaturesExample {
      //使用volatile声明一个64位long类型的变量
      volatile long v1 = 0L;
  
      public void set(long l) {
          //单个volatile变量的写
          v1 = l;
      }
  
      public void increment() {
          //复合(多个)volatile变量的读写
          v1++;
      }
  
      public long get() {
          //单个volatile变量的读
          return v1;
      }
  }
  ```
- 假设多个线程分别调用上面程序的三个方法，这个程序在语义上和下面程序等价
- ```java
  public class VolatileFeaturesExample {
      //声明一个64位long类型的普通变量
      long v1 = 0L;
  
      public synchronized void set(long l) {
          //对单个普通的变量的写使用一个同步监视器同步
          v1 = l;
      }
  
      public void increment() {//普通方法调用
          long temp = get();   //调用同步的读方法
          temp += 1;           //普通写
          set(temp);           //调用同步的写方法
      }
  
      public synchronized long get() {
          //对单个普通变量的读使用一个同步监视器同步
          return v1;
      }
  }
  ```
-