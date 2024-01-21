<template>
  <div class="MdPreview">
    <div class="boxLeft">
      <sidebar class="desc-sidebar" :treeList="classList" @nodeClick="handleNodeClick" :showLevel="3" />
    </div>
    <div class="boxCenter" id="main">
      <div class="authorInfo">
        <div class="title">{{ state.Article.title }}</div>
        <div class="info">
          <div class="name">作者：{{ state.Article.author }}</div>
          <div class="time">发布时间：{{ formatTime(state.Article.createdAt) }}</div>
        </div>
      </div>
      <div class="grid-wapper">
        <div class="grid-view">
          <Viewer ref="markDownRef" :locale="zh" :value="value" :plugins="plugins" />
        </div>
      </div>
    </div>
    <div class="boxRight">
      <div class="catalog">
        <div class="catalogue">目录</div>
        <div class="titleBox">
          <a v-for="(item, index) in cateList" :key="index"
            :class="[{ active: anchor == index }, item.tagName + '-class']" class="marker-item"
            @click="scrollToSection('head-' + index, index)">{{ item.text }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, toRaw,toRef, toRefs, markRaw, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { Viewer } from '@bytemd/vue-next'
import { getProcessor } from 'bytemd'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import breaks from '@bytemd/plugin-breaks'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css' // IDo同款样式
import { findIndex } from 'lodash'
import sidebar from './components/sidebar.vue'
import useMarkdownStore from '@/stores/template/markdown/markdown'
import mockData from './data/mock.js'
import { storeToRefs } from 'pinia'
const markdownStore = useMarkdownStore()
const {classList} = storeToRefs(markdownStore)
const pluginsList = [gfm(), gemoji(), highlight(), frontmatter(), mediumZoom(), breaks()]
/*
 *@Description: 状态初始化
 *@MethodAuthor: 挽歌
 *@Date: 2024-1-10
 */

const state = reactive({
  value: '',
  plugins: markRaw(pluginsList),
  zh: zhHans,
  cateList: [], // 目录内容
  offsetTopList: [], //文档流中锚点距离顶部距离集合
  anchor: 0,
  Article:{}
})

const { anchor, value, plugins, zh, markDownRef, cateList } = toRefs(state)

onMounted(async () => {
  let res = await markdownStore.getMdClassAction()
  classList.value = res
  // 默认加载第一条数据
  state.Article = toRef(res[0].children[0])
  state.value =state.Article.content
  getCataLogData()
  nextTick(() => {
    transformToId()
    // 获取内容的所有锚点距离顶部的距离
    getCalcLateTop()
    // 监听页面滚动获取当前第几个锚点
    window.addEventListener('scroll', scrollHandle)
    window.onresize = () => {
      getCalcLateTop()
    }
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})

const handleNodeClick = (node) => {
  let list=classList.value
  for(let i=0;i<list.length;i++){
    for(let j=0;j<list[i].children.length;j++){
      if(list[i].children[j].id==node.id){
        state.Article=list[i].children[j]
        state.value =state.Article.content
        getCataLogData()
      }
    }
  }
}
/*
 *@Description: 获取目录
 *@MethodAuthor: 挽歌
 *@Date: 2024-1-10
 */
const getCataLogData = () => {
  getProcessor({
    plugins: [
      {
        rehype: p =>
          p.use(() => tree => {
            console.log('asjdbhasbdhasbdhasd',tree);
            if (tree && tree.children.length) {
              // console.log('111',tree)
              createCataLog(tree)
            }
          }),
      },
    ],
  }).processSync(state.value)
}

const createCataLog = tree => {
  const items = []
  tree.children
    .filter(v => v.type == 'element')
    .forEach(node => {
      if (node.tagName === 'h2' && node.children.length > 0) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        })
      }
      if (node.tagName === 'h1' && node.children.length > 0) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        })
      }
      if (node.tagName === 'h3' && node.children.length > 0) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        })
      }
      if (node.tagName === 'h4' && node.children.length > 0) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        })
      }
      if (node.tagName === 'h5' && node.children.length > 0) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        })
      }
    })
  // console.log('222',items);
  state.cateList = items
}

const stringifyHeading = node => {
  let result = ''
  node.children.forEach(item => {
    if (item.type == 'text') {
      result += item.value
    }
  })
  return result
}
/*
 *@Description: 设置锚点ID
 *@MethodAuthor: 挽歌
 *@Date: 2024-1-10
 */
