- [Centos7配置logrotate日志轮转](https://blog.51cto.com/u_14832653/2512113)
- 修改`/etc/logrotate.d/syslog`,配置`/data/logs/kk_ccu_log/*.log`的日志轮转
- ```bash
  /data/logs/kk_ccu_log/*.log {
      #忽略日志丢失问题
      missingok
      #轮转保留500份文件
      rotate 1000
      #轮转文件大小500M
      size 500M
      #不以日期为后缀,以1,2,3为文件后缀
      nodateext
      #通过gzip对转储后的日志进行压缩
      compress
      #发生轮转的日志文件到下一次转储时才压缩
      delaycompress
      #空日志不进行轮转
      notifempty
      #在logrotate转储之后需要执行的指令，如重启(kill -HUP)服务
      postrotate
  	/bin/kill -HUP `cat /var/run/syslogd.pid 2> /dev/null` 2> /dev/null || true
      endscript
  }
  ```
- 配置中的相关配置项都有注释说明,除此之外,其它配置项含义可以参考[Centos7配置logrotate日志轮转](https://blog.51cto.com/u_14832653/2512113)这篇文章中的说明
-
- 按上述配置完成后,可以先临时将size配置为1M,然后手动执行`logrotate -f /etc/logrotate.conf`进行测试,正常情况下,首次执行时,只要现存日志文件大于1M,就会在日志路径下创建一个`remotehost.log.1`,等`remotehost.log`再次达到