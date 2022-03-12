- Go语言中range关键字用于for循环中迭代数组(array),切片(slice),链表(channel)或集合(map)的元素
- 在数组和切片中它返回元素的索引值,在集合中返回key-value对的key值
- 对于映射,它返回下一个键值对的键.Range返回一个值或两个值.如果在Range表达式的左侧只使用了一个值,则该值是下表中的第一个值
- |Range表达式|第一个值|第二个值(可选的)|
  |Array或者slice a [n]E|索引i int|a[i] E|
  |String s string type|索引i int|rune int|
  |map m map[K]V|键k K|值 m[k] V|
  |channel c chan E|元素 e E|none|
-
-