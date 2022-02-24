- 如果一个指针变量存放的又是另外一个指针变量的地址，则称这个指针变量为指向指针的指针变量
- 当定义一个指向指针的指针变量时，第一个指针存放第二个指针的地址，第二个指针存放变量的地址
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1645667220783_0.png)
- 指向指针的指针变量声明格式如下
- ```go
  var ptr **int
  ```
- 以上指向指针的指针变量为整型
- 访问指向指针的指针变量值需要使用两个*号，如下所示
- ```go
  ```