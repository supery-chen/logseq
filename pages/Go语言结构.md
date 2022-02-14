- Go语言的基础组成有以下几个部分
	- 包声明
	- 引入包
	- 函数
	- 变量
	- 语句&表达式
	- 注释
- 接下来让我们来看下简单的代码，该代码输出了`Hello World!`
- ```go
  package main
  
  import "fmt"
  
  func main(){
    /* 这是我的第一个 简单的程序 */
    fmt.Println("Hello, World!")
  }
  ```
- 1. 第一行代码package main定义了包名。你必须在源文件中非注释的第一行指明这个文件属于哪个包，如：package main。package main表示一个可独立执行的程序，每个Go应用程序都包含一个名为main的包
  2. 下一行import "fmt"告诉Go编译器这个程序需要使用fmt包(的函数,)