public:: true

- 作用域为已声明标识符所表示的常量、类型、变量、函数或包在源代码中的作用范围
- Go语言中变量可以在三个地方声明
	- 函数内定义的变量称为局部变量
	- 函数外定义的变量称为全局变量
	- 函数定义中的变量称为形参
- ## 局部变量
	- 在函数体内声明的变量称之为局部变量，它们的作用域只在函数体内，参数和返回值变量也是局部变量
	- 以下实例中main()函数使用了局部变量a,b,c
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main(){
	    //声明局部变量
	    var a, b, c int
	    a = 10
	    b = 20
	    c = a + b
	    fmt.Printf ("结果： a = %d, b = %d and c = %d\n", a, b, c)
	  }
	  ```
-
- ## 全局变量
	- 在函数体外声明的变量称之为全局变量，全局变量可以在整个包甚至外部包(被导出后)使用
	- 全局变量可以在任何函数中使用，以下实例演示了如何使用全局变量
	- ```go
	  package main
	  
	  import "fmt"
	  
	  var g int
	  
	  func main() {
	  	var a, b int
	  	a = 10
	  	b = 20
	  	g = a + b
	  
	  	fmt.Printf("结果：a=%d, b=%d, g=%d\n", a, b, g)
	  }
	  ```
	- Go语言程序中全局变量与局部变量名称可以相同，但是函数内的局部变量会被优先考虑
	- ```go
	  package main
	  
	  import "fmt"
	  
	  var g int = 20
	  
	  func main() {
	  	var g int = 10
	  	fmt.Printf("g = %d\n", g)
	  }
	  ```
-
- ## 形式参数
	- 形式参数会作为函数的局部变量来使用
	- ```go
	  package main
	  
	  import "fmt"
	  
	  var a int = 20
	  
	  func main() {
	  	var a int = 10
	  	var b int = 20
	  	var c int = 0
	  	fmt.Printf("main()函数中 a = %d\n", a)
	  	fmt.Printf("main()函数中 b = %d\n", b)
	  	c = sum(a, b)
	  	fmt.Printf("main()函数中 c = %d\n", c)
	  }
	  
	  func sum(a, b int) int {
	  	fmt.Printf("sum() 函数中 a = %d\n", a)
	  	fmt.Printf("sum() 函数中 b = %d\n", b)
	  	return a + b
	  }
	  ```
-
- ## 初始化局部变量和全局变量
-