<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    <slot></slot>
  </el-button>
  <el-dialog v-model="dialogFormVisible" :title="options.action">
    <el-form :model="form">
      <el-form-item :label="options.title" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题/名称" />
      </el-form-item>
      <el-form-item :label="options.desc" :label-width="formLabelWidth">
        <el-input v-model="form.desc" autocomplete="off" placeholder="请输入描述"/>
      </el-form-item>
      <el-form-item v-if="Atype==='1'" label="文章分类" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择文章分类">
          <el-option v-for="item in mdType" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add(Atype)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref , defineProps,onMounted } from 'vue'
import {findMdClass,addMd, addMdClass} from '@/services/markdown/markdown'
let mdType=[]
onMounted(async()=>{
  let res=await findMdClass('1','10')
  for(let i=0;i<res.data.length;i++){
      mdType.push({
        id:res.data[i].id,
        name:res.data[i].name
      })
  }
})
const props=defineProps({
  options:{
    type:Object
  },
  content:{
    type:String,
    default:''
  },
  Atype:{
    type:String
  }
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  title: '',
  desc: '',
  type:'',
})

let add = async (type:string) => {
  let flag=type==='1'?'文章':'分类'
  if (form.title.trim() === '') {
    alert(`${flag}的标题不能为空`)
    return
  }
  if (form.desc.trim() === '') {
    alert(`${flag}的描述不能为空`)
    return
  }
  if(type==='1'){
    if (props.content.trim() === '') {
    alert('文章的内容不能为空')
    return
  }
  let formData = {
    title: form.title,
    author: '挽歌',
    desc: form.desc,
    content: props.content,
    classId: form.type
  }
  try {
    let res = await addMd(formData)
    form.title = ''
    form.desc = ''
    console.log('文章存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
  }else{
    let formData = {
    name: form.title,
    desc: form.desc,
    status:'1',
    type:'1',
    userId: '2'
  }
  // console.log('formData', formData);
  try {
    let res = await addMdClass(formData)
    form.title = ''
    form.desc = ''
    console.log('分类存储结果', res);
  } catch (error) {
    console.log('err', error);
  }
  }
}
</script>
<style scoped>
.el-button,
.el-button:active,
.el-button:hover,
.el-button.is-text:not(.is-disabled):focus,
.el-button.is-text:not(.is-disabled):hover {
  padding: 20px 30px;
  margin: 0 10px;
  font-size: 16px;
  color: #fff;
  background-color: #1d7dfa;
  border: none;
  border-radius: 2px;
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

.el-dialog__footer,
.el-dialog {
  text-align: center !important;
}
</style>
