<template>
  <div class="sendMd">
    <button class="btn btn-primary mr-20px" @click="newArticleClick('article')">添加文章</button>
    <button class="btn btn-primary" @click="newClassClick('class')" ref="newClassRef">添加分类</button>
    <pageModal :modal-config="MdConfig" ref="newArticleRef" />
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
import { ref,toRaw } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { addMd, addMdClass } from '@/services/template/markdown/markdown'
import usePageModal from '@/hooks/usePageModal'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import {MdConfig,ClassConfig} from './config/modal.config'
// 弹窗所需的3个操作
const { modalRef,refList, handleNewDataClick, handleEditDataClick } = usePageModal(['newClassRef', 'newArticleRef'],add)
const newClassRef = refList[0]
const newArticleRef = refList[1]
let content = ref('');
let author = JSON.parse(localStorage.getItem('user_info')).username
const newClassClick = (type)=>{
  console.log("点击了newClassClick")
  // handleNewDataClick(0)
  add(type)
}
const newArticleClick = (type)=>{
  console.log("点击了newArticleClick")
  // handleNewDataClick(1)
  add(type)
}

// 封装函数
 function add (type) {
  if(type=='class'){
    let formData=newClassRef.value.formData
    formData.status='1'
    formData.type='1'
    formData.userId='2'
    newClassRef.value.setDialogVisible(true,formData)
  }else{
    let formData=newArticleRef.value.formData
    formData.content=content
    formData.author=author
    newArticleRef.value.setDialogVisible(true,formData)
  }
  return 
}
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
