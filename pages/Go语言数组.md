- 数组是具有唯一类型的一组已编号且长度固定的数据项序列，这种类型可以是任意的原始类型，例如整型、字符串或者自定义类型
- 相对于去声明number0，number1，...，number99的变量，使用数组形式numbers[0]，numbers[1]，...，numbers[99]更加方便且易于扩展
- 数组元素可以通过索引(位置)来读取(或者修改)，索引从0开始，第一个元素索引为0，第二个索引为1，以此类推
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1645585049298_0.png)
- ## 声明数组
	- Go语言数组声明需要指定元素类型及元素个数，语法格式如下
	- ```go
	  var variable_name [SIZE] variable_type
	  ```
	- 以上为一维数组的定义方式。数组长度必须是整数且大于0。例如以下定义了数组balance长度为10，类型为float32
	- ```go
	  var balance [10] float32
	  ```
-
- ## 初始化数组
	- 以下演示了数组初始化
	- ```go
	  var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
	  ```
	- 初始化数组中{}中的元素个数不能大于[]中的数字
	- 如果忽略[]中的数字不设置数组大小，Go语言会根据元素的个数来设置数组的大小
	- ```go
	  var balance = []float32{1000.0, 2.0, 3.4, 7.0, 50.0}
	  ```
	- 该实例与上面的实例时一样的，虽然没有设置数组的大小
	- ```go
	  balance[4] = 50
	  ```
	- 以上实例读取了第五个元素。数组元素可以通过索引(位置)来读取(或者修改)，索引从0开始，第一个元素索引为0，第二个索引为1，以此类推
	- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1645585423361_0.png)
-
- ## 访问数组元素
	- 数组元素可以通过索引(位置)来读取。格式为数组名后加中括号，中括号中为索引的值。
	- ```go
	  float32 salary = balance[9]
	  ```
	- 以上实例读取了数组balance第10个元素的值
	- 以下演示了数组完整操作(声明、赋值、访问)的实例
	- ```go
	  ```
-