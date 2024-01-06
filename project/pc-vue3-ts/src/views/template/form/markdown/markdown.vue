<template>
  <div class="markdow-page">
      <Editor :locale="zh" :upload-images="handleUploadFile" :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>
<script setup>
/*
 *@Description: MarkDown编辑
 *@Author: 挽歌
 *@Date: 2024-1-5
 */
import { reactive, toRefs, markRaw } from 'vue'
// 编辑器
import { Editor } from '@bytemd/vue-next'
// 自动链接文字、删除线、表格、任务列表
import gfm from '@bytemd/plugin-gfm'
// 短代码
import gemoji from '@bytemd/plugin-gemoji'
// 代码高亮
import highlight from '@bytemd/plugin-highlight' 
// 解析前题
import frontmatter from '@bytemd/plugin-frontmatter' 
// 缩放图片
import mediumZoom from '@bytemd/plugin-medium-zoom' 
import breaks from '@bytemd/plugin-breaks'
// 相关字体
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
// 掘金同款样式
import 'juejin-markdown-themes/dist/juejin.min.css' 

// 引入内容控件所支持的特殊功能插件列表
const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
]
// 初始状态
const state = reactive({
  value: '',
  plugins: markRaw(pluginsList),
  zh: zhHans,
})
const { value, plugins, zh } = toRefs(state)

const handleChange = val => {
  state.value = val
  console.log('markdown内容',val);
}
const handleUploadFile = files => {
  let fromData = new FormData()
  fromData.append('file', files[0])
  return [
      {
          title: '挽歌Elegy'
      },
  ]
}
</script>
<style lang="scss" scoped>
.markdow-page {
  width: 100%;
  height: 100vh;

  :deep() {
      .bytemd {
          width: 80vw;
          height: calc(100vh - 100px);
          text-align: left;
      }
  }
}
</style>