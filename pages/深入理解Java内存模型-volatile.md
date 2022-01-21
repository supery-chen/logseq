- ## volatile的特性
- 当我们声明共享变量为volatile后，对这个变量的读写将会很特别
- 理解volatile特性的一个好方法是：把对volatile变量的单个读写看成是使用同一个监视器锁对单个读写操作做了同步
- ```java
  public class VolatileFeaturesExample {
      volatile long v1 = 0L; //使用volatile声明一个64位long类型的变量
      public void set(long l) {
          v1 = l; //单个volatile变量的写
      }
      public void increment() {
          v1++; //复合(多个)volatile变量的读写
      }
      public long get() {
          return v1; //单个volatile变量的读
      }
  }
  ```
- 假设多个线程分别调用上面程序的三个方法，这个程序在语义上和下面程序等价
- ```java
  public class VolatileFeaturesExample {
      long v1 = 0L; //声明一个64位long类型的普通变量
      public synchronized void set(long l) {
          v1 = l; //对单个普通的变量的写使用一个同步监视器同步
      }
  
      public void increment() {//普通方法调用
          long temp = get();   //调用同步的读方法
          temp += 1;           //普通写
          set(temp);           //调用同步的写方法
      }
  
      public synchronized long get() {
          return v1; //对单个普通变量的读使用一个同步监视器同步
      }
  }
  ```
- 如上面示例程序所示，对一个volatile变量的单个读写操作，与对一个普通变量读写操作使用同一个监视器锁来同步，效果是一样的
- 监视器锁的happens-before规则保证释放监视器和获取监视器的两个线程之间的内存可见性，这意味着对一个volatile变量的读，总能看到(任意线程)对这个volatile变量最后的写入
-