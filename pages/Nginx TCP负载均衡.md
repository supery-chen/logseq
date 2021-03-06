public:: true

- #nginx #tcp #proxy
  
  Nginx除了以前常用的HTTP负载均衡外，Nginx增加基于TCP协议实现的负载均衡方法。
  
  HTTP负载均衡，也就是我们通常所有“七层负载均衡”，工作在第七层“应用层”。而TCP负载均衡，就是我们通常所说的“四层负载均衡”，工作在“网络层”和“传输层”。
## TCP负载均衡的配置方式

Nginx使用了一个新的stream模块来实现TCP负载均衡，这个模块，类似于http和mail模块，允许我们配置一组监听TCP连接的服务。允许你配置多个服务的TCP连接，通过在upstream的server组中配置proxy_pass指令。下面描述了一个MySQL集群负载均衡的配置实例。

```text
stream{
  upstream mysql{
      server 192.168.1.101:3306 weight=1;
      server 192.168.1.102:3306 weight=1;
  }

  server{
      listen 3306;
      server_name 192.168.1.100;
      proxy_pass mysql;
  }
}
```
## TCP负载均衡的执行原理

当Nginx从监听端口收到一个新的客户端链接时，立刻执行路由调度算法，获得指定需要连接的服务IP，然后创建一个新的上游连接，连接到指定服务器。

TCP负载均衡支持Nginx原有的调度算法，包括Round Robin（默认，轮询调度），哈希（选择一致）等。同时，调度信息数据也会和健壮性检测模块一起协作，为每个连接选择适当的目标上游服务器。如果使用Hash负载均衡的调度方法，你可以使用$remote_addr（客户端IP）来达成简单持久化会话（同一个客户端IP的连接，总是落到同一个服务server上）。

和其他upstream模块一样，TCP的stream模块也支持自定义负载均和的转发权重（配置“weight=2”），还有backup和down的参数，用于踢掉失效的上游服务器。max_conns参数可以限制一台服务器的TCP连接数量，根据服务器的容量来设置恰当的配置数值，尤其在高并发的场景下，可以达到过载保护的目的。

Nginx监控客户端连接和上游连接，一旦接收到数据，则Nginx会立刻读取并且推送到上游连接，不会做TCP连接内的数据检测。Nginx维护一份内存缓冲区，用于客户端和上游数据的写入。如果客户端或者服务端传输了量很大的数据，缓冲区会适当增加内存的大小。

当Nginx收到任意一方的关闭连接通知，或者TCP连接被闲置超过了**proxy_timeout**配置的时间，连接将会被关闭。对于TCP长连接，我们更应该选择适当的proxy_timeout的时间，同时，关注监听socke的so_keepalive参数，防止过早地断开连接。
- ### 轮询
-
- 轮询方式是Nginx负载默认的方式，顾名思义，所有请求都按照时间顺序分配到不同的服务上，如果服务Down掉，可以自动剔除，如下配置后轮训10001服务和10002服务。
  ```text
  upstream  dalaoyang-server {
       server    localhost:10001;
       server    localhost:10002;
  }
  ```
### 权重

指定每个服务的权重比例，weight和访问比率成正比，通常用于后端服务机器性能不统一，将性能好的分配权重高来发挥服务器最大性能，如下配置后10002服务的访问比率会是10001服务的二倍。

```text
upstream  dalaoyang-server {
     server    localhost:10001 weight=1;
     server    localhost:10002 weight=2;
}
```
- ### iphash
  
  每个请求都根据访问ip的hash结果分配，经过这样的处理，每个访客固定访问一个后端服务，如下配置（ip_hash可以和weight配合使用）。
  ```text
  upstream  dalaoyang-server {
       ip_hash; 
       server    localhost:10001 weight=1;
       server    localhost:10002 weight=2;
  }
  ```
- ### 最少连接
  
  将请求分配到连接数最少的服务上。
  ```text
  upstream  dalaoyang-server {
       least_conn;
       server    localhost:10001 weight=1;
       server    localhost:10002 weight=2;
  }
  ```
- ### fair
  
  按后端服务器的响应时间来分配请求，响应时间短的优先分配。
  ```text
  upstream  dalaoyang-server {
       server    localhost:10001 weight=1;
       server    localhost:10002 weight=2;
       fair;  
  }
  ```
## 服务健壮性监控

TCP负载均衡模块支持内置健壮性检测，一台上游服务器如果拒绝TCP连接超过**proxy_connect_timeout**配置的时间，将会被认为已经失效。在这种情况下，Nginx立刻尝试连接upstream组内的另一台正常的服务器。连接失败信息将会记录到Nginx的错误日志中。

如果一台服务器，反复失败（超过了max_fails或者fail_timeout配置的参数），Nginx也会踢掉这台服务器。服务器被踢掉60秒后，Nginx会偶尔尝试重连它，检测它是否恢复正常。如果服务器恢复正常，Nginx将它加回到upstream组内，缓慢加大连接请求的比例。

之所“缓慢加大”，因为通常一个服务都有“热点数据”，也就是说，80%以上甚至更多的请求，实际都会被阻挡在“热点数据缓存”中，真正执行处理的请求只有很少的一部分。在机器刚刚启动的时候，“热点数据缓存”实际上还没有建立，这个时候爆发性地转发大量请求过来，很可能导致机器无法“承受”而再次挂掉。以mysql为例子，我们的mysql查询，通常95%以上都是落在了内存cache中，真正执行查询的并不多。

其实，无论是单台机器或者一个集群，在高并发请求场景下，重启或者切换，都存在这个风险，解决的途径主要是两种：
（1）请求逐步增加，从少到多，逐步积累热点数据，最终达到正常服务状态。  
（2）提前准备好“常用”的数据，主动对服务做“预热”，预热完成之后，再开放服务器的访问。

TCP负载均衡原理上和LVS等是一致的，工作在更为底层，性能会高于原来HTTP负载均衡不少。但是，不会比LVS更为出色，LVS被置于内核模块，而Nginx工作在用户态，而且，Nginx相对比较重。