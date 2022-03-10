- 修改`/etc/rsyslog.conf`增加如下内容
- ```shell
  $template Remote,"/data/logs/kk_ccu_log/remotehost.log" # 设置远程日志存放路径和文件格式
  :fromhost-ip, !isequal, "127.0.0.1" ?Remote # 如果是本机日志则不记录
  ```
- 此时直接执行`systemctl restart rsyslog`是不行的,通过`systemctl status rsyslog`查看会发现报错`Permission denied`,大概原因可以参考[如何将rsyslog消息重定向到其他路径而不是/var/log](https://www.xknote.com/ask/6104889c771a2.html),具体原因暂时没有研究明白,文章中说是与`SELinux`有关,解决方案也在文章中,可以执行命令`chcon -R -t var_log_t /data/logs/kk_ccu_log/`来允许