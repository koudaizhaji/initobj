<template>
	<view id="parentId" style="width: 100%;height: 100%;">
		<view class="content">
			<view class="bottomView">
				<scrollView height1="calc(100vh - 220upx - 90upx)" :isReloadComplete1="isReloadComplete"
					:isShowNodata1="isReloadComplete&&!isNoData" @downdata="downdata" @updata="updata"
					@onScroll="onScroll">
					<view class="content1" v-for="(item,index) in dataList" :key="index">
						<view class="item" @click="liveBtn(item)">
							<view class="content2" :style="{height:height+'upx'}">
								<view class="left">
									<view class="type">
										<text>类型</text>
									</view>
								</view>
								<view class="right">
									<view class="top"><text>{{item.title}}</text></view>
									<view class="center"><text>{{item.livedate}}</text></view>
									<view class="bottom"><text class="lf">{{item.price}}</text><text
											class="rh">{{item.liveStatus}}</text></view>
								</view>
							</view>
						</view>
					</view>
					<noview v-show="isNoData"></noview>
				</scrollView>
			</view>
		</view>
		<selfRoll :active="roll" :left="right" @scrollTo="scrollTo"></selfRoll>
		<ourLoading isFullScreen :active="active" text="loading..." color="#13b6ff" textColor="#13b6ff" />
	</view>
</template>

<script>
	// import noview from '../../../uni_modules/scrollView/components/no-data/back-view.vue';
	export default {
		data() {
			return {
				active: true,
				isReloadComplete: false,
				isNoData: true,
				page: 0,
				dataList: [
				],
				height: 180,
				systemHeight: 0, //系统的高度
				roll: false, //返回顶部
				right: '0upx', //右侧距离
				scrollTop: 0, //设置滚动的距离
			}
		},
		onReady() { //页面初次渲染完毕执行
			this.getInfo();
		},
		onLoad(paramater) {
			this.systemHeight = this.getSystemMsg('windowHeight');
			this.get_group_atricle_list();
		},
		methods: {
			getInfo() {
				this.right = this.getViewWidth('.search');
			},
			/*获取分组文章列表*/
			get_group_atricle_list() {
				this.page = 0;
				++this.page;
				setTimeout(() => {
					this.isNoData = false;
					this.dataList = this.dataList;
					this.active = false;
				}, 2000);

			},
			/*下拉刷新*/
			downdata() {
				/* console.log('下拉刷新'); */
				this.isNoData = true;
				this.page = 0;
				++this.page;

				/*
				这里面数据请求完成调用
				uni.$emit('downdataHD',{type:'down'});
				*/

				setTimeout(() => {
					this.isNoData = false;
					this.dataList = this.dataList;
					uni.$emit('downdataHD', {
						type: 'down'
					});
				}, 2000);

			},
			/*上拉加载*/
			updata() {
				/* console.log('上拉加载'); */
				/*
				这里面数据请求完成调用
				uni.$emit('updataHD',{type:'up'});
				*/
				++this.page;

				setTimeout(() => {
					if (this.page == 3) {
						this.isReloadComplete = true;
						this.isNoData = false;
					}
					this.dataList = this.dataList.concat(this.dataList);
					uni.$emit('updataHD', {
						type: 'up'
					});
				}, 2000);


			},
			//scrollview滚动
			onScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
				/* console.log("滚动距离为：" + e.scrollTop);
				console.log(this.getSystemMsg('windowHeight')); */
				if (e.scrollTop > this.systemHeight) {
					this.roll = true;
				} else {
					this.roll = false;
				}
			},
			/*scrollview返回远点*/
			scrollTo() {
				uni.$emit('goTop', '');
			},
			//获取系统参数
			getSystemMsg: function(key) {
				var result = '';
				console.log(key);
				uni.getSystemInfo({
					success: (res) => {
						console.log(res);
						if (key === 'windowHeight') {
							result = res.windowHeight;
						}
					}
				});
				return result;
			},
			//获取页面宽度
			getViewWidth: function(className) {
				// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
				var right = 0;
				const query = uni.createSelectorQuery().in(this);
				query.select(className).boundingClientRect(data => {
					right = (data.right) * 375 / data.width + 240 + 'upx';

				}).exec();
				// console.log(right);
				return right;
			},

		}
	}
