- 条件语句需要开发者通过指定一个或多个条件，并通过测试条件是否位true来决定是否执行指定语句，并在条件位false的情况再执行另外的语句
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644845681167_0.png)
- Go语言提供了以下几种条件判断语句
- ## if语句
	- ### 语法
		- ```go
		  if 布尔表达式 {
		    /* 在布尔表达式为true时执行 */
		  }
		  ```
	- ### 实例
		- ```go
		  package main
		  
		  func main() {
		  	var a int = 20
		  	if a > 10 {
		  		println("a is greater than 10")
		  	}
		  	println("a is", a)
		  }
		  ```
-
- ## if...else...语句
	- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644845953936_0.png)
	- ### 语法
		- ```go
		  if 布尔表达式 {
		     /* 在布尔表达式为 true 时执行 */
		  } else {
		    /* 在布尔表达式为 false 时执行 */
		  }
		  ```
	- ### 实例
		- ```go
		  package main
		  
		  func main() {
		  	var a int = 20
		  	if a > 20 {
		  		println("a is greater than 20")
		  	} else {
		  		println("a is not greater than 20")
		  	}
		  	println("a is", a)
		  }
		  ```
-
- ## if嵌套语句
	- [if 嵌套语句](https://www.w3cschool.cn/go/go-nested-if-statements.html)
-
- ## switch语句
	- switch 语句执行的过程从上至下，直到找到匹配项，匹配项后面也不需要再加break
	- ### 语法
		- ```go
		  switch var1 {
		      case val1:
		          ...
		      case val2:
		          ...
		      default:
		          ...
		  }
		  ```
		- 变量 var1 可以是任何类型，而 val1 和 val2 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式
		- 您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：case val1, val2, val3
		- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1644846129377_0.png)
	- ### 实例
		- ```go
		  package main
		  
		  func main() {
		  	var grade = "B"
		  	var marks = 90
		  
		  	switch marks {
		  	case 90:
		  		grade = "A"
		  	case 80:
		  		grade = "B"
		  	case 50, 60, 70:
		  		grade = "C"
		  	default:
		  		grade = "D"
		  	}
		  
		  	switch {
		  	case grade == "A":
		  		println("Excellent")
		  	case grade == "B", grade == "C":
		  		println("Well done")
		  	case grade == "D":
		  		println("You passed")
		  	case grade == "F":
		  		println("Better try again")
		  	default:
		  		println("Invalid grade")
		  	}
		  
		  	println("Your grade is", grade)
		  }
		  ```
- ## Type Switch
	- switch语句还可以被用于type-switch来判断某个interface变量中实际存储的变量类型
	- ### 语法
		- ```go
		  switch x.(type){
		      case type:
		         statement(s)     
		      case type:
		         statement(s)
		      /* 你可以定义任意个数的case */
		      default: /* 可选 */
		         statement(s)
		  }
		  ```
	- ### 实例
		- ```go
		  package main
		  
		  import "fmt"
		  
		  func main() {
		  	var x interface{}
		  	switch i := x.(type) {
		  	case nil:
		  		fmt.Printf(" x 的类型 :%T", i)
		  	case int:
		  		fmt.Printf("x 是 int 型")
		  	case float64:
		  		fmt.Printf("x 是 float64 型")
		  	case func(int) float64:
		  		fmt.Printf("x 是 func(int) 型")
		  	case bool, string:
		  		fmt.Printf("x 是 bool 或 string 型")
		  	default:
		  		fmt.Printf("未知型")
		  	}
		  }
		  ```
-
- ## select语句
	- select是Go中的一个控制结构，类似于用于通信的switch语句。每个case必须是一个通信操作，要么是发送，要么是接收
	- select随机执行一个可允许的case。如果没有case可运行，一个默认的子句应该总是可运行的
	- > 这里的输入，可以简单的理解为IO，例如如下代码
	- ```go
	  select {
	    case <-ch1:
	    	//如果从ch1信道成功接收数据，则执行该分支代码
	    case ch2 <- 1:
	    	//如果成功向ch2信道发送数据，则执行该分支代码
	    default:
	    	//如果上面都没成功，则进入default分支处理流程
	  }
	  ```
	- 更多关于信道(channel)的内容，可以前往[channel详解](https://www.w3cschool.cn/go/channel.html)进行了解
	- ### 语法
		- Go编程语言中select语句的语法如下
		- ```go
		  select {
		    case communication clause:
		    	statement(s)
		    case communication clause:
		    	statement(s)
		    /* 你可以定义任意数量的case */
		    default:
		    	statement(s)
		  }
		  ```
		- **以下描述了select语句的语法**
			- 每个case都必须是一个通信
			- 所有channel表达式都会被求值
			- 所有被发送的表达式都会被求值
			- 如果任意某个通信可以进行，它就执行，其它被忽略
			- 如果有多个case都可以运行，select会随机公平地选出一个执行，其它不会执行
			- 否则：
				- 1. 如果有default子句，则执行该语句
				  2. 如果没有default子句，select将阻塞，直到某个通信可以运行；Go不会重新对channel或值进行求值
		- **select知识点小结如下**
			- 1. select语句只能用于信道的读写操作
			  2. select中的case条件(非阻塞)
-