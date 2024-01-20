<template>
  <div class="upload-img">
    <el-upload
      ref="uploadRef"
      class="upload-demo pl-25px"
      action="#"
      multiple
      :limit="10"
      :before-upload="beforeExcelUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleOnExceed"
      :file-list="fileList"
      :auto-upload="true"
      :http-request="httpRequestFn"
    >
      <el-button slot="trigger" size="small" type="primary">图片上传，仅限图片</el-button>
    </el-upload>

    <el-upload
      ref="uploadRef"
      class="upload-demo pl-25px"
      action="#"
      multiple
      :limit="10"
      :before-upload="beforeExcelUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleOnExceed"
      :file-list="fileList"
      :auto-upload="true"
      :http-request="httpRequestFn"
    >
      <el-button slot="trigger" size="small" type="primary">文件上传，无限制</el-button>
    </el-upload>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.upload-img {
}
</style>
