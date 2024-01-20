<template>
  <div class="upload-img">
    <div>docx文件预览</div>
    <vue-office-docx :src="docx" style="height: 100vh;" @rendered="rendered" />
    <!-- pdf预览 -->
    <div>pdf预览</div>
    <vue-office-pdf :src="pdf" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>
<script setup lang="ts">
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import { ref } from 'vue'

const docx = 'http://static.shanhuxueyuan.com/test6.docx' //设置文档网络地址，可以是相对地址
const pdf = 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf' //设置文档地址
const src = ref([])
const rendered = () => {
  console.log('渲染完成')
}
const renderedHandler = () => {
  console.log('渲染完成')
}
const errorHandler = () => {
  console.log('渲染失败')
}
// const changeHandle = (event) => {
//   let file = event.target.files[0]
//   let fileReader = new FileReader()
//   fileReader.readAsArrayBuffer(file)
//   fileReader.onload = () => {
//     this.src = fileReader.result
//   }
// }
</script>
<style lang="less" scoped>
.upload-img {
}
</style>
