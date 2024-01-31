<template>
  <div class="templateHome">
      <vxe-button content="默认颜色"></vxe-button>
      <vxe-button status="primary" content="主要颜色"></vxe-button>
      <vxe-button status="success" content="成功颜色"></vxe-button>
      <vxe-button status="info" content="信息颜色"></vxe-button>
      <vxe-button status="warning" content="警告颜色"></vxe-button>
      <vxe-button status="danger" content="危险颜色"></vxe-button>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.templateHome {
  @apply flex flex-justify-center flex-items-center w-100\% h-100\% bg-center bg-no-repeat bg-cover;
}
</style>
