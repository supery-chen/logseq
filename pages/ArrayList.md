- ## 简介
- ArrayList是一种以数组实现的List，与数组相比，它具有动态扩展的能力，因此也可以称为动态数组
-
- ## 继承体系
- ![image.png](../assets/image_1643073454713_0.png)
- ArrayList实现了List、Serializable、Cloneable、RandomAccess等接口
	- List：提供了基础的添加、删除、遍历等操作
	- RandomAccess：提供了随机访问的能力
	- Cloneable：可以被克隆
	- Serializable：可以被序列化
- ## 源码解析
- ### 属性
- ```java
      private static final int DEFAULT_CAPACITY = 10; //默认容量
      private static final Object[] EMPTY_ELEMENTDATA = {}; //空数组，如果传入的容量为0时使用
  
      /**
       * 空数组，传入的容量大于0时使用，当添加第一个元素的时候会重新初始化为默认容量大小
       * Shared empty array instance used for default sized empty instances. We
       * distinguish this from EMPTY_ELEMENTDATA to know how much to inflate when
       * first element is added.
       */
      private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
  
      /**
       * The array buffer into which the elements of the ArrayList are stored.
       * The capacity of the ArrayList is the length of this array buffer. Any
       * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
       * will be expanded to DEFAULT_CAPACITY when the first element is added.
       */
      transient Object[] elementData; // non-private to simplify nested class access
  
      /**
       * The size of the ArrayList (the number of elements it contains).
       *
       * @serial
       */
      private int size;
  ```