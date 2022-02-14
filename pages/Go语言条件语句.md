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
	-
-
- ## switch语句
-
- ## select语句
-