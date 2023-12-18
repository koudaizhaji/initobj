<template>
  <div class="header-left">
    <LILIBreadcrumb></LILIBreadcrumb>
  </div>
</template>

<script setup lang="ts">
import LILIBreadcrumb from '../breadcrumb'
</script>

<style scoped lang="less">
.header-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-left: 20px;
}
</style>
