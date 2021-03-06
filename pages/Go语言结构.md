public:: true

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
  2. 下一行import "fmt"告诉Go编译器这个程序需要使用fmt包(的函数，或其它元素)，fmt包实现了格式化IO的函数
  3. 下一行func main()是程序开始执行的函数。main函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数(如果有init()函数则会先执行该函数)
  4. 下一行/\*...\*/是注释，在程序执行时被忽略
  5. 下一行fmt.Println(...)可以将字符串输出到控制台，并在最后自动增加换行字符\\n。使用fmt.Print("hello,world\\n")可以得到相同的结果。Print和Println这两个函数也支持使用变量，如：fmt.Println(arr)。如果没有特别指定，他们会以默认的打印格式将变量arr输出到控制台
  6. 当标识符(包括常量、变量、类型、函数名、结构字段等等)以一个大写字母开头，如Group1，那么使用这种形式的标识符的对象就可以被外部包的代码所使用(客户端程序需要先导入这个包)，这被称为导出(像面向对象语言中的public)；标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的(像面向对象语言中的private)
-