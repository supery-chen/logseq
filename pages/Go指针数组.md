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
  var ptr [MAX]*int
  ```
- ptr为整型指针数组。因此每个元素都指向一个值。以下实例的三个整数将存储在指针数组中
- ```go
  ```