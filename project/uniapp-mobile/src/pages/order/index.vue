<template>
	<view style="height: 100vh;">
		<!--顶部导航栏-->
		<scroll-view class="scroll-view_H" scroll-x="true" :show-scrollbar="false" >
			<view class="scroll-view-item_H" v-for="(tab,index) in navigationbarDataList" :key="tab.id" :id="tab.id" @tap="checkIndex(index)">
          <text :class="navIndex==index ? 'activite' : ''">{{tab.title}}</text>
			</view>
		</scroll-view>

		<!-- 内容 -->
		<swiper :current="navIndex" @change="tabChange" class="content">
			<swiper-item class="swiper_item " v-for="(tab) in navigationbarDataList" :key="tab.id" :id="tab.id">
				<component :is="tab.componentName"></component>
			</swiper-item>
			
		</swiper>

	</view>
</template>

<script>
import { navigationbarDataList} from './data';
import whole from './component/whole.vue';  
import obligation from './component/obligation.vue';  
import tobeshipped from './component/tobeshipped.vue';  
import tobereceived from './component/tobereceived.vue';  
import tobeevaluated from './component/tobeevaluated.vue';  
import expired from './component/expired.vue';  

	export default {
		components: {  
			whole,  
			obligation,  
			tobeshipped,  
			tobereceived,  
			tobeevaluated,  
			expired,  
  },  
		data() {
			return {
				scrollTop: 0,
				navIndex: 0,
        navigationbarDataList,
			}
		},
		methods: {
			checkIndex(index) {
				this.navIndex = index;
			},
			//滑动切换swiper
			tabChange(e) {
				const navIndex = e.detail.current
				this.navIndex = navIndex
			},
		}
	}
</script>

<style scoped lang="scss">
	.activite {
    display: inline-block;
		color: #b51f33;
    border-bottom: 2px solid #b51f33;
    height: 50rpx;
    padding: 10px 0 0 0;
	}
	.content {
		height: 200vh;
		background-color: #F6F6F6;
		color: red;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		color: black;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 20%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
    font: 1000 14px bold;
    height: 100%;
	}
  ::v-deep .uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
  display: none;
}
// .swiper_item{
// 	height: 100vh;
// }
</style>

