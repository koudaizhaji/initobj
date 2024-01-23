<template>
  <div class="sendMd">
    <button class="btn btn-primary mr-20px" @click="newArticleClick('article')">添加文章</button>
    <button class="btn btn-primary" @click="newClassClick('class')" ref="newClassRef">添加分类</button>
    <pageModal :modal-config="articleConfig" ref="newArticleRef" />
    <pageModal :modal-config="ClassConfig" ref="newClassRef" />
  </div>
  <div class="markdow-page">
    <MdEditor v-model="content" />
  </div>
</template>

<script setup>
/*
*@Description: MarkDown编辑
*@Author: 挽歌
*@Date: 2024-1-5
*/
import { ref,toRaw,onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import useMarkdownStore from "@/stores/template/markdown/markdown"
import usePageModal from '@/hooks/usePageModal'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import { articleConfig } from './config/modal.config'
import { ClassConfig } from './config/class-modal.config'

const markdownStore = useMarkdownStore()
// 弹窗所需的3个操作
const { modalRef,refList, handleNewDataClick, handleEditDataClick } = usePageModal(['newClassRef', 'newArticleRef'],addMarkdown)
const newClassRef = refList[0]
const newArticleRef = refList[1]
let content = ref('');
let author = JSON.parse(localStorage.getItem('user_info')).username
const newClassClick = (type)=>{
  // handleNewDataClick(0)
  addMarkdown(type)
}

const newArticleClick = (type)=>{
  // handleNewDataClick(1)
  addMarkdown(type)
}


// 封装函数
function addMarkdown (type) {
  console.log('type',type)
  if(type=='class'){
    newClassRef.value.setDialogVisible()
    const formData=newClassRef.value.formData
    formData.status='1'
    formData.type='1'
    formData.userId='2'

  }else{
    newArticleRef.value.setDialogVisible()
    const formData=newArticleRef.value.formData
    // console.log('content.value',content.value)
    formData.content=content.value
    formData.author=author.value
    console.log('此时的formData',formData)
  }
}

// 获取文章分类数据
async function getMdClassList(){
  const res = await markdownStore.getMdClassAction()
  // console.log('获取到的文章分类',res)
  const markdownClass = res.map(item=>{
    return {
      id: item.id,
      value: item.id,
      label: item.name
    }
  })
  console.log('articleConfig',articleConfig)
  articleConfig.formItems.forEach((item)=>{
    if(item.type == "select"&& item.prop == "classId"){
      item.options = markdownClass
    }
  })
}

onMounted(()=>{
  getMdClassList()
})
</script>

<style lang="less" scoped>
.markdow-page {
  width: 100%;
  height: 100%;
}

ul,
ol,
li {
  list-style: circle !important;
}

.sendMd {
  display: flex;
  justify-content: right;
  margin: 10px 0;

  button {
    padding: 10px 20px;
    color: #fff;
    background-color: #1d7dfa;
    border: none;
    border-radius: 2px;
  }

  .inp {
    width: 1000px;

    input {
      padding: 5px;
    }

    input:first-child {
      width: 30%;
      margin-right: 40px;
    }

    input:last-child {
      width: 50%;
    }
  }
}
</style>
./config/modal.config.js
