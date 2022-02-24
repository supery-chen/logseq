- Go语言中指针是很容易学习的，Go语言中使用指针可以更简单的执行一些任务
- 我们都知道，变量是一种使用方便的占位符，用于引用计算机内存地址
- Go语言的取地址符是&，放到一个变量前使用就会返回相应变量的内存地址
- 以下实例演示了变量在内存中地址
- ```go
  package main
  
  import "fmt"
  
  func main(){
    var a int = 10
    fmt.Printf("变量的地址: %x\n", &a)
  }
  ```
-
- ## 什么是指针
	- 一个指针变量可以指向任何一个值的内存地址
	- 类似于变量和常量，在使用指针前你需要声明指针。指针声明格式如下
	- ```go
	  var var_name *var-type
	  ```
	- var-type为指针类型，var_name为指针变量名，*号用于指定变量是作为一个指针。以下是有效的指针声明
	- ```go
	  var ip *int
	  var fp *float32
	  ```
	- 本例中这是一个指向int和float32的指针
-
- ## 如何使用指针
	- 指针使用流程
		- 定义指针变量
		- 为指针变量赋值
		- 访问指针变量中指向地址的值
	- 在指针类型前面加上*号来获取指针所指向的内容
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	  	var a int = 20
	  	var ip *int
	  
	  	ip = &a
	  	fmt.Printf("a 变量的地址是: %x\n", &a)
	  	fmt.Printf("ip 变量的地址是: %x\n", ip)
	  	fmt.Printf("*ip 变量的值是: %d\n", *ip)
	  }
	  ```
-
- ## Go空指针
	- 当一个指针被定义后没有分配到任何变量时，它的值为nil
	- nil指针也被称为空指针
	- nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值
	- 一个指针变量通常缩写为ptr
	- 查看以下实例
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main(){
	    var ptr *int
	    fmt.Printf("ptr 的值为 ：%x\n", ptr)
	  }
	  ```
	- 空指针判断
	- ```go
	  ```