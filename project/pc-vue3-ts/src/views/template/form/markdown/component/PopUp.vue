<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    <slot></slot>
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="提交文章">
    <el-form :model="form">
      <el-form-item label="文章标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文章简介" :label-width="formLabelWidth">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文章分类" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择文章分类">
          <el-option label="私人空间" value="分类1" />
          <el-option label="公共空间" value="分类2" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  title: '',
  desc: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
})
</script>
<style scoped>
.el-button,.el-button:active,.el-button:hover,.el-button.is-text:not(.is-disabled):focus, .el-button.is-text:not(.is-disabled):hover{
  padding: 20px 30px;
    background-color:#1D7DFA;
    color: #fff;
    border-radius: 2px;
    border: none;
    font-size: 16px;
    margin: 0 10px;
}


/* .el-button--text {
  margin-right: 15px;
} */
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-dialog__footer,.el-dialog{
  text-align: center !important;
}
</style>
