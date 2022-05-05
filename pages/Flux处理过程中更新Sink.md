public:: true

- #reactor #flux #sink
- [Java Spring / Reactor send / update flux when underlying database changed](https://stackoverflow.com/questions/67594996/java-spring-reactor-send-update-flux-when-underlying-database-changed)
- > 在Flux中如何将数据库查询结果作为Flux的下一个元素,实现分页遍历查询所有数据
- 想法就是,能够在查询结果处理过程中,向Flux发送新的元素
- 示例代码如下
- ```java
  // 假设我们需要从0开始, 以id递增的方式, 分页遍历查询数据表中所有数据
  // 定义一个Sinks.Many<Integer>, 用于发射id数据
  Sinks.Many<Integer> idSink = Sinks.many().multicast().onBackpressureBuffer();
  // 添加第一个元素0, 表示id从0开始
  idSink.tryEmitNext(0);
  // 将Sinks.Many转化为Flux
  idSink.asFlux()
          //处理flux中的id
          .flatMap(id -> {
              log.info("开始查询:{}", id);
            	//根据flux中当前id, 执行数据库查询逻辑
              return repo.getAuthRelationListTest(id).collectList().defaultIfEmpty(new ArrayList<>());
          })
          .map(authRelationDtos -> {
              int nextId = -1;
              // 对每一次的查询结果,提取最大的id,调用Sinks.Many的next继续发送到flux中
              for (AuthRelationDto authRelationDto : authRelationDtos) {
                  log.info("查询结果:{}", authRelationDto.getId());
                  nextId = authRelationDto.getId();
              }
              if (nextId != -1) {
                  log.info("准备下一波查询:{}", nextId);
                  idSink.tryEmitNext(nextId);
              } else {
                  // 如果某次查询结果为空,则表示查询结束,调用Sinks.Many的complete,flux接收到complete时间后,流程结束
                  log.info("结束查询");
                  idSink.tryEmitComplete();
              }
              return authRelationDtos;
          })
          .subscribe();
  ```