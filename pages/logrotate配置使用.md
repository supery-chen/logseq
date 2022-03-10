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
- 按上述配置完成后,可以先临时将size配置为1M,然后手动执行`logrotate -f /etc/logrotate.conf`进行测试,正常情况下,首次执行时,只要现存日志文件大于1M,就会在日志路径下创建一个`remotehost.log.1`,等`remotehost.log`再次达到1M大小以后,再次执行`logrotate -f /etc/logrotate.conf`,可以看到原先的`remotehost.log.1`已经被压缩为`remotehost.log.2.gz`,而原先的`remotehost.log`则被重命名为`remotehost.log.1`,并重新创建了一个空的`remotehost.log`文件
-
- 到这里还没有配置完成,按照我们当前测试环境日志打印情况来看,每天的日志量在未压缩的情况下约有6G大小,不排除以后还会更多,如果我们直接使用logrotate提供的daily参数来指定日志为每天回滚一次,不仅压缩时耗时更长,且这么大的日志不利于排查问题,所以需要我们再结合cron定时任务来当时触发`logrotate -f /etc/logrotate.conf`命令,尽量保证日志每次到达500M以后就能尽快回滚
-
- 创建脚本`/etc/cron.d/logrotate`,内容如下
- ```shell
  #!/bin/sh
  
  /usr/sbin/logrotate -s /var/lib/logrotate/logrotate.status /etc/logrotate.conf
  ```
- 使用`root`用户执行`crontab -e`创建定时任务,定时任务如下
- ```shell
  # 每分钟执行一次
  */1 * * * * sh /etc/cron.d/logrotate
  ```
-
- 按上述配置完成后,可以再次临时将logrotate配置中的size修改为1M,然后等待一分钟后查看定时任务执行情况,同时也可以通过`tail -f /var/log/cron`查看定时任务执行情况