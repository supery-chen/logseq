- Go语言提供了一种机制,在不知道具体类型的情况下,可以用反射来更新变量值,查看变量类型
-
- ## Typeof
	- Typeof返回接口中保存的值的类型,Typeof(nil)会返回nil
	- ```go
	  package main
	  
	  import (
	  	"fmt"
	  	"reflect"
	  )
	  
	  func main() {
	  	var booknum float32 = 6
	  	var isbook bool = true
	  	bookauthor := "www.w3cschool.cn"
	  	bookdetail := make(map[string]string)
	  	bookdetail["Go语言教程"] = "www.w3cschool.cn"
	  	fmt.Println(reflect.TypeOf(booknum))
	  	fmt.Println(reflect.TypeOf(isbook))
	  	fmt.Println(reflect.TypeOf(bookauthor))
	  	fmt.Println(reflect.TypeOf(bookdetail))
	  }
	  ```
	- 以上代码执行结果如下
	- ```
	  float32
	  bool
	  string
	  map[string]string
	  ```
-
- ## ValueOf
	- ValueOf返回一个初始化为interface接口保管的具体值的Value,ValueOf(nil)返回Value零值
	- ### 通过反射获取值
		- ```go
		  package main
		  
		  import (
		  	"fmt"
		  	"reflect"
		  )
		  
		  func main() {
		  	var booknum float32 = 6
		  	var isbook bool = true
		  	bookauthor := "www.w3cschool.cn"
		  	bookdetail := make(map[string]string)
		  	bookdetail["Go语言教程"] = "www.w3cschool.cn"
		  	fmt.Println(reflect.ValueOf(booknum))
		  	fmt.Println(reflect.ValueOf(isbook))
		  	fmt.Println(reflect.ValueOf(bookauthor))
		  	fmt.Println(reflect.ValueOf(bookdetail))
		  }
		  ```
		- 以上代码执行结果如下
		- ```
		  6
		  true
		  www.w3cschool.cn
		  map[Go语言教程:www.w3cschool.cn]
		  ```
	- ### 通过反射设置值
		- ```go
		  ```