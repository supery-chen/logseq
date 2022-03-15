- Go语言提供了另外一种数据类型,即**接口**,它把所有的具有共性的方法定义在一起,任何其它类型只要实现了这些方法就是实现了接口
-
- ## 实例
	- ```go
	  //定义接口
	  type interface_name interface {
	  	method_name [return_type]
	  }
	  //定义结构体
	  type struct_name struct {
	    
	  }
	  
	  //实现接口方法
	  func (struct_name_variable struct_name) method_name() [return_type] {
	  	//方法具体实现  
	  }
	  ```
-
- ## 实例
	- ```go
	  ```