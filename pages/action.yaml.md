public:: true
title:: action.yaml

- 打开我的[Logseq仓库](https://github.com/supery-chen/logseq)，在`main`分支根目录下创建`action.yaml`文件，内容如下
- ```yaml
  name: "Logseq Publish"
  description: "Publish your Logseq Graph"
  inputs:
    src:
      description: "export source"
      required: true
      default: ""
    dest:
      description: "export destination"
      required: true
      default: "www"
    version:
      description: >
        Logseq version to use. Note, not all version are supported.
        Use "master" if you are not sure what to put here
      required: true
      default: "master"
    trace:
      description: >
        Whether or not to generate trace file for debugging.
      default: true
  branding:
    icon: "arrow-up-circle"
    color: "green"
  runs:
    using: "composite"
    steps:
      - name: Create dest before running docker
        shell: bash
        run: mkdir -p ${{ github.workspace }}/${{ inputs.dest }}
      - uses: addnab/docker-run-action@v3
        with:
          image: "ghcr.io/pengx17/logseq-publish:${{ inputs.version }}"
          options: |
            -v ${{ github.workspace }}:/home/logseq/graph
          run: |
            xvfb-run node publish.mjs -p graph/${{ inputs.src }} -t ${{ inputs.trace }} -o graph/${{ inputs.dest }}
            exit $?
      - name: Archive trace file
        if: ${{ always() && inputs.trace }}
        uses: actions/upload-artifact@v2
        with:
          name: trace
          path: |
            ${{ inputs.dest }}/trace.zip
  ```