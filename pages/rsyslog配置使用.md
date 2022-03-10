- 修改`/etc/rsyslog.conf`增加如下内容
- ```shell
  $template Remote,"/data/logs/kk_ccu_log/remotehost.log" # 设置远程日志存放路径和文件格式
  :fromhost-ip, !isequal, "127.0.0.1" ?Remote # 如果是本机日志则不记录
  ```
- 此时直接执行`systemctl restart rsyslog`是不行的,通过`systemctl status rsyslog`查看会发现报错`Permission denied`,