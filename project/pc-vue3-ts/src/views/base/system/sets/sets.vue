<template>
  <div class="sets">
    <h2>系统设置</h2>
    <!-- 选择框，是否启用单用户登录限制 -->
    <div class="form">
      <el-form :model="formData" @change="handleFormChange">
        <el-form-item label="是否启用单用户登录限制">
          <el-switch v-model="formData.isSingleLogin" active-text="是" inactive-text="否" />
        </el-form-item>
        <!-- 可以添加更多表单项 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交设置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  isSingleLogin: false
  // 可以添加更多表单项
})

// 拿到form表单的值
function handleFormChange() {
  const { isSingleLogin } = formData.value
  console.log(isSingleLogin)
}

function onSubmit() {
  const { isSingleLogin } = formData.value
  console.log('点击了提交设置', isSingleLogin)
  // 提交数据给接口，告知是否启用单用户限制
}
</script>

<style lang="less" scoped>
.sets {
  .form {
    display: flex;
    flex-direction: column;

    .el-form-item {
      margin: 10px 0;
    }
  }

  .el-button {
    margin-top: 10px;
  }
}
</style>
