- [Ref-Java中的overflow-conscious code](https://www.cnblogs.com/hermi0ne/p/14814344.html)
- ## 背景
- 在jdk源码中，会有很多考虑了溢出而编写的代码，这些代码前会有注释：`overflow-conscious code`，说明下面这段代码是考虑了溢出的情况的。最经典的代码就是 [[ArrayList]] 里的grow()方法
-
- ## 分析
- 这里说考虑了溢出的情况，是如何考虑溢出呢？考虑了哪个变量的溢出？在溢出情况下是怎么应对的？
-
- ## 解释
- 在计算机中，a-b<0和a<b并不完全等价。在没有发生溢出的情况下，两者是等价的，但如果发生溢出，情况将会变得不同。
- ```java
  int a = Integer.MAX_VALUE;
  int b = Integer.MIN_VALUE;
  if (a < b) {System.out.println("a < b");}
  if (a - b < 0) {System.out.println("a - b < 0");}
  ```
- 运行上面的代码可以发现，输出的是a-b<0。很显然，a<b明显是错误的，而a-b<0由于发生了溢出，因此结果是负的
- 说清楚了这些背景只是后，下面详细分析一下ArrayList#grow()的代码
- ```java
      /**
       * Increases the capacity to ensure that it can hold at least the
       * number of elements specified by the minimum capacity argument.
       *
       * @param minCapacity the desired minimum capacity
       */
      private void grow(int minCapacity) {
          // overflow-conscious code
          int oldCapacity = elementData.length;
          int newCapacity = oldCapacity + (oldCapacity >> 1);
          if (newCapacity - minCapacity < 0)
              newCapacity = minCapacity;
          if (newCapacity - MAX_ARRAY_SIZE > 0)
              newCapacity = hugeCapacity(minCapacity);
          // minCapacity is usually close to size, so this is a win:
          elementData = Arrays.copyOf(elementData, newCapacity);
      }
  ```
-