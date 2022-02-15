- ## 语法
	- Go语言的for循环有3种形式，只有其中一种使用分号
	- 和C语言种的for循环一样
	- ```go
	  for init; condition; post {}
	  ```
	- 和C的while一样
	- ```go
	  for condition {}
	  ```
	- 和C的for(;;)一样
	- ```go
	  for {}
	  ```
	- init：一般为赋值表达式，给控制变量赋初值
	- condition：关系表达式或逻辑表达式，循环控制条件
	- post：一般为赋值表达式，给控制变量增量或减量
	- for