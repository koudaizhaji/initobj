<template>
	<view>
		<van-tabs v-model:active="active" swipeable sticky offset-top="44px">
			<van-tab v-for="item in tabs" :title="item.title" :key="item.id">
				<list-model :tabs="tabs"></list-model>
			</van-tab>
		</van-tabs>
		
	</view>
</template>

<script>
	import {
		tabs,
		refresh
	} from './data/index.js';
	import ListModel from './components/list-model.vue'


	export default {
		components: {
			ListModel
		},
		data() {
			return {
				tabs,
				active: 0,
				
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .van-tab {
		color: black;
		width: 20%;
		font-weight: bold;
		font-family: "微软雅黑";
	}
	::v-deep .van-tab--active{
		color: #b51f33;
	}
	::v-deep .van-tabs__line{
		background-color: #b51f33;
	}
	::c-deep .van-tab__text{
		color: black;
	}
</style>