</script>

<style lang="scss" scoped>
	#parentId{
		height: 100vh;
	}
	uni-page-body>uni-view:first-child {
		padding-bottom: 0px !important; //不然底部会空出来
	}

	page {
		position: relative;
		background-color: $uni-bg-color;
		overflow: hidden;

	}

	.content {
		width: auto;
		
		// margin: 90upx 15upx 0 15upx;
		box-sizing: border-box;
		// overflow: hidden;
		display: flex;
		flex-direction: column;

		// background-color: red;
	}

	

	.content>.bottomView {
		width: 100%;
		// height: 1600upx;
		box-sizing: border-box;
		position: relative;
		// background-color: red;
	}

	.content>.bottomView .content1 {
		width: 100%;

		display: flex;
		flex-wrap: wrap;

		box-sizing: border-box;

		// background-color: red;
	}

	.content>.bottomView .content1>.item {

		width: 100%;
		height: 220upx;

		display: flex;
		flex-wrap: wrap;

		box-sizing: border-box;

		background-color: $uni-bg-color;

		border-bottom: 1upx #f2f2f2 solid;
	}

	.content>.bottomView .content1>.item>.content2 {
		width: 100%;
		margin: 20upx 0;
		// background-color: red;
		display: flex;
		box-sizing: border-box;

		// overflow: hidden;
		white-space: nowrap;

	}

	.content>.bottomView .content1>.item>.content2>.left {
		width: 250upx;
		height: 100%;

		position: relative;

		// background-color: yellow;
	}

	.content>.bottomView .content1>.item>.content2>.left>.picture {
		width: 100%;
		height: 100%;
	}

	.content>.bottomView .content1>.item>.content2>.left>.icon {
		width: 50px;
		height: 50px;

		position: absolute;
		z-index: 3;
		top: 0;
		left: 0;
	}

	.content>.bottomView .content1>.item>.content2>.left>.type {
		position: absolute;
		z-index: 3;
		width: 90upx;
		height: 40upx;
		right: 0;
		top: 20upx;
		background-color: rgba($color: #000000, $alpha: 0.3);

		display: flex;
		align-items: center;
		justify-content: center;

		border-top-left-radius: 20upx;
		border-bottom-left-radius: 20upx;

	}

	.content>.bottomView .content1>.item>.content2>.left>.type>text {
		font-size: 26upx;
		color: $uni-bg-color;
	}

	.content>.bottomView .content1>.item>.content2>.right {

		height: 100%;

		display: flex;
		flex-direction: column;
		overflow: hidden;

		box-sizing: border-box;
		flex: 1;


		margin-left: 20upx;

		// background-color: blue;


	}

	.content>.bottomView .content1>.item>.content2>.right>.top {
		width: 100%;
		height: 50%;
		display: flex;
		white-space: nowrap;

		// background-color: yellow;

		box-sizing: border-box;
	}

	.content>.bottomView .content1>.item>.content2>.right>.top>text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		box-sizing: border-box;

		font-size: 34upx;

		color: $uni-text-color;

	}

	.content>.bottomView .content1>.item>.content2>.right>.center {
		width: 100%;
		height: 25%;

		display: flex;
		white-space: nowrap;

		// background-color: yellow;

		box-sizing: border-box;
	}

	.content>.bottomView .content1>.item>.content2>.right>.center>text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		box-sizing: border-box;

		width: 100%;

		font-size: 28upx;

		color: $uni-text-color-grey;
	}

	.content>.bottomView .content1>.item>.content2>.right>.bottom {
		width: 100%;
		height: 25%;

		// background-color: yellow;

		display: flex;
		align-items: flex-end;

		margin: 0;
	}

	.content>.bottomView .content1>.item>.content2>.right>.bottom>.lf {
		flex: 1;

		font-size: 34upx;

		color: #f74163;
	}

	.content>.bottomView .content1>.item>.content2>.right>.bottom>.rh {
		font-size: 28upx;
		display: none;
	}
</style>
