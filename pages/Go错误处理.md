- Go语言通过内置的错误接口提供了简单的错误处理机制
- error类型是一个接口类型,这是它的定义
- ```go
  type error interface{
    Error() string
  }
  ```
- 我们可以在编码中通过实现error接口类型来生成错误信息
- 函数通常在最后的返回值中返回错误信息.使用errors.New可返回一个错误信息
- ```go
  func Sqrt(f float64) (float64, error) {
    if f < 0 {
      return 0, errors.New("math: square root of negative number")
    }
    // 实现
  }
  ```
- 在下面的例子中,我们在调用Sqrt的时候传入的一个负数,然后就得到了non-nil的error对象,将此对象与nil比较,结果为true,,所以`fmt.Println(fmt包处理error时会调用Error方法)`被调用,以输出错误,请看下面调用的示例代码
- ```go
  result, err := Sqrt(-1)
  
  if err != nil {
    fmt.Println(err)
  }
  ```
-
- ## 实例
	- ```go
	  package main
	  
	  import "fmt"
	  
	  type DevideError struct {
	  	dividee int
	  	divider int
	  }
	  
	  func (de *DevideError) ERROR() string {
	  	strFormat := `
	  	Cannot proceed, the divider is zero.
	  	dividee: %d
	  	divider: 0
	  `
	  	return fmt.Sprintf(strFormat, de.dividee)
	  }
	  
	  func Divide(varDividee int, varDivider int) (result int, errorMsg string) {
	  	if varDivider == 0 {
	  		dData := DevideError{
	  			dividee: varDividee,
	  			divider: varDivider,
	  		}
	  		errorMsg = dData.ERROR()
	  		return
	  	}
	  	return varDividee / varDivider, ""
	  }
	  
	  func main() {
	  	//正常情况
	  	if result, errorMsg := Divide(100, 10); errorMsg == "" {
	  		fmt.Println("100/10 = ", result)
	  	}
	  	//当被除数为零时候会返回错误信息
	  	if _, errorMsg := Divide(100, 0); errorMsg != "" {
	  		fmt.Println("errorMsg is: ", errorMsg)
	  	}
	  }
	  ```
	- 执行以上程序,输出结果为
	- ```
	  100/10 =  10
	  errorMsg is:  
	          Cannot proceed, the divider is zero.
	          dividee: 100
	          divider: 0
	  ```