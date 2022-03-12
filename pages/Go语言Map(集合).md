- Map是一种无序的键值对集合.Map最重要的一点是通过key来快速检索数据,key类似于索引,指向数据的值
- Map是一种集合,所以我们可以像迭代数组和切片那样迭代它.不过Map是无序的,我们无法决定它的返回顺序,这是因为Map是使用hash表来实现的
- ## 定义Map
	- 可以使用内建函数make也可以使用map关键字来定义Map
	- ```go
	  //声明变量,默认map是nil
	  var map_variable map[key_data_type]value_data_type
	  //使用make函数
	  map_variable = make(map[key_data_type]value_data_type)
	  ```
	- 如果不初始化map,那么就会创建一个nil map.nil map不能用来存放键值对
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	  	//创建集合
	  	var countryCapitalMap map[string]string
	  	countryCapitalMap = make(map[string]string)
	  	//map插入key-value对,各个国家对应的首都
	  	countryCapitalMap["France"] = "Paris"
	  	countryCapitalMap["Italy"] = "Rome"
	  	countryCapitalMap["Japan"] = "Tokyo"
	  	countryCapitalMap["India"] = "New Delhi"
	  	//使用key输出map值
	  	for country := range countryCapitalMap {
	  		fmt.Printf("Capital of %s is %s\n", country, countryCapitalMap[country])
	  	}
	  	//查看元素在集合中是否存在
	  	capital, ok := countryCapitalMap["United States"]
	  	if ok {
	  		fmt.Println("Capital of United States is", capital)
	  	} else {
	  		fmt.Println("Capital of United States is not present")
	  	}
	  }
	  ```
-
- ## delete()函数
	- delete()函数用于删除集合的元素,参数为map和其对应的key
	- ```go
	  package main
	  
	  import "fmt"
	  
	  func main() {
	  	countryCapitalMap := map[string]string{"France": "Paris", "Italy": "Rome", "Japan": "Tokyo"}
	  	fmt.Println("原始map")
	  	for country := range countryCapitalMap {
	  		fmt.Printf("%s: %s\n", country, countryCapitalMap[country])
	  	}
	  	delete(countryCapitalMap, "France")
	  	fmt.Println("Entry for France is deleted")
	  	fmt.Println("删除元素后map")
	  	for country := range countryCapitalMap {
	  		fmt.Printf("%s: %s\n", country, countryCapitalMap[country])
	  	}
	  }
	  ```