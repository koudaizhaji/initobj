<template>
  <div class="import-excel">
    <el-upload ref="upload" class="upload-demo" action="#" multiple :limit="3" :before-upload="beforeExcelUpload"
      :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleOnExceed" :file-list="fileList"
      :auto-upload="true" :http-request="handleHttpRequest">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    <el-button size="small" type="success" @click="analyseUpload">读取数据</el-button>
    <el-button style="margin-left: 10px" size="small" type="success" @click="exportExcel">导出文件</el-button>
    <div ref="container" class="container"></div>
  </div>
</template>
<script setup>
import { analyseExcelToJson, exportExcelBySheets, generateExcelBySheet } from '@/utils/xlsx'
import { ref,getCurrentInstance } from 'vue'
let fileList = []
let result = []
let { proxy } = getCurrentInstance()
let container = ref(null)
async function analyseUpload() {
  if (!fileList.length) { return }
  proxy.$refs.container.innerHTML = ''
  const promises = fileList.map(({ file }) => analyseExcelToJson(file))
  const results = await Promise.all(promises)
  result = results
  result.forEach((workbook) => {
    console.log(workbook);
    workbook.forEach((sheet) => {
      proxy.$refs.container.innerHTML += generateExcelBySheet(sheet)
    })
  })
}
function exportExcel() {
  if (!result.length) {
    alert('请先读取数据')
    return
  }
  exportExcelBySheets(result[0])
}
function handleRemove(file) {
  const { uid } = file
  for (let i = 0; i < fileList.length; i += 1) {
    const ele = fileList[i]
    if (uid === ele.uid) {
      fileList.splice(i, 1)
      break
    }
  }
  console.log(file, fileList)
}

function handlePreview(file) {
  console.log(file)
}
function handleHttpRequest(incomeFile) {
  const { file } = incomeFile
  const { name } = file

  fileList.push({ name, file })
}
function beforeExcelUpload(file) {
  if (!file) {
    return false
  }
  if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
    alert('上传格式不正确，请上传 xls 或者 xlsx 格式')
    return false
  }
  return true
}
function handleOnExceed() {
  alert('文件超出个数限制')
}
</script>

<style lang="less" scoped>
.container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

:deep(th),
:deep(td) {
  border: 1px solid black;
}

:deep(table) {
  border-collapse: collapse;
}
</style>
