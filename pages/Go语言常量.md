- 常量是一个简单值的标识符，在程序运行时，不会被修改的量
- 常量中的数据类型只可以是布尔型、数字型(整数型、浮点型和复数)和字符串型
- 常量的定义格式
- ```go
  const identifier [type] = value
  ```
- 你可以省略类型说明符`[type]`，因为编译器可以根据变量的值来推断其类型
- 1. 显式类型定义：`const b string = "abc"`
  2. 隐式类型定义：`const b = "abc"`
- 多个相同类型的声明可以简写为
- ```go
  const c_name1, c_name2 = value1, value2
  ```
- 以下实例演示了常量的应用
- ```go
  package main
  
  import "fmt"
  
  func main(){
    const LENGTH int = 10
    const WIDTH = 5
    var area int
    const a, b, c = 1, false, "str"
    
    area = LENGTH * WIDTH
    fmt.Printf("面积为: %d", area)
    println()
    println(a, b, c)
  }
  ```
-
- 常量还可以用作枚举
- ```go
  const (
    Unknown = 0
    Female = 1
    Male = 2
  )
  ```
- 常量可以用len()、cap()、unsafe.Sizeof()常量计算表达式的值。常量表达式中，函数必须是内置函数，否则编译不通过
- ```go
  package main
  
  import "unsafe"
  const (
    a = "abc"
    b = len(a)
    c = unsafe.Sizeof(a)
  )
  
  func main(){
    println(a, b, c)
  }
  ```
-
- ## iota
	- 特殊常量，可以认为是一个可以被编译器修改的常量
	- 在每一个const关键字出现时，