const transformToId = () => {
  const dom = document.querySelector('.markdown-body')
  let children = Array.from(dom.children)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const tagName = children[i].tagName
      if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3'|| tagName === 'H4'|| tagName === 'H5') {
        const index = findIndex(state.cateList, v => v.text === children[i].textContent)
        if (index >= 0) {
          children[i].setAttribute('id', `head-${index}`)
        }
      }
    }
  }
}
/**
 * 目录与标题联动问题
 * 1:点击目录滚动到锚点
 * 2:监听滚动-获取滚动位置最近的标签-做目录联动
 **/
const scrollToSection = (sectionId, index) => {
  state.anchor = index
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
const getCalcLateTop = () => {
  const mainEl = document.querySelector('#main')
  state.offsetTopList = state.cateList.map((item, index) => {
    const element = document.querySelector(`#head-${index}`)
    let top = element?element.offsetTop:0
    return {
      // offsetTop: index === 0 ? mainEl.offsetTop : top,
      anchor: index,
    }
  })
}
const scrollHandle = () => {
  const curScrollTop = document.documentElement.scrollTop
    || window.pageYOffset
    || document.body.scrollTop

  let flag = true
  const len = state.offsetTopList.length
  const min = state.offsetTopList[0].offsetTop
  // 滚动的距离 小于 第一个锚点距离顶部的距离
  if (curScrollTop < min) {
    state.anchor = 0
    return
  }
  // 滚动的距离 与 全部锚点距离顶部距离的集合 比较 获取最近的锚点标识
  for (let i = len - 1; i >= 0; i--) {
    const curReference = state.offsetTopList[i].offsetTop // 当前参考值
    if (flag && curScrollTop >= curReference - 100) {
      flag = false
      state.anchor = state.offsetTopList[i].anchor
    }
  }
}
function formatTime(timeString) {
  if(!timeString){
    return ''
  }
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}
</script>
<style lang="less" scoped>
.MdPreview {
  display: flex;
  height: 100%;

  .boxLeft,
  .boxCenter,
  .boxRight {
    box-sizing: border-box;
  }

  .boxLeft {
    width: 200px;
    height: 95%;
    padding: 20px 10px 10px;
    margin: 20px;
    overflow: auto;
    font-size: 16px;
    line-height: 1em;
    color: #4a4a4a;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .boxCenter {
    width: 60%;
    height: 100vh;
    padding: 20px;
    margin: 10px 0;
    overflow: auto;
    font-size: 16px;
    line-height: 1.8em;
    .authorInfo {
      height: auto;
      width: 100%;
      margin: 30px 0px 20px 0px;

      .title {
        font-size: 36px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 40px;
      }

      .info {
        display: flex;
        justify-content: space-between;

        .name {
          color: #4a4a4a;
        }

        .time {
          color: #999;
          margin-right: 10px;
        }
      }
    }

    &:deep(.bytemd) {
    height: calc(100vh - 200px);
  }

    .grid-wapper {
      display: flex;
      align-items: flex-start;
      justify-content: center;

      .grid-view {
        width: 100%;
      }
    }
  }

  .boxRight {
    width: 320px;
    height: 100vh;
    padding: 20px;
    overflow: auto;
    font-size: 16px;
    line-height: 1.8em;
    color: #4a4a4a;
    background-color: #f5f7fa;
    &::-webkit-scrollbar { /* WebKit 浏览器 */
    width: 0.5px; /* 设置滚动条宽度 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 设置滚动条背景颜色 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff; /* 设置滚动条的颜色 */
  }
    .marker-item.h1-class{
      padding-left: 0px !important;
    }
    .marker-item.h2-class{
      padding-left: 8px !important;
    }
    .marker-item.h3-class{
      padding-left: 16px !important;
    }
    .marker-item.h4-class{
      padding-left: 24px !important;
    }
    .marker-item.h5-class{
      padding-left: 32px !important;
    }
    .catalog {
      height: auto;
      padding: 0 15px 20px;
      padding-bottom: 50px;
      line-height: 1.5em;
      background-color: #fff;
      border-radius: 5px;

      ::-webkit-scrollbar {
        display: none;
      }

      .catalogue {
        padding: 15px 0;
        padding-left: 20px;
        margin-bottom: 8px;
        font-size: 20px;
        color: #3c4f54;
        border-bottom: 1px solid #e6eced;
      }

      .titleBox {
        height: auto;
        padding-left: 5px;
        margin-top: 20px;
        overflow: auto scroll;
      }
    }

    .marker-item {
      display: block;
      height: 34px;
      overflow: hidden;
      line-height: 34px;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: #428beb;
      }

      &.h3-class {
        padding-left: 15px;
      }

      &.active {
        color: #1e80ff !important;
      }
    }
  }
}
</style>
