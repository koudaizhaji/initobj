<template>
  <div class="sendMd">
    <!-- <div class="inp">
      <input type="text" placeholder="请输入文章标题" v-model="title">
      <input type="text" placeholder="请输入文章描述" v-model="desc">
    </div> -->
    <PopUp @click="addMsg">添加文章</PopUp>
    <PopUp @click="addClass">添加分类</PopUp>
    <!-- <PopUp @click="getMd">查询</PopUp> -->
    <!-- <button >添加文章</button> -->
    <!-- <button @click="getMd">查询</button> -->
  </div>
  <!-- <div class="sendMd">
    <div class="inp">
      <input type="text" placeholder="请输入分类标题" v-model="classTitle">
      <input type="text" placeholder="请输入分类描述" v-model="classDesc">
    </div>
    <PopUp @click="addClass">添加分类</PopUp>
    <button @click="addClass">添加分类</button>
  </div> -->
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
import PopUp from './component/PopUp.vue'
// import pageModal from '@/components/pages/page-modal/page-modal.vue'
// import modalConfig from './config/modal.config.ts'
// import usePageModal from '@/hooks/usePageModal'
import { addMd, addMdClass } from '@/services/markdown/markdown'
import 'md-editor-v3/lib/style.css';
let content = ref('');
let title = ref('');
let desc = ref('');
let classTitle = ref('');
let classDesc = ref('');
let addMsg = async () => {
  if (content.value.trim() === '') {
    alert('文章的内容不能为空')
    return
  }
  if (title.value.trim() === '') {
    alert('文章的标题不能为空')
    return
  }
  if (desc.value.trim() === '') {
    alert('文章的描述不能为空')
    return
  }
  let formData = {
    title: title.value,
    author: '挽歌',
    desc: desc.value,
    content: content.value,
    classId: '2'
  }
  // console.log('formData', formData);
  try {
    let res = await addMd(formData)
    content.value = ''
    title.value = ''
    desc.value = ''
    console.log('文章存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
}
let addClass =async ()=>{
  if (classTitle.value.trim() === '') {
    alert('分类的标题不能为空')
    return
  }
  if (classDesc.value.trim() === '') {
    alert('分类的描述不能为空')
    return
  }
  let formData = {
    name: classTitle.value,
    desc: classDesc.value,
    status:'1',
    type:'1',
    userId: '2'
  }
  // console.log('formData', formData);
  try {
    let res = await addMdClass(formData)
    classTitle.value = ''
    classDesc.value = ''
    console.log('分类存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
}

</script>

<style lang="scss" scoped>
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