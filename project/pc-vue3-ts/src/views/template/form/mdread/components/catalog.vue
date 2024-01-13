<template>
  <div class="catalog">
    <div class="catalogue">目录</div>
    <div class="titleBox">
      <div class="firstTitle">安装</div>
      <div class="secondTitle">创建版本库</div>
      <div class="thirdTitle">创建版本库</div>

      <div class="firstTitle">一级</div>
      <div class="secondTitle">二级</div>
      <div class="thirdTitle">三级</div>

      <div class="firstTitle">超长一级超长一级超长一级超长一级超长一级</div>
      <div class="secondTitle">超长二级超长二级超长二级超长二级超长二级</div>
      <div class="thirdTitle">超长三级超长三级超长三级超长三级超长三级</div>

      <div class="firstTitle">超长一级超长一级超长一级超长一级超长一级</div>
      <div class="secondTitle">超长二级超长二级超长二级超长二级超长二级</div>
      <div class="thirdTitle">超长三级超长三级超长三级超长三级超长三级</div>
      <div class="firstTitle">超长一级超长一级超长一级超长一级超长一级</div>
      <div class="secondTitle">超长二级超长二级超长二级超长二级超长二级</div>
      <div class="thirdTitle">超长三级超长三级超长三级超长三级超长三级</div>
      <div class="firstTitle">超长一级超长一级超长一级超长一级超长一级</div>
      <div class="secondTitle">超长二级超长二级超长二级超长二级超长二级</div>
      <div class="thirdTitle">超长三级超长三级超长三级超长三级超长三级</div>
      <div class="firstTitle">超长一级超长一级超长一级超长一级超长一级</div>
      <div class="secondTitle">超长二级超长二级超长二级超长二级超长二级</div>
      <div class="thirdTitle">超长三级超长三级超长三级超长三级超长三级</div>
    </div>
  </div>
</template>

<script lang="ts">
import { h } from 'vue'
</script>

<style lang="less" scoped>
.catalog {
  background-color: #fff;
  height: 60%;
  border-radius: 5px;
  padding: 0 15px 20px;
  line-height: 1.5em;
  ::-webkit-scrollbar {
    display: none;
  }
  .firstTitle,
  .secondTitle,
  .thirdTitle {
    cursor: pointer;
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */
    &:hover {
      font-weight: 600;
    }
    &:focus {
      font-weight: 600;
    }
    &:active {
      font-weight: 600;
    }
  }

  .catalogue {
    font-size: 20px;
    color: #3c4f54;
    padding: 15px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid #e6eced;
  }
  .titleBox {
    height: 87%;
    overflow-x: auto;
    overflow-y: scroll;
  }
  .firstTitle {
    font-size: 16px;
    color: #647576;
  }
  .secondTitle {
    font-size: 14px;
    padding-left: 1em;
    color: #647576;
  }
  .thirdTitle {
    font-size: 12px;
    padding-left: 2.5em;
    color: #647576;
  }
}
</style>
