- 修改`/etc/rsyslog.conf`增加如下内容
- ```shell
  $template Remote,"/data/logs/kk_ccu_log/remotehost.log" # 设置远程日志存放路径和文件格式
  :fromhost-ip, !isequal, "127.0.0.1" ?Remote # 如果是本机日志则不记录
  ```
- 此时直接执行`systemctl restart rsyslog`是不行的,通过`systemctl status rsyslog`查看会发现报错`Permission denied`,大概原因可以参考[如何将rsyslog消息重定向到其他路径而不是/var/log](https://www.xknote.com/ask/6104889c771a2.html),具体原因暂时没有研究明白,文章中说是与`SELinux`有关,解决方案也在文章中,可以执行命令`chcon -R -t var_log_t /data/logs/kk_ccu_log/`来允许syslog写入到`/data/logs/kk_ccu_log`中
- 执行上述命令并重启rsyslog后,再次查看状态,可以发现正常
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1646889988551_0.png)
- 关于SELinux与rsyslog的问题,[这篇文章](https://support.logz.io/hc/en-us/articles/209486429-Troubleshooting-Rsyslog-SELinux-configuration)可能有用
-
- 上述配置完成后,仅仅是实现了指定rsyslog将远程日志打印至指定路径,但如果