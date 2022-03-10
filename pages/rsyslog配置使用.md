- 修改`/etc/rsyslog.conf`增加如下内容
- ```shell
  #$template Remote,"/var/log/ccu_log/%$MONTH%-%$DAY%.log" # 设置远程日志存放路径和文件格式
  $template Remote,"/data/logs/kk_ccu_log/remotehost.log"
  :fromhost-ip, !isequal, "127.0.0.1" ?Remote  # 如果是本机日志则不记录
  ```