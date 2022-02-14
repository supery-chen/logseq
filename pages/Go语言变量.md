- Go 语言变量名由字母、数字、下划线组成，其中首个字母不能为数字
- 声明变量的一般形式是使用 var 关键字`var identifier type`
- ## 变量声明
	- 第一种，指定变量类型，声明后若不赋值，使用默认值
		- ```go
		  var v_name v_type
		  v_name = v_value
		  ```
	- 第二种，根据值自行判断变量类型
		- ```go
		  var v_name = v_value
		  ```
	- 第三种，省略var。注意:=左侧的变量不应该是已经声明过的，否则会导致编译错误
		- ```go
		  v_name := v_value
		  //例如
		  var a int = 10
		  var b = 10
		  c := 10
		  ```
	- 实例如下
	- ```go
	  package main
	  
	  var a = "a"
	  var b string = "b"
	  c := "c"
	  var d bool
	  
	  func main(){
	    println(a, b, c, d)
	  }
	  ```
-
- ## 多变量声明
	- ```go
	  //类型相同多个变量, 非全局变量
	  var vname1, vname2, vname3 type
	  vname1, vname2, vname3 = v1, v2, v3
	  
	  var vname1, vname2, vname3 = v1, v2, v3 //和python很像,不需要显示声明类型，自动推断
	  
	  vname1, vname2, vname3 := v1, v2, v3 //出现在:=左侧的变量不应该是已经被声明过的，否则会导致编译错误
	  
	  
	  //类型不同多个变量, 全局变量, 局部变量不能使用这种方式
	  var (
	      vname1 v_type1
	      vname2 v_type2
	  )
	  ```
	- 实例如下
	- ```go
	  package main
	  
	  var x, y int
	  var (  //这种只能出现在全局变量中，函数体内不支持
	      a int
	      b bool
	  )
	  
	  var c, d int = 1, 2
	  var e, f = 123, "hello"
	  
	  //这种不带声明格式的只能在函数体中出现
	  //g, h := 123, "hello"
	  
	  func main(){
	      g, h := 123, "hello"
	      println(x, y, a, b, c, d, e, f, g, h)
	  }
	  ```
-
- ## 值类型和引用类型
	- 所有像int、float、bool和string这些基本类型都属于值类型，使用这些类型的变量直接指向存在内存中的值
	- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644823579371_0.png)
	- 当使用等号=将一个变量的值赋值给另一个变量时，如`j = i`，实际上是在内存中将`i`的值进行了拷贝
	- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644823644880_0.png)
	- 你可以通过`&i`来获取变量`i`的内存地址，例如:`0xf840000040`(每次地址都可能不一样)。值类型的变量值存储在栈中
	- 内存地址会根据机器的不同而有所不同，甚至相同的程序在不同的机器上执行后也会有不同的内存地址。因为每台机器可能有不同的存储布局，并且位置分配也可能不同
	- 更复杂的数据通常会需要使用多个值，这些数据一般使用引用类型保存
	- 一个引用类型的变量`r1`存储的是`r1`的值所在的内存地址(数字)，或内存地址中第一个值所在的位置
	- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644823836457_0.png)
	- 这个内存地址称为指针，这个指针实际上也被存在另外的某一个值中
	- 同一个引用类型的指针指向的多个值可以是在连续的内存地址中(内存布局是连续的)，这也是计算效率最高的一种存储方式；也可以将这些值分散存放在内存中，每个值都指示了下一个值所在的内存地址
	- 当使用赋值语句`r2 = r1`时，只有引用(地址)被复制
	-
-