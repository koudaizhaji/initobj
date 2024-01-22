<template>
	<view class="list">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
				error-text="请求失败，点击重新加载" @load="onLoad">
				<!-- <van-cell v-for="item in list" :key="item.id" >
					<view class="title">{{item.title}}</view>
					<lazy-component>
					  <image :src="item.url" v-lazy="item.url"></image>
					</lazy-component>
					
				</van-cell> -->
				<list-item v-for="item in list" :key="item.id" :itemData="item"></list-item>
			</van-list>
		</van-pull-refresh>
	</view>
</template>

<script>
	import ListItem from './list-item.vue'
	export default {
		components:{ListItem},
		props: {
			tabs: {
				type: Object,
				required: true
			},
		},
			
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
				error: false,
			};
		},
		methods: {
		 async onLoad() {
				setTimeout(() => {
					if (this.refreshing) {
						this.list = [];
						this.refreshing = false;
					}

					for (let i = 0; i < 10; i++) {
						this.list.push({
							"id":this.list.length + 1,
							"title":`${this.list.length + 1}-的内容`,
							"url":`https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/400/300`
						});
					}
					this.loading = false;

					if (this.list.length >= 20) {
						this.finished = true;
					}
				}, 1000);

			},
			onRefresh() {
				// 清空列表数据
				this.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.onLoad();
			},
		},
		
	};
	
	
</script>

<style scoped lang="scss">
	// .list {
	// 	position: relative;
	// 	left: 0;
	// 	right: 0;
	// 	top: 90px;
	// 	bottom: 50px;
	// 	overflow-y: auto;
	// }
</style>