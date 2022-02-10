- [Reference > MongoDB Package Components > mongodump](https://docs.mongodb.com/v4.2/reference/program/mongodump/)
-
- ```shell
  [hj@mongodb-master ~]$ mongodump --uri="mongodb://172.25.240.3:27017,172.25.240.28:27017,172.25.240.29:27017/konke_iot?replicaSet=mongodb-repl-test&readPreference=secondaryPreferred&appname=MongoDB%20Compass&ssl=false" -o=/tmp/mongodb
  2022-02-10T16:06:00.407+0800	writing konke_iot.t_device_status to /tmp/mongodb/konke_iot/t_device_status.bson
  2022-02-10T16:06:00.409+0800	writing konke_iot.t_devices to /tmp/mongodb/konke_iot/t_devices.bson
  2022-02-10T16:06:00.410+0800	writing konke_iot.t_hardwares to /tmp/mongodb/konke_iot/t_hardwares.bson
  2022-02-10T16:06:00.563+0800	writing konke_iot.t_device_extras to /tmp/mongodb/konke_iot/t_device_extras.bson
  2022-02-10T16:06:00.637+0800	done dumping konke_iot.t_hardwares (4576 documents)
  2022-02-10T16:06:00.641+0800	writing konke_iot.t_gateways to /tmp/mongodb/konke_iot/t_gateways.bson
  2022-02-10T16:06:00.692+0800	done dumping konke_iot.t_gateways (869 documents)
  2022-02-10T16:06:00.698+0800	writing konke_iot.t_caches to /tmp/mongodb/konke_iot/t_caches.bson
  2022-02-10T16:06:00.741+0800	done dumping konke_iot.t_devices (8959 documents)
  2022-02-10T16:06:00.746+0800	writing konke_iot.t_scenes to /tmp/mongodb/konke_iot/t_scenes.bson
  2022-02-10T16:06:00.751+0800	done dumping konke_iot.t_caches (849 documents)
  2022-02-10T16:06:00.755+0800	writing konke_iot.t_guard_sensor_types to /tmp/mongodb/konke_iot/t_guard_sensor_types.bson
  2022-02-10T16:06:00.767+0800	done dumping konke_iot.t_guard_sensor_types (393 documents)
  2022-02-10T16:06:00.770+0800	writing konke_iot.t_guard to /tmp/mongodb/konke_iot/t_guard.bson
  2022-02-10T16:06:00.776+0800	done dumping konke_iot.t_device_status (8954 documents)
  2022-02-10T16:06:00.779+0800	done dumping konke_iot.t_guard (283 documents)
  2022-02-10T16:06:00.784+0800	writing konke_iot.t_region to /tmp/mongodb/konke_iot/t_region.bson
  2022-02-10T16:06:00.785+0800	writing konke_iot.t_basic to /tmp/mongodb/konke_iot/t_basic.bson
  2022-02-10T16:06:00.803+0800	done dumping konke_iot.t_basic (282 documents)
  2022-02-10T16:06:00.811+0800	writing konke_iot.t_ifttt to /tmp/mongodb/konke_iot/t_ifttt.bson
  2022-02-10T16:06:00.816+0800	done dumping konke_iot.t_region (283 documents)
  2022-02-10T16:06:00.823+0800	writing konke_iot.t_groups to /tmp/mongodb/konke_iot/t_groups.bson
  2022-02-10T16:06:00.835+0800	done dumping konke_iot.t_scenes (817 documents)
  2022-02-10T16:06:00.842+0800	writing konke_iot.t_controllers to /tmp/mongodb/konke_iot/t_controllers.bson
  2022-02-10T16:06:00.843+0800	done dumping konke_iot.t_groups (178 documents)
  2022-02-10T16:06:00.849+0800	writing konke_iot.t_finger to /tmp/mongodb/konke_iot/t_finger.bson
  2022-02-10T16:06:00.849+0800	done dumping konke_iot.t_ifttt (274 documents)
  2022-02-10T16:06:00.851+0800	writing konke_iot.t_cache_map to /tmp/mongodb/konke_iot/t_cache_map.bson
  2022-02-10T16:06:00.855+0800	done dumping konke_iot.t_controllers (133 documents)
  2022-02-10T16:06:00.859+0800	writing konke_iot.t_zigbee_groups to /tmp/mongodb/konke_iot/t_zigbee_groups.bson
  2022-02-10T16:06:00.867+0800	done dumping konke_iot.t_zigbee_groups (70 documents)
  2022-02-10T16:06:00.868+0800	done dumping konke_iot.t_cache_map (109 documents)
  2022-02-10T16:06:00.873+0800	done dumping konke_iot.t_finger (111 documents)
  2022-02-10T16:06:00.893+0800	done dumping konke_iot.t_device_extras (8959 documents)
  ```