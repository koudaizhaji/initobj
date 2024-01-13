<template>
  <div class="sendMd">
    <div class="inp">
      <input type="text" placeholder="请输入标题" v-model="title">
      <input type="text" placeholder="请输入描述" v-model="desc">
    </div>
    <button @click="logout">添加</button>
    <button @click="getMd">查询</button>
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
import { addMd, findMdListById } from '@/services/markdown/markdown'
import 'md-editor-v3/lib/style.css';

let content = ref('');
let title = ref('');
let desc = ref('');

let logout = async () => {
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
    classId: '99'
  }
  // console.log('formData', formData);
  try {
    let res = await addMd(formData)
    content.value = ''
    title.value = ''
    desc.value = ''
    console.log('存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
}

let getMd = async () => {
  try {
    let res = await findMdListById('1', '10', '99')
    console.log('请求结果', res);
  } catch (error) {
    console.log('请求错误', error);
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
  justify-content: space-between;
  margin: 20px 0;

  button {
    width: 100px;
    background-color: skyblue;
    color: #fff;
    border-radius: 24px;
    border: none;
  }

  .inp {
    width: 1000px;

    input {
      padding: 10px;
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