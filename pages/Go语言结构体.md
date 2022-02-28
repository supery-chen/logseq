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
	- 如果要访问结构体成员,