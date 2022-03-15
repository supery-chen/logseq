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
	  package main
	  
	  import "fmt"
	  
	  type Phone interface {
	  	call()
	  }
	  
	  type NokiaPhone struct {
	  }
	  
	  func (nokiaPhone NokiaPhone) call() {
	  	fmt.Println("I am Nokia, I can call you!")
	  }
	  
	  type IPhone struct {
	  }
	  
	  func (iPhone IPhone) call() {
	  	fmt.Println("I am iPhone, I can call you!")
	  }
	  
	  func main() {
	  	var phone Phone
	  
	  	phone = new(NokiaPhone)
	  	phone.call()
	  
	  	phone = new(IPhone)
	  	phone.call()
	  }
	  ```
	- 在上面的例子中,我们定义了一个接口Phone,接口里面定义了一个方法call().然后我们在main函数里定义了一个Phone类型变量,并分别为之赋值为NokiaPhone和IPhone