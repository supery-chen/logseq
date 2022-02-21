title:: main.yaml

- 在`supery-chen.github.io`库中点击[actions](https://github.com/supery-chen/supery-chen.github.io/actions)按钮，再点击`New workflow`，创建一个工作流
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1645433122036_0.png)
- 选择`Simple workflow`进行创建
- ![Replaced by Image Uploder](https://gitee.com/superficial/blogimage/raw/master/img/image_1645433167024_0.png)
- 输入名称为`main.yaml`，内容如下
- ```yaml
  # 名称，CI
  name: CI
  
  # 工作流执行时机：on表示当...发生时
  on:
    # 当 main 分支发生 push 操作时执行工作流
    push:
      branches: [ main ]
  
    # 手动触发工作流时执行工作流
    workflow_dispatch:
    
    # 分支触发事件时执行工作流（我们使用的是这种）
    # 因为我们的数据存储在supery-chen/logseq库，而页面发布在supery-chen/supery-chen.github.io库
    # 这就需要在supery-chen/logseq库的main分支发生push操作时，通过repository_dispatch的方式通知到此工作流
    # 这部分逻辑后面在supery-chen/logseq的工作流中详细说明
    repository_dispatch:
  
  # 工作流中的任务
  jobs:
    # 任务名称 build
    build:
      # 运行任务的服务器类型
      runs-on: ubuntu-latest
  	# 任务步骤定义
      steps:
        # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
  	  # 切换分支以保证任务可访问到此库
        - uses: actions/checkout@v2
  		
        # Runs a single command using the runners shell
        # 这里是触发另一个工作流(此工作流定义在supery-chen/supery-chen.github.io的main分支下，文件名为action.yaml)
        - name: Logseq Publish 🚩
          uses: supery-chen/supery-chen.github.io@main
  
        # Runs a set of commands using the runners shell
        - name: add a nojekyll file
          run: touch $GITHUB_WORKSPACE/www/.nojekyll
        - name: Deploy 🚀
          uses: JamesIves/github-pages-deploy-action@v4
          with:
            branch: gh-pages # The branch the action should deploy to.
            folder: www # The folder the action should deploy.
            clean: true
            single-commit: true
  ```