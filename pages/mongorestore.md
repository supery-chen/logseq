- [Reference > MongoDB Package Components > mongorestore](https://docs.mongodb.com/v4.2/reference/program/mongorestore/)
-
- ```shell
  [hj@stresstest3 mongodb]$ bin/mongorestore --uri="mongodb://172.25.240.160:27017,172.25.240.167:27017,172.25.240.168:27017/konke_iot?replicaSet=mongodb-repl-test&readPreference=secondaryPreferred&appname=MongoDB%20Compass&ssl=false" -d konke_iot --dir=/tmp/konke_iot/
  2022-02-10T16:14:45.474+0800	WARNING: ignoring unsupported URI parameter 'appname'
  2022-02-10T16:14:45.474+0800	WARNING: ignoring unsupported URI parameter 'readpreference'
  2022-02-10T16:14:45.509+0800	the --db and --collection args should only be used when restoring from a BSON file. Other uses are deprecated and will not exist in the future; use --nsInclude instead
  2022-02-10T16:14:45.510+0800	building a list of collections to restore from /tmp/konke_iot dir
  2022-02-10T16:14:45.513+0800	reading metadata for konke_iot.t_devices from /tmp/konke_iot/t_devices.metadata.json
  2022-02-10T16:14:45.514+0800	reading metadata for konke_iot.t_device_extras from /tmp/konke_iot/t_device_extras.metadata.json
  2022-02-10T16:14:45.515+0800	reading metadata for konke_iot.t_device_status from /tmp/konke_iot/t_device_status.metadata.json
  2022-02-10T16:14:45.531+0800	reading metadata for konke_iot.t_hardwares from /tmp/konke_iot/t_hardwares.metadata.json
  2022-02-10T16:14:45.531+0800	restoring konke_iot.t_devices from /tmp/konke_iot/t_devices.bson
  2022-02-10T16:14:45.564+0800	restoring konke_iot.t_device_extras from /tmp/konke_iot/t_device_extras.bson
  2022-02-10T16:14:45.570+0800	restoring konke_iot.t_device_status from /tmp/konke_iot/t_device_status.bson
  2022-02-10T16:14:45.585+0800	restoring konke_iot.t_hardwares from /tmp/konke_iot/t_hardwares.bson
  2022-02-10T16:14:46.003+0800	restoring indexes for collection konke_iot.t_hardwares from metadata
  2022-02-10T16:14:46.200+0800	finished restoring konke_iot.t_hardwares (4576 documents, 0 failures)
  2022-02-10T16:14:46.200+0800	reading metadata for konke_iot.t_scenes from /tmp/konke_iot/t_scenes.metadata.json
  2022-02-10T16:14:46.209+0800	restoring konke_iot.t_scenes from /tmp/konke_iot/t_scenes.bson
  2022-02-10T16:14:46.260+0800	restoring indexes for collection konke_iot.t_device_status from metadata
  2022-02-10T16:14:46.261+0800	restoring indexes for collection konke_iot.t_device_extras from metadata
  2022-02-10T16:14:46.261+0800	restoring indexes for collection konke_iot.t_devices from metadata
  2022-02-10T16:14:46.281+0800	restoring indexes for collection konke_iot.t_scenes from metadata
  2022-02-10T16:14:46.400+0800	finished restoring konke_iot.t_scenes (817 documents, 0 failures)
  2022-02-10T16:14:46.400+0800	reading metadata for konke_iot.t_caches from /tmp/konke_iot/t_caches.metadata.json
  2022-02-10T16:14:46.421+0800	restoring konke_iot.t_caches from /tmp/konke_iot/t_caches.bson
  2022-02-10T16:14:46.493+0800	restoring indexes for collection konke_iot.t_caches from metadata
  2022-02-10T16:14:46.530+0800	finished restoring konke_iot.t_caches (849 documents, 0 failures)
  2022-02-10T16:14:46.530+0800	reading metadata for konke_iot.t_finger from /tmp/konke_iot/t_finger.metadata.json
  2022-02-10T16:14:46.539+0800	restoring konke_iot.t_finger from /tmp/konke_iot/t_finger.bson
  2022-02-10T16:14:46.558+0800	restoring indexes for collection konke_iot.t_finger from metadata
  2022-02-10T16:14:46.576+0800	finished restoring konke_iot.t_device_extras (8959 documents, 0 failures)
  2022-02-10T16:14:46.577+0800	reading metadata for konke_iot.t_ifttt from /tmp/konke_iot/t_ifttt.metadata.json
  2022-02-10T16:14:46.577+0800	finished restoring konke_iot.t_finger (111 documents, 0 failures)
  2022-02-10T16:14:46.577+0800	reading metadata for konke_iot.t_gateways from /tmp/konke_iot/t_gateways.metadata.json
  2022-02-10T16:14:46.583+0800	finished restoring konke_iot.t_device_status (8954 documents, 0 failures)
  2022-02-10T16:14:46.583+0800	reading metadata for konke_iot.t_region from /tmp/konke_iot/t_region.metadata.json
  2022-02-10T16:14:46.588+0800	restoring konke_iot.t_gateways from /tmp/konke_iot/t_gateways.bson
  2022-02-10T16:14:46.592+0800	restoring konke_iot.t_ifttt from /tmp/konke_iot/t_ifttt.bson
  2022-02-10T16:14:46.595+0800	restoring konke_iot.t_region from /tmp/konke_iot/t_region.bson
  2022-02-10T16:14:46.644+0800	restoring indexes for collection konke_iot.t_region from metadata
  2022-02-10T16:14:46.644+0800	restoring indexes for collection konke_iot.t_ifttt from metadata
  2022-02-10T16:14:46.662+0800	restoring indexes for collection konke_iot.t_gateways from metadata
  2022-02-10T16:14:46.699+0800	finished restoring konke_iot.t_region (283 documents, 0 failures)
  2022-02-10T16:14:46.699+0800	reading metadata for konke_iot.t_cache_map from /tmp/konke_iot/t_cache_map.metadata.json
  2022-02-10T16:14:46.700+0800	finished restoring konke_iot.t_ifttt (274 documents, 0 failures)
  2022-02-10T16:14:46.700+0800	reading metadata for konke_iot.t_basic from /tmp/konke_iot/t_basic.metadata.json
  2022-02-10T16:14:46.704+0800	finished restoring konke_iot.t_devices (8959 documents, 0 failures)
  2022-02-10T16:14:46.704+0800	reading metadata for konke_iot.t_controllers from /tmp/konke_iot/t_controllers.metadata.json
  2022-02-10T16:14:46.709+0800	restoring konke_iot.t_cache_map from /tmp/konke_iot/t_cache_map.bson
  2022-02-10T16:14:46.719+0800	restoring konke_iot.t_basic from /tmp/konke_iot/t_basic.bson
  2022-02-10T16:14:46.719+0800	restoring konke_iot.t_controllers from /tmp/konke_iot/t_controllers.bson
  2022-02-10T16:14:46.729+0800	finished restoring konke_iot.t_gateways (869 documents, 0 failures)
  2022-02-10T16:14:46.729+0800	reading metadata for konke_iot.t_guard_sensor_types from /tmp/konke_iot/t_guard_sensor_types.metadata.json
  2022-02-10T16:14:46.752+0800	restoring konke_iot.t_guard_sensor_types from /tmp/konke_iot/t_guard_sensor_types.bson
  2022-02-10T16:14:46.752+0800	restoring indexes for collection konke_iot.t_controllers from metadata
  2022-02-10T16:14:46.758+0800	restoring indexes for collection konke_iot.t_basic from metadata
  2022-02-10T16:14:46.760+0800	restoring indexes for collection konke_iot.t_cache_map from metadata
  2022-02-10T16:14:46.808+0800	restoring indexes for collection konke_iot.t_guard_sensor_types from metadata
  2022-02-10T16:14:46.827+0800	finished restoring konke_iot.t_cache_map (109 documents, 0 failures)
  2022-02-10T16:14:46.827+0800	reading metadata for konke_iot.t_groups from /tmp/konke_iot/t_groups.metadata.json
  2022-02-10T16:14:46.838+0800	finished restoring konke_iot.t_controllers (133 documents, 0 failures)
  2022-02-10T16:14:46.838+0800	reading metadata for konke_iot.t_guard from /tmp/konke_iot/t_guard.metadata.json
  2022-02-10T16:14:46.842+0800	restoring konke_iot.t_groups from /tmp/konke_iot/t_groups.bson
  2022-02-10T16:14:46.853+0800	finished restoring konke_iot.t_basic (282 documents, 0 failures)
  2022-02-10T16:14:46.853+0800	reading metadata for konke_iot.t_zigbee_groups from /tmp/konke_iot/t_zigbee_groups.metadata.json
  2022-02-10T16:14:46.853+0800	restoring konke_iot.t_guard from /tmp/konke_iot/t_guard.bson
  2022-02-10T16:14:46.857+0800	finished restoring konke_iot.t_guard_sensor_types (393 documents, 0 failures)
  2022-02-10T16:14:46.861+0800	restoring konke_iot.t_zigbee_groups from /tmp/konke_iot/t_zigbee_groups.bson
  2022-02-10T16:14:46.867+0800	restoring indexes for collection konke_iot.t_guard from metadata
  2022-02-10T16:14:46.889+0800	finished restoring konke_iot.t_guard (283 documents, 0 failures)
  2022-02-10T16:14:46.900+0800	restoring indexes for collection konke_iot.t_groups from metadata
  2022-02-10T16:14:46.921+0800	restoring indexes for collection konke_iot.t_zigbee_groups from metadata
  2022-02-10T16:14:46.947+0800	finished restoring konke_iot.t_groups (178 documents, 0 failures)
  2022-02-10T16:14:46.949+0800	finished restoring konke_iot.t_zigbee_groups (70 documents, 0 failures)
  2022-02-10T16:14:46.949+0800	36099 document(s) restored successfully. 0 document(s) failed to restore.
  ```