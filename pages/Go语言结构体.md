- Go语言中数组可以存储同一类型的数据，但在结构体中我们可以为不同项定义不同的数据类型
- 结构体是由一系列具有相同类型或不同类型的数据构成的数据集合
- 结构体表示一项记录，比如保存图书馆的书籍记录，每本书有以下属性
	- Title:标题
	- Author:作者
	- Subject:学科
	- ID:书籍ID
-
- ## 定义结构体
	- 结构体定义需要使用type和struct语句.struct语句定义一个新的数据类型,结构体中有一个或多个成员.type语句设定了结构体的名称.结构体的格式如下
	- ```go
	  type struct_variable_type struct{
	    member definition
	    member definition
	    ...
	    member definition
	  }
	  ```
	- 一旦定义了结构体类型,它就能用于变量的声明,语法格式如下
	- ```go
	  variable_name := structure_variable_type {value1, value2, ..., valuen}
	  ```
-
- ## 访问结构体成员
	- 如果要访问结构体成员,需要使用点号(.)操作符,格式为:`结构体.成员名`
	- 结构体类型变量使用struct关键字定义
	- ```go
	  package main
	  
	  import "fmt"
	  
	  type Books struct {
	  	title   string
	  	author  string
	  	subject string
	  	book_id int
	  }
	  
	  func main() {
	  	var Book1 Books
	  	var Book2 Books
	  
	  	Book1.title = "Go Programming"
	  	Book1.author = "Mahesh Kumar"
	  	Book1.subject = "Go Programming Tutorial"
	  	Book1.book_id = 6495407
	  
	  	Book2.title = "Python Programming"
	  	Book2.author = "Mahesh Kumar"
	  	Book2.subject = "Python Programming Tutorial"
	  	Book2.book_id = 6495700
	  
	  	/* 打印 Book1 信息 */
	  	fmt.Printf("Book 1 title : %s\n", Book1.title)
	  	fmt.Printf("Book 1 author : %s\n", Book1.author)
	  	fmt.Printf("Book 1 subject : %s\n", Book1.subject)
	  	fmt.Printf("Book 1 book_id : %d\n", Book1.book_id)
	  
	  	/* 打印 Book2 信息 */
	  	fmt.Printf("Book 2 title : %s\n", Book2.title)
	  	fmt.Printf("Book 2 author : %s\n", Book2.author)
	  	fmt.Printf("Book 2 subject : %s\n", Book2.subject)
	  	fmt.Printf("Book 2 book_id : %d\n", Book2.book_id)
	  }
	  ```
-
- ## 结构体作为函数参数
	- 你可以像其它数据类型一样将结构体类型作为参数传递给函数.并以以上实例的方式访问结构体变量
	- ```go
	  package main
	  
	  import "fmt"
	  
	  type Books struct {
	  	title   string
	  	author  string
	  	subject string
	  	book_id int
	  }
	  
	  func main() {
	  	var Book1 Books
	  	var Book2 Books
	  
	  	Book1.title = "Go Programming"
	  	Book1.author = "Mahesh Kumar"
	  	Book1.subject = "Go Programming Tutorial"
	  	Book1.book_id = 6495407
	  
	  	Book2.title = "Python Programming"
	  	Book2.author = "Mahesh Kumar"
	  	Book2.subject = "Python Programming Tutorial"
	  	Book2.book_id = 6495700
	  
	  	printBook(Book1)
	  	printBook(Book2)
	  }
	  
	  func printBook(book Books) {
	  	/* 打印 Book1 信息 */
	  	fmt.Printf("Book title : %s\n", book.title)
	  	fmt.Printf("Book author : %s\n", book.author)
	  	fmt.Printf("Book subject : %s\n", book.subject)
	  	fmt.Printf("Book book_id : %d\n", book.book_id)
	  }
	  ```
-
- ## 结构体指针
	- 你可以定义指向结构体的指针,类似于其它指针变量,格式如下
	- ```go
	  ```