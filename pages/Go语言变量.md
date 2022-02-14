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
	- 当使用等号=