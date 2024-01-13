<template>
  <div class="markdow-page">
    <MdEditor v-model="text" />
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
let logout = () => {
  console.log(text.value);
}
const text = ref('');
</script>

<style lang="scss" scoped>
.markdow-page {
  width: 100%;
  height: 100%;
}
ul, ol, li{
  list-style:circle !important;
  /* list-style:dot !important; */
}
</style>