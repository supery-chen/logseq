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
       * @param minCapacity 希望的最小容量
       */
      private void grow(int minCapacity) {
          // overflow-conscious code - 考虑了溢出的情况
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
- 假设oldCapacity接近Integer.MAX_VALUE，那么`int newCapacity = oldCapacity + (oldCapacity >> 1)`，此时newCapacity必然发生溢出，从而变成负数
- 在newCapacity发生溢出时，如果使用`newCapacity<minCapacity`来进行判断，结果很明显为true，此时如果走if表达式中的内容，将newCapacity设置为minCapacity，这种情况从逻辑上来说很明显不正确
- 因此这里使用的是`if (newCapacity - minCapacity < 0)`和`if (newCapacity - MAX_ARRAY_SIZE > 0)`来判断。当newCapacity为负数时，`newCapacity - minCapacity`必然也会发生溢出，也就意味着`newCapacity - minCapacity`的结果是大于0的，这种情况下就会跳过执行`newCapacity = minCapacity`逻辑
- 此时第二个条件`if (newCapacity - MAX_ARRAY_SIZE > 0)`的结果肯定也是大于0的，所以会执行`newCapacity = hugeCapacity(minCapacity)`，从而消除了newCapacity发生溢出的影响
-
- > 这里说明下为什么`newCapacity - minCapacity`和`newCapacity - MAX_ARRAY_SIZE`的结果都是大于0
- 通过源码网上追溯，可以发现，`minCapacity = oldCapacity + 1`，所以，如果newCapacity发生溢出，因为oldCapacity的最大值为Integer.MAX_VALUE，所以newCapacity的最大值为`-Integer.MAX_VALUE >> 1`，所以`newCapacity - minCapacity`会发生溢出，从而导致结果为正数，同理`newCapacity - MAX_ARRAY_SIZE`也会发生溢出导致结果为正数
-
- ## 总结
- 从上面的解释中可以看出，Java源码中这么写同时兼顾了溢出与非溢出的情况，且无论溢出不溢出，都可以始终保持扩容后的newCapacity结果为正数。这也就是代码中的注释`overflow-conscious code`的意义