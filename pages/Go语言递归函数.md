- 递归,就是在运行的过程中调用自己
- 语法格式如下
- ```go
  func recursion() {
    recursion() //函数调用自身
  }
  
  func main() {
    recursion()
  }
  ```
- Go语言支持递归,但我们在使用递归时,开发者需要设置退出条件,否则递归将陷入无限循环中
- 递归函数对于解决数学上的问题是非常有用的,就像计算阶乘,生成斐波那契数列等
-
- ## 阶乘
	- 以下实例通过Go语言中的递归函数实现阶乘
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func Factorial(x int) (result int) {
	  	if x == 0 {
	  		return 1
	  	}
	  	return x * Factorial(x-1)
	  }
	  
	  func main() {
	  	var i int = 15
	  	fmt.Printf("%d 的阶乘是 %d\n", i, Factorial(i))
	  }
	  ```
-
- ## 斐波那契数列
	- 以下实例通过Go语言的递归函数实现斐波那契数列
	- ```go
	  ```