<template>
  <div class="sendMd">
    <!-- <PopUp :content="content" :options="markdown" Atype="1">添加文章</PopUp>
    <PopUp :content="content" :options="classtype" Atype="2">添加分类</PopUp> -->
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
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import PopUp from './component/PopUp.vue'
import { addMd, addMdClass } from '@/services/template/markdown/markdown'
import usePageModal from '@/hooks/usePageModal'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import {MdConfig,ClassConfig} from './config/modal.config'
// 弹窗所需的3个操作
const { modalRef,refList, handleNewDataClick, handleEditDataClick } = usePageModal(['newClassRef', 'newArticleRef'],add)
const newClassRef = refList[0]
const newArticleRef = refList[1]
let content = ref('');

const  newClassClick = (type)=>{
  console.log("点击了newClassClick")
  // handleNewDataClick(0)
  add(type)
}
const newArticleClick = (type)=>{
  console.log("点击了newArticleClick")
  // handleNewDataClick(1)
  add(type)
}

const newCallBack = async (type, data) => {
  console.log('type,data',type,data)
}
// 封装函数
async function add (type) {
  if(type=='class'){
    console.log('newClassRef.value',newClassRef.value.formData)
  }else{
    console.log('newClassRef.value',newArticleRef.value.dialogVisible,
    newClassRef.value.formData,
    newArticleRef.value.setDialogVisible(false,{}))
  }
  return
  // 判断需要文章还是分类接口
  let flag=type==='1'?'文章':'分类'
  if (form.title.trim() === '') {
    alert(`${flag}的标题不能为空`)
    return
  }
  if (form.desc.trim() === '') {
    alert(`${flag}的描述不能为空`)
    return
  }
  // 文章接口上传
  if(type==='1'){
    if (props.content.trim() === '') {
    alert('文章的内容不能为空')
    return
  }
  // 数据格式化
  let formData = {
    title: form.title,
    author: '？？？',
    desc: form.desc,
    content: props.content,
    classId: form.type
  }
  try {
    // 存数据，清空表单
    let res = await addMd(formData)
    form.title = ''
    form.desc = ''
    console.log('文章存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
  }
  // 分类接口上传
  else{
    let formData = {
    name: form.title,
    desc: form.desc,
    status:'1',
    type:'1',
    userId: '2'
  }
  // console.log('formData', formData);
  try {
    let res = await addMdClass(formData)
    form.title = ''
    form.desc = ''
    console.log('分类存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
  }
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
