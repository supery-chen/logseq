public:: true

- #Java
- ## LoadLoad Barriers
	- 示例：`Load1;LoadLoad;Load2`
	- 该屏障确保Load1数据的装载优先于Load2机器后所有装载指令的操作
-
- ## StoreStore Barriers
	- 示例：`Store1;StoreStore;Store2`
	- 该屏障确保Store1立刻刷新数据到内存(使其对其它处理器可见)的操作优先于Store2及其后所有存储指令的操作
-
- ## LoadStore Barriers
	- 示例：`Load2;LoadStore;Store2`
	- 该屏障确保Load1的数据装载优先于Store2及其后所有存储指令刷新数据到内存中
-
- ## StoreLoad Barriers
	- 示例：`Store1;StoreLoad;Load2`
	- 该屏障确保Store1立刻刷新数据到内存的操作优先于Load2及其后所有装载指令的操作。它会使该屏障之前的所有内存访问指令(存储指令和访问指令)完成之后，才执行该屏障之后的内存访问指令