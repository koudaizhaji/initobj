<template>
  <el-container>
      <el-aside width="200px" class="left-nav">
        <div class="fz16px ml-10px font-700 mb-10px">目录</div>
        <el-tree :data="mdClassList" :render-content="renderContent" @node-click="handleNodeClick" class="custom-tree"/>
      </el-aside>
      <el-main class="ml-200px">
        <MdPreview
          :model-value="state.text"
          :editor-id="state.id"
          :theme="state.theme"
        />
      </el-main>
      <el-aside width="200px">
        <div class="float-view">
        <MdCatalog
          class="sider-div"
          ref="siderDivRef"
          :style="{ top: siderStyle.top }"
          :editor-id="state.id"
          :scroll-element="scrollElement"
          :theme="state.theme"
          :offsetTop = 300
          />
      </div>
      </el-aside>
    </el-container>


</template>
<script setup lang="ts">
import { reactive,ref,onBeforeUnmount,onMounted,computed } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import useMarkdownStore from "@/stores/template/markdown/markdown"

const markdownStore = useMarkdownStore()


interface Tree {
  label: string
  children?: Tree[]
}

const siderDivRef = ref({})
// 使用 reactive 创建响应式对象
const siderStyle = reactive({
      top: '50%',
});

// 滚动触发
function handleScroll(){
  // const oDiv = siderDivRef.value;
  const iTarget = window.scrollY
  console.log('iTarget滑动的高度',iTarget)
  if(iTarget>3000){
    // console.log('iTarget滑动超过5000')
    siderStyle.top = 100- iTarget/15 +'px';
  }else{
    siderStyle.top = '50%'
  }
}
// 树形渲染

const renderContent = (h, { node, data, store }) => {
  // console.log('data.level',node,data)
  if(node.level === 2){
    return h('div',{class:"labelClass"},[
        h('span', {color:"pink"},data.label),
        h('div', { style: { color: '#ccc', fontSize: '12px' } }, data.description),
      ]);
  }
  return h('div',[
        h('span', {},data.label),
        h('div', {}, data.description),
      ]);
    };

const state = reactive({
  theme: '',
  text: '# Hi，欢迎使用笔记的新老朋友\n\n\n## 我是谁\n`熟悉掘金的朋友`可能知道，掘金的浏览器插件中有一个笔记的功能，该功能自2021年10月上线以来，深受众多掘友喜爱，期间也收到了不少掘友的反馈，比如此前页面抽屉式的交互不方便、没有web版、App里也找不到入口等等。这些反馈产品经理一直有认真记录整理，终于到今天，**我以全新的姿态来和你见面啦**！\n\n我是一款专门为掘友打造的学习记录工具，旨在帮助掘友在社区或其他学习场景下便捷记录学习内容，同时**支持内容的多端同步**，助力大家随时随地实现记录笔记的需求。\n\n## 如何使用\n\n### 浏览器插件端\n\n**1. 安装掘金浏览器插件后，点击浏览器右上角的icon，面板中即包含笔记入口**\n\n\n\n**2. 打开掘金浏览器插件，切换到「工具模式」，点击「快捷工具」版块即可看到「笔记入口」**\n\n**3. 阅读内容时，选中需要记录/引用的内容，即可出现笔记的气泡提示（该入口支持在插件设置中关闭）**\n\n\n\n\n**4. 在网页中点击鼠标右键弹出的面板中也支持快捷记录**\n\n\n\n**5. 在任意网页双击「jj」快捷键，唤出快捷搜索框，输入「note」即可快速唤出笔记**\n\n\n\n## Web端\n点击掘金主站头像，在下拉菜单中即可看到「闪念笔记」入口；\n\n### App端\n打开掘金App，点击「我」页面，在「更多功能」版块即可看到「闪念笔记」入口；\n\n ## 更多\n\n笔记在支持纯文本的基础上，支持切换到Markdown模式，例如常见的标题、加粗、斜体等文本格式，例如：\n\n# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n\n**这是一段字体加粗演示**\n\n*这是一段文本斜体演示* \n\n~~这是一段文本删除线演示~~\n\n> 这是一段引用内容演示\n\n ## 测试回显\n```\n* 无序列表项1\n* 无序列表项2\n* 无序列表项3\n\n1. 有序列表项1\n2. 有序列表项2\n3. 有序列表项3\n\n- [ ] todo1\n- [ ] todo2\n\n\n| 标题展示 |  |\n| --- | --- |\n|  表格内容展示  |\n\n\n---\n\n此外每条笔记支持用户自主添加标签，用于对内容进行归类筛选，插件、web、app三端内容云同步，满足大家在多场景的笔记需求；\n\n\n## 传送门\n更多功能欢迎大家体验❤\n* 浏览器插件，点击链接下载：https://juejin.cn/extension?utm_source=flash_note_web\n* App（扫码下载安装）：\n\n',
  id: 'my-editor',
});

const scrollElement = document.documentElement;
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  getMarkdownClass()
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleNodeClick = (data: Tree) => {
  console.log("点击的数据",data)
  if(data.level===2){
    state.text = data.content;
  }
  // state.text = data.label
}
// md分类参考数据
// const mdClassList: Tree[] = [
//   {
//     label: 'Level one 1',
//     children: [
//       {
//         label: 'Level two 1-1',
//         children: [
//           {
//             label: 'Level three 1-1-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Level one 2',
//     children: [
//       {
//         label: 'Level two 2-1',
//         children: [
//           {
//             label: 'Level three 2-1-1',
//           },
//         ],
//       },
//       {
//         label: 'Level two 2-2',
//         children: [
//           {
//             label: 'Level three 2-2-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Level one 3',
//     children: [
//       {
//         label: 'Level two 3-1',
//         children: [
//           {
//             label: 'Level three 3-1-1',
//           },
//         ],
//       },
//       {
//         label: 'Level two 3-2',
//         children: [
//           {
//             label: 'Level three 3-2-1',
//           },
//         ],
//       },
//     ],
//   },
// ]
const mdClassList = ref<any>([])
// 获取文章内容的函数
// async function getMarkdownArticle(classId){
// }
// 获取文章分类
async function getMarkdownClass(){
  const res = await markdownStore.getMdClassAction("1","10")
  // console.log('res',res)
  state.text = res[0].children[3].content;
  // state.text = res.data.data[0].children[3].content;
  mdClassList.value = res.map((item)=>{
    // console.log("item",item)
    return {
      label: item.name,
      id:item.id,
      level:1,
      children: item.children.map((child:any)=>{
        return {
          label: child.title,
          id: child.id,
          level:2,
          description:child.desc,
          content:child.content
        }
      })
    }
  })
}
</script>

<style lang="less" scoped>
/deep/ .custom-tree .el-tree-node .is-focusable .el-tree-node__content {
  padding: 10px 0;
}
.left-nav{
  background-color: #fff;
  padding-top:20px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
.float-view{
  background-color: green;
  width: 200px;
  position: fixed;
  right: 0;
  top: 10%;
}
 .sider-div{
    width: 200px;
    border: 1px solid #ccc;
    background-color: #eee;
    position: absolute;
    right: 0;
    top: 10%;
  }
</style>
