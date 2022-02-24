- 在我们了解指针数组前，先看个实例，定义了长度为3的整型数组
- ```go
  package main
  
  import "fmt"
  
  const MAX int = 3
  
  func main() {
  
     a := []int{10,100,200}
     var i int
  
     for i = 0; i < MAX; i++ {
        fmt.Printf("a[%d] = %d\n", i, a[i] )
     }
  }
  ```
- 有一种情况，我们可能需要保存数组，这样我们就需要使用指针
- 以下声明了整型指针数组
- ```go
  ```