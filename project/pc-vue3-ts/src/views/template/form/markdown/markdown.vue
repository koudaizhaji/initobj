<template>
  <div class="sendMd">
    <!-- <PopUp :content="content" :options="markdown" Atype="1">添加文章</PopUp>
    <PopUp :content="content" :options="classtype" Atype="2">添加分类</PopUp> -->
    <button class="btn btn-primary mr-20px" @click="newArticleClick">添加文章</button>
    <button class="btn btn-primary" @click="newClassClick" ref="newClassRef">添加分类</button>
    <pageModal :modal-config="modalConfig" ref="newArticleRef" />
    <pageModal :modal-config="classModalConfig" ref="newClassRef" />
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
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

// import PopUp from './component/PopUp.vue'
import { addMd, addMdClass } from '@/services/template/markdown/markdown'
import usePageModal from '@/hooks/usePageModal'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import classModalConfig from "./config/class-modal.config.ts"
// 弹窗所需的3个操作
const { modalRef,refList, handleNewDataClick, handleEditDataClick } = usePageModal(['newClassRef', 'newArticleRef'])
const newClassRef = refList[0]
const newArticleRef = refList[1]
const  newClassClick = ()=>{
  console.log("点击了newClassClick")
  handleNewDataClick(0)
}
const newArticleClick = ()=>{
  console.log("点击了newArticleClick")
  handleNewDataClick(1)
}
let content = ref('');
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
