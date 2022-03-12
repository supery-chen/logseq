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
	  ```