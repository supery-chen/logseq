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
		  
		  /**
		   * 数组分配的最大size
		   * 有些Java虚拟机会在数组中存储header words，一般里面有数组长度信息
		   * 如果尝试分配size超过此大小的数组，可能会导致OOM异常：Requested array size exceeds VM limit
		   */
		  private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
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
	- ### 其它方法
		- #### add(E e)
		  id:: 61ef90f4-0d6d-405a-8224-c656b2b66191
			- 添加指定元素到列表末尾
			- ```java
			  public boolean add(E e) {
			    	//检测是否需要扩容
			      ensureCapacityInternal(size + 1);  // Increments modCount!!
			    	//把元素插入到最后一位
			      elementData[size++] = e;
			      return true;
			  }
			  
			  //检测是否需要扩容
			  private void ensureCapacityInternal(int minCapacity) {
			      ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
			  }
			  
			  //计算需要的容量
			  private static int calculateCapacity(Object[] elementData, int minCapacity) {
			    	//如果elementData是通过无参构造函数创建时初始化的DEFAULTCAPACITY_EMPTY_ELEMENTDATA
			    	//则返回minCapacity和默认容量两个之中最大的值
			      if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
			          return Math.max(DEFAULT_CAPACITY, minCapacity);
			      }
			    	//否则返回minCapacity
			      return minCapacity;
			  }
			  
			  //计算精确的容量
			  private void ensureExplicitCapacity(int minCapacity) {
			    	//修改次数加一
			      modCount++;
			  
			      // overflow-conscious code
			    	// 只有在minCapacity大于elementData长度的时候，才需要进行扩容(因为此时elementData无法存放这么多的数据)
			      if (minCapacity - elementData.length > 0)
			          grow(minCapacity);
			  }
			  
			  //具体的扩容逻辑
			  private void grow(int minCapacity) {
			      // overflow-conscious code
			    	//下面的代码考虑到了溢出的情况
			      //旧的容量大小为elementData数组的长度
			      int oldCapacity = elementData.length;
			      //新的容量大小，相当于是旧容量大小的1.5倍(>>1 右移一位，相当于除以2，但效率更高)
			      //这里可能会发生溢出，但oldCapacity + (oldCapacity >> 1)超过Integer.MAX_VALUE后，newCapacity会从Integer.MIN_VALUE往上增加
			      int newCapacity = oldCapacity + (oldCapacity >> 1);
			      if (newCapacity - minCapacity < 0)
			          newCapacity = minCapacity;
			      if (newCapacity - MAX_ARRAY_SIZE > 0)
			          newCapacity = hugeCapacity(minCapacity);
			      // minCapacity is usually close to size, so this is a win:
			      elementData = Arrays.copyOf(elementData, newCapacity);
			  }
			  
			  //超大容量情况的处理
			  private static int hugeCapacity(int minCapacity) {
			    	//如果minCapacity都溢出了，无法再分配，抛出OOM异常
			      if (minCapacity < 0) // overflow
			          throw new OutOfMemoryError();
			    	//如果minCapacity大于MAX_ARRAY_SIZE，则最大分配Integer.MAX_VALUE，否则分配MAX_ARRAY_SIZE
			      return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
			  }
			  ```
			- 关于溢出处理的部分，具体见[[overflow-conscious code]]
			- 从hugeCapacity可以看出，ArrayList最大允许的长度是Integer.MAX_VALUE，而推荐的长度是MAX_ARRAY_SIZE(Integer.MAX_VALUE-8)，因为有些虚拟机会在数组中保存header words #待深入
			-
			-
		- #### add(int index, E element)
		- #### addAll(Collection c)
		- #### get(int index)
		- #### remove(int index)
		- #### remove(Object o)
		- #### retainAll(Collection c)
		- #### removeAll(Collection c)
		-
		-
-
-