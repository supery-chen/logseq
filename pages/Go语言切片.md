- Go语言切片(Slice)是对数组的抽象
- Go数组的长度不可改变,在特定场景中这样的集合就不太适用,Go中提供了一种灵活,功能强悍的内置类型切片(动态数组),与数组相比,切片的长度是不固定的,可以追加元素,在追加时可能使切片的容量增大
-
- ## 定义切片
	- 你可以声明一个未指定大小的数组来定义切片
	- ```go
	  var identifier []type
	  ```
	- 切片不需要说明长度
	- 或使用make()函数来创建切片
	- ```go
	  var slice1 []type = make([]type, len)
	  ```
	- 也可以简写为
	- ```go
	  slice1 := make([]type, len)
	  ```
	- 也可以指定容量,其中capacity为可选参数
	- ```go
	  make([]T, length, capacity)
	  ```
	- 这里length是数组的长度并且也是切片的初始长度
-
- ## 切片初始化
	- ```go
	  s := []int{1,2,3}
	  ```
	- 直接初始化切片,[]表示是切片类型,{1,2,3}初始化值依次是1,2,3,其中cap=len=3
	- ```go
	  s := arr[:]
	  ```
	- 初始化切片s,是数组arr的引用
	- ```go
	  s := arr[startIndex:endIndex]
	  ```
	- 将arr中从下标startIndex到endIndex-1下的元素创建为一个新的切片
	- ```go
	  s := arr[startIndex:]
	  ```
	- 缺省endIndex时表示一直到arr的最后一个元素
	- ```go
	  s := arr[:endIndex]
	  ```
	- 缺省startIndex时表示从arr的第一个元素开始
	- ```go
	  s1 := s[startIndex:endIndex]
	  ```
	- 通过切片s初始化切片s1
	- ```go
	  s := make([]int, len, cap)
	  ```
	- 通过内置函数make()初始化切片s,[]int标识为其元素类型为int的切片
-
- ## len()和cap()函数
	- 切片是可索引的,并且可以由len()方法获取长度
	- 切片提供了计算容量的方法cap()可以测量切片最长可以达到多少
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	    var numbers = make([]int, 3, 5)
	    printSlice(numbers)
	  }
	  
	  func printSlice(x []int){
	    fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)
	  }
	  ```
-
- ## 空(nil)切片
	- 一个切片在未初始化之前默认为nil,长度为0
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	  	var numbers []int
	  	printSlice(numbers)
	  	if numbers == nil {
	  		fmt.Printf("切片是空的\n")
	  	}
	  }
	  
	  func printSlice(x []int) {
	  	fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)
	  }
	  ```
-
- ## 切片截取
	- 可以通过设置下限及上限来设置截取切片`[lower-bound:upper-bound]`
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	  	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8}
	  	printSlice(numbers)
	  	fmt.Println("numbers ==", numbers)
	  	fmt.Println("numbers[1:4] ==", numbers[1:4])
	  	fmt.Println("numbers[:3] ==", numbers[:3])
	  	fmt.Println("numbers[4:] ==", numbers[4:])
	  	numbers1 := make([]int, 0, 5)
	  	printSlice(numbers1)
	  	/* 打印子切片从索引  0(包含) 到索引 2(不包含) */
	  	number2 := numbers[:2]
	  	printSlice(number2)
	  
	  	/* 打印子切片从索引 2(包含) 到索引 5(不包含) */
	  	number3 := numbers[2:5]
	  	printSlice(number3)
	  }
	  
	  func printSlice(x []int) {
	  	fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)
	  }
	  ```
	-