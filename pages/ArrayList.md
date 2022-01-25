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
		       * 空数组，不传入容量时使用，当添加第一个元素的时候会重新初始化为默认容量大小
		       */
		      private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
		      /**
		       * 存储元素的数组，使用transient是为了不序列化这个字段
		       */
		      transient Object[] elementData;
		  
		      /**
		       * 数组真正存储元素的个数
		       */
		      private int size;
		  ```
	- ### 构造方法
		- #### ArrayList(int initialCapacity)
			- ```java
			      public ArrayList(int initialCapacity) {
			        	//如果初始容量大于0，初始化elementData数组，大小为初始容量
			          if (initialCapacity > 0) {
			              this.elementData = new Object[initialCapacity];
			          } else if (initialCapacity == 0) {
			          //如果初始容量等于0，则初始化elementData数组为空数组EMPTY_ELEMENTDATA
			              this.elementData = EMPTY_ELEMENTDATA;
			          } else {
			          //如果初始容量小于0，则抛出异常
			              throw new IllegalArgumentException("Illegal Capacity: "+
			                                                 initialCapacity);
			          }
			      }
			  ```
		- #### ArrayList()
			- ```java
			      public ArrayList() {
			        	//未指定初始容量，则使用空数组DEFAULTCAPACITY_EMPTY_ELEMENTDATA
			        	//此数组在第一次添加元素的时候会被重新初始化为默认容量大小
			          this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
			      }
			  ```
		- #### ArrayList(Collection c)
			- ```java
			      public ArrayList(Collection<? extends E> c) {
			          Object[] a = c.toArray();
			          if ((size = a.length) != 0) {
			            	//如果传入的集合大小不为0
			              //如果集合本身也是ArrayList，则直接赋值
			              if (c.getClass() == ArrayList.class) {
			                  elementData = a;
			              } else {
			                  //如果集合本身不是ArrayList，则拷贝成Object类型
			                  elementData = Arrays.copyOf(a, size, Object[].class);
			              }
			          } else {
			            	//如果传入的集合大小为0，则初始化为空数组EMPTY_ELEMENTDATA
			              elementData = EMPTY_ELEMENTDATA;
			          }
			      }
			  ```
	-
-
-