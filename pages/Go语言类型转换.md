- 类型转换用于将一种数据类型的变量转换为另外一种类型的变量.Go语言类型转换基本格式如下
- ```go
  type_name(expression)
  ```
- type_name为类型,expression为表达式
-
- ## 实例
	- 以下实例中将整型转化为浮点型,并计算结果,将结果赋值给浮点型变量
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main(){
	    var sum int = 17
	    var count int = 5
	    var mean float32
	    
	    mean = float32(sum)/float32(count)
	    fmt.Printf("mean 的值为: %f\n", mean)
	  }
	  ```
-
- ## go不支持隐式类型转换
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main(){
	    var a int64 = 3
	    var b int32
	    b = a
	    fmt.Printf("b 为: %d", b)
	  }
	  ```
	- 以上代码执行会报错
	- ```shell
	  ```