- Go语言允许向函数传递指针，只需要在函数定义的参数上设置指针类型即可
- 以下实例演示了如何向函数传递指针，并在函数调用后修改函数内的值
- ```go
  package main
  
  import "fmt"
  
  func main() {
  	var a int = 100
  	var b int = 200
  	fmt.Printf("交换前 a = %d\n", a)
  	fmt.Printf("交换前 b = %d\n", b)
  	swap(&a, &b)
  	fmt.Printf("交换后 a = %d\n", a)
  	fmt.Printf("交换后 b = %d\n", b)
  }
  
  func swap(x, y *int) {
  	var temp int
  	temp = *x
  	*x = *y
  	*y = temp
  }
  ```