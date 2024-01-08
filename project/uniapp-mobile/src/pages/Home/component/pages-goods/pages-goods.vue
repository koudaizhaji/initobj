<template>
  <view>
    <!-- 选项栏 -->
    <view>
      <view class="flex flex-justify-center flex-items-center mt-2 mb-2">
        <view class="blackBox" />
        <view class="ml-4 mr-4 font-size-4 font-bold">
          严选推荐
        </view>
        <view class="blackBox" />
      </view>
      <view class="flex justify-center bg-white pl-4 pr-4">
        <ul class="flex flex-justify-between w-100% h-12 p-0">
          <li v-for="item in props.optionList" :key="item.id" @click="change(item.id)">
            <view class="font-size-3.4 text-center mt-3 flex flex-items-center font-semibold">
              {{ item.title }}
              <view :class="item.icon" />
            </view>
          </li>
        </ul>
      </view>
    </view>
    <!-- 展示栏 -->
    <view class="flex w-100%">
      <view class="flex justify-center w-50% bg-white">
        <img src="@/static/images/demo/cate_04.png" alt="">
      </view>
      <view class="flex justify-center w-50% bg-white">
        <img src="@/static/images/demo/cate_06.png" alt="">
      </view>
    </view>
  </view>
</template>
      
<script setup>
import { reactive} from 'vue'
const props = defineProps({
  optionList: {
    type: Array,
    default: () => [],
  },
});

const change = (index) => {
    index === 1 && props.optionList[0].icon === 'i-mdi-chevron-down' ? props.optionList[0].icon = 'i-mdi-chevron-up' : props.optionList[0].icon = 'i-mdi-chevron-down';
    index === 2 && props.optionList[1].icon === 'i-mdi-chevron-down' ? props.optionList[1].icon = 'i-mdi-chevron-up' : props.optionList[1].icon = 'i-mdi-chevron-down';

};
</script>
      
<style lang="scss" scoped>
.blackBox {
  width: 12px;
  height: 3px;
  background-color: black;
}

li {
  list-style: none;
}
</style>
      