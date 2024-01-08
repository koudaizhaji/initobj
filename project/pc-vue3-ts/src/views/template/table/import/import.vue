<template>
  <div class="import-excel">
    <!-- <el-steps :active="1">
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
    </el-steps> -->
    <!-- <el-upload
      ref="upload"
      class="upload-demo"
      action="#"
      multiple
      :limit="3"
      :before-upload="beforeExcelUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleOnExceed"
      :file-list="fileList"
      :auto-upload="true"
      :http-request="handleHttpRequest"
    > -->
    <div class="handleBtn">
      <el-button size="small" type="primary" @click="downloadFile">下载模板</el-button>
      <el-upload
        ref="uploadRef"
        class="upload-demo pl-25px"
        action="#"
        multiple
        :limit="3"
        :before-upload="beforeExcelUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleOnExceed"
        :file-list="fileList"
        :auto-upload="true"
        :http-request="httpRequestFn"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
      <!-- <el-button size="small" type="success" @click="analyseUpload">读取数据</el-button> -->
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="exportExcel"
      >导出文件</el-button
    > -->
      <el-button class="w-150px pr-25px ml-25px" size="small" type="success" @click="handleSubmit"
        >确认无误，提交</el-button
      >
    </div>
    <div ref="container" class="container"></div>
  </div>
</template>
<script setup lang="ts">
import { analyseExcelToJson, exportExcelBySheets, generateExcelBySheet } from '@/utils/xlsx'
import { ref, getCurrentInstance } from 'vue'
import xlsx from 'xlsx'
import useSystemStore from '@/stores/base/system/system'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const systemStore = useSystemStore()
let fileList = []
let result = []
let workbook = null
let submitData = []
let { proxy } = getCurrentInstance()
let container = ref(null)

function exportExcel() {
  if (!result.length) {
    alert('请先读取数据')
    return
  }
  exportExcelBySheets(result[0])
}
// 移除
function handleRemove(file) {
  console.log('文件移除操作？', file)
  // const { uid } = file
  // for (let i = 0; i < fileList.length; i += 1) {
  //   const ele = fileList[i]
  //   if (uid === ele.uid) {
  //     fileList.splice(i, 1)
  //     break
  //   }
  // }
  // console.log(file, fileList)
  fileList = []
  submitData = []
  proxy.$refs.container.innerHTML = ''
}
// 预览
function handlePreview(file) {
  console.log('预览文件', file)
}
// 文件导入的入口操作 start
// 文件导入的操作入口
const httpRequestFn = (incomeFile) => {
  const { file } = incomeFile
  const { name } = file
  // 错误情况判断
  if (!file) {
    return false
  } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
    this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
    return false
  }
  fileList.push({ name, file })
  analyseUpload()
  excelToJsonFn(file)
}
// 下载文件
const downloadFile = async () => {
  try {
    // 从 ./data/ 目录中加载文件
    const filePath = './static/报名专业.xlsx'
    // 使用 fetch 获取文件内容
    const response = await fetch(filePath)
    const fileData = await response.blob()

    // 创建 Blob 对象和下载 URL
    const blob = new Blob([fileData], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)

    // 创建隐藏的 <a> 元素，设置下载属性，模拟点击下载
    const a = document.createElement('a')
    a.href = url
    a.download = '报名专业-模板.xlsx' // 设置下载的文件名
    a.style.display = 'none'

    document.body.appendChild(a)
    a.click()
    // 下载完成后移除 <a> 元素和 URL 对象
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
  }
}

// 读取的表格内容
async function analyseUpload() {
  console.log('点了读取表格')
  if (!fileList.length) {
    return
  }
  proxy.$refs.container.innerHTML = ''
  const promises = fileList.map(({ file }) => analyseExcelToJson(file))
  const results = await Promise.all(promises)
  result = results
  result.forEach((workbookItem) => {
    // console.log('workbook', workbook, fileList)
    workbook = workbookItem
    workbook.forEach((sheet) => {
      proxy.$refs.container.innerHTML += generateExcelBySheet(sheet)
    })
  })
}

// 表格转json
const excelToJsonFn = (file) => {
  const fileReader = new FileReader() // 读取文件
  fileReader.onload = (ev) => {
    try {
      const data = ev.target.result // 获取结果
      // 获取所有表的信息
      const workbook = xlsx.read(data, {
        type: 'binary', // 以字符编码的方式解析
        cellDates: true // 将excel中日期类型数据，转化为标准日期格式，而不是默认的数字格式
      })
      // 获取第一张表的表名
      const exlname = workbook.SheetNames[0]
      // 转换成json数据
      const exl = xlsx.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
      // 打印 ws 就可以看到读取出的表格数据
      // console.log('格式好的json', exl)
      submitData = exl
      // 数据处理
      // this.submit_from(exl)
    } catch (e) {
      console.log('error', e)
      return false
    }
  }
  fileReader.readAsBinaryString(file)
}
// 提交表格
const handleSubmit = async () => {
  if (fileList.length === 0 && submitData.length === 0) {
    alert('请先上传文件')
    return
  }
  console.log('submitData', submitData)
  const res = await systemStore.importExcel('joinField', { excelBody: submitData })
  console.log('res提交结果', res)
  if (res.code === 0) {
    ElMessageBox.alert(res.message, 'excel导入结果', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'OK',
      callback: (action: Action) => {
        // ElMessage({
        //   type: 'info',
        //   message: `action: ${action}`
        // })
        if (action === 'confirm' || action === 'cancel') {
          // 重置数据
          fileList = []
          submitData = []
          proxy.$refs.container.innerHTML = ''
          proxy.$refs.uploadRef.clearFiles()
          // vue3跳转vue指定页面
          window.location.href = '/#/order/setting/joinField'
        }
      }
    })
  }
}
// 文件导入的入口操作 end
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
.import-excel {
  .handleBtn {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
}
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
