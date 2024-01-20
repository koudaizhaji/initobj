<template>
  <div class="sendMd">
    <PopUp :content="content" :options="markdown" Atype="1">添加文章</PopUp>
    <PopUp :content="content" :options="classtype" Atype="2">添加分类</PopUp>
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
import PopUp from './component/PopUp.vue'
import { addMd, addMdClass } from '@/services/markdown/markdown'
import {markdown,classtype} from './config/model.config.js'
import 'md-editor-v3/lib/style.css';
let content = ref('');
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