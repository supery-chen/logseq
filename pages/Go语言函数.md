- 函数是基本的代码块，用于执行一个任务
- Go语言最少有一个main()函数
- 你可以通过函数来划分不同功能，逻辑上每个函数执行的是指定的任务
- 函数声明告诉了编译器函数的名称，返回类型和参数
- Go语言标准库提供了多种可用的内置函数，例如，len()函数可以接受不同类型的参数并返回该类型的长度。如果我们传入的是字符串则返回字符串的长度，如果传入的是数组，则返回数组中包含的分量个数
- ## 函数定义
	- Go语言函数定义格式如下
	- ```go
	  func function_name( [parameter list] ) [return_types]{
	    函数体
	  }
	  ```
	- 函数定义解析
		- func：函数由func开始声明
		- function_name：函数名称，函数名和参数列表一起构成了函数签名
		- parameter list：参数列表，参数就像一个占位符，当函数被调用时，你可以将值传递给参数，这个值被称为实际参数。参数列表指定的是参数类型、顺序及参数个数。参数是可选的，也就是说函数也可以不包含参数
		- return_types：返回类型，函数返回一列值。return_types是该列值的数据类型。有些功能不需要返回值，这种情况下return_types不是必须的
		- 函数体：函数定义的代码集合
	- ### 实例
	- 以下实例为max()函数的代码，该函数传入两个整型参数num1和num2，并返回这两个参数的最大值
	- ```go
	  func max(num1, num2 int) int {
	    var result int
	    if (num1 > num2){
	      result = num1
	    } else {
	      result = num2
	    }
	    return result
	  }
	  ```
-
- ## 函数调用
	- 当创建函数时，你定义了函数需要做什么，通过调用该函数来执行指定任务
	- 调用函数，向函数传递参数，并返回值，例如
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main(){
	    var a int = 100
	    var b int = 200
	    var ret int
	    
	    ret = max(a, b)
	    fmt.Printf("最大值是: %d\n", ret)
	  }
	  
	  func max(num1, num2 int) int {
	    var result int
	    if (num1 > num2){
	      result = num1
	    } else {
	      result = num2
	    }
	    return result
	  }
	  ```
-
- ## 函数返回多个值
	- Go函数可以返回多个值，例如
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func swap(x, y string) (string, string) {
	     return y, x
	  }
	  
	  func main() {
	     a, b := swap("Mahesh", "Kumar")
	     fmt.Println(a, b)
	  }
	  ```
-
- ## 函数参数
	- 函数如果使用参数，该变量可称为函数的形参
	- 形参就像是定义在函数体