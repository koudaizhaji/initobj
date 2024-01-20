<template>
	<view style="height: 100%;width: 100%;">
		<view class="topView" v-show="isShowTopView">
			<image class="custom-refresher-top-image" src="../../static/reload.gif"></image>
			<text>{{refreshText[refreshStatus]}}</text>
		</view>
		<scroll-view :style="{height:height,width:'100%',}" :scroll-top="scrollTop" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="80" refresher-default-style="none"
			refresher-background="rgba(255,255,255,0)" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort" @scrolltolower="scrolltolower" @scroll="scroll">
			<view>
				<slot></slot>
			</view>
			<view v-show="isShowBottomView" class="bottomView">
				<!-- 转圈加载 -->
				<image class="loading-more-line-loading-image ..custom-refresher-bottom-image" :src="base64Flower">
				</image>
				<text>正在加载...</text>
			</view>
			<nodata v-show="isShowNodata"></nodata>
		</scroll-view>
	</view>
</template>

<script>
	const base64Flower =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAKlBMVEVHcEzDw8Ovr6+pqamUlJTCwsKenp61tbWxsbGysrLNzc2bm5u5ubmjo6MpovhuAAAACnRSTlMA/P79/sHDhiZS0DxZowAABBBJREFUWMPtl89rE0EUx7ctTXatB3MI1SWnDbUKPUgXqh4ED8Uf7KUVSm3ooVSpSii0Fn/gD4j4o+APiEoVmos9FO2celiqZVgwgaKHPQiCCkv+F99kM7Ozm5kxq1dfD91k9pPve9/3ZjbRNHHok/mKli4eIPNgSuRObuN9SqSEzM20iGnm0yIbqCuV7NSSSIV7uyPM6JMBYdeTOanh/QihJYZsUCSby+VkMj2AvOt0rAeQAwqE3lfKMZVlQCZk1QOCKkkVPadITCfIRNKxfoJI5+0OIFtJx14CMSg1mRSDko7VAfksRQzEbGYqxOJcVTWMCH2I1/IACNW0PWU2M8cmAVHtnH5mM1VRWtwKZjOd5JbF6s1IbaYqaotjNlPHgDAnlAizubTR6ovMYn052g/U5qcmOpi0WL8xTS/3IfSet5m8MEr5ajjF5le6dq/OJpobrdY0t3i9QgefWrxW9/1BLhk0E9m8FeUMhhXal499iD0eQRfDF+ts/tttORRerfp+oV7f4xJj82iUYm1Yzod+ZQEAlS/8mMBwKebVmCVp1f0JLS6zKd17+iwRKTARVg2SHtz3iEbBH+Q+U28zW2Jiza8Tjb1YFoYZMsJyjDqp3M9XBQdSdPLFdxEpvOB37JrHcmR/y9+LgoTlCFGZEa2sc6d4PGlweEa2JSVPoVm+IfGG3ZL037iV9oH+P+Jxc4HGVflNq1M0pivao/EopO4b/ojVCP9GjmiXOeS0DOn1o/iiccT4ORnyvBGF3yUywkQajW4Ti0SGuiy/wVSg/L8w+X/8Q+hvUx8Xd90z4oV5a1i88MbFWHz0WZZ1UrTwBGPX3Rat9AFiXRMRjoMdIdJLEOt2h7jrYOzgOamKZSWSNspOS0X8SAqRYmxRL7sg4eLzYmNehcxh3uoyud/BH2Udux4ywxFTc1xC7Mgf4vMhc5S+kSH3Y7yj+qpwIWSoPTVCOOPVthGx9FbGqrwFw6wSFxJr+17zeKcztt3u+2roAEVgUjDd+AHGuxHy2rZHaa8JMkTHEeyi85ANPO9j9BVuBRD2FY5LDMo/Sz/2hReqGIs/KiFin+CsPsYO/yvM3jL2vE8EbX7/Bf8ejtr2GLN65bioAdgLd8Bis/mD5GmP2qeqyo2ZwQEOtAjRIDH7mBKpUcMoApbZJ5UIxkEwxyMZyMxW/uKFvHCFR3SSmerHyDNQ2dF4JG6zIMpBgLfjSF9x1D6smFcYnGApjmSLICO3ecCDWrQ48geba9DI3STy2i7ax6WIB62fSyIZIiO3GFQqSURp8wCo7GhJBGwuSovJBNjb7kT6FPVnIa9qJ2Ko+l9mefGIdinaMp0yC1URYiwsdfNE45EuA5Cx9EhalfvN5s+UyItm81vaB3p4joniN+SCP7Qc1hblAAAAAElFTkSuQmCC';
	export default {
		name: 'scrollView',
		props: {
			height1: {
				type: String,
				default: '0upx'
			},
			scrollTop1: {
				type: Number,
				default: 0
			},
			isShowNodata1: {
				type: Boolean,
				default: false
			},
			isReloadComplete1: {
				type: Boolean,
				default: false
			}

		},
		data() {
			return {
				triggered: true,
				height: this.height1 || '0upx',
				scrollTop: 0,
				oldScrollTop: 0,
				refreshText: {
					soon: '哎呀，用点力继续下拉！',
					sure: '拉疼我了，松手刷新~ ~',
					refreshing: '正在刷新中...'
				},
				refreshStatus: 'soon',
				base64Flower: base64Flower,
				isShowBottomView: false, //是否显示底部正在加载
				isShowTopView: false, //是否显示顶部正在加载
				isShowNodata: this.isShowNodata1, //是否显示已经没有数据
				isReloadComplete: false, //数据是否加载完成

			};
		},
		watch: {
			height1(value) {
				this.height = value
			},
			isShowNodata1(value) {
				this.isShowNodata = value
			},
			isReloadComplete1(value) {
				this.isReloadComplete = value
			}
		},
		created() {
			uni.$on('downdataHD', this.recive)
			uni.$on('updataHD', this.recive)
			uni.$on('goTop', this.goTop);
		},
		beforeDestroy() {
			uni.$off('downdataHD', this.recive)
			uni.$off('updataHD', this.recive)
			uni.$off('goTop', this.goTop);
		},
		methods: {
			/*自定义下拉刷新控件被下拉*/
			onPulling(e) {
				/* console.log("onpulling", e);
				console.log('自定义下拉刷新控件被下拉') */
				this.isShowTopView = true;
				let deltaY = e.detail.deltaY;
				if (deltaY >= 80) {
					this.refreshStatus = 'sure';
				}
			},
			/*自定义下拉刷新被触发*/
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				this.$emit('downdata', '');
				/* setTimeout(() => {
									uni.hideLoading();
									this.triggered = false;
									this._freshing = false;
								}, 3000) */
			},
			/*上拉下拉刷新回调接收*/
			recive(e) {
				/* console.log('上拉下拉刷新回调接收') */
				if (e.type == 'down') {
					setTimeout(() => {
						uni.hideLoading();
					}, 0)
					this.triggered = false;
					this._freshing = false;
					/* console.log('自定义下拉刷新被触发')
					console.log('down'); */
					this.refreshStatus = 'refreshing';
					this.isShowTopView = false;
				}
				if (e.type == 'up') {
					setTimeout(() => {
						uni.hideLoading();
					}, 0);
					this.isShowBottomView = false;
					/* console.log('自定义上拉加载被触发')
					console.log('up') */
				}
			},
			/*自定义下拉刷新被复位*/
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				/* console.log("onRestore");
				console.log('自定义下拉刷新被复位') */
				this.refreshStatus = 'soon';
				this.isShowTopView = false;
			},
			/*自定义下拉刷新被中止*/
			onAbort() {
				/* console.log("onAbort");
				console.log('自定义下拉刷新被中止') */
			},
			/*滚动到底部*/
			scrolltolower() {
				/* console.log('滚动到底部') */
				if (this.isReloadComplete) {
					return;
				}
				this.isShowBottomView = true;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				this.$emit('updata', '');

			},
			/*滚动时触发*/
			scroll(e) {
				/* console.log('滚动时触发')
				console.log(e.detail) */
				//记录scroll  位置
				this.oldScrollTop = e.detail.scrollTop
				this.$emit('onScroll', e.detail);
			},
			goTop() {
				//视图会发生重新渲染
				this.scrollTop = this.oldScrollTop
				//当视图渲染结束 重新设置为0
				this.$nextTick(() => {
					this.scrollTop = 0
				});
			},
		}
	}
</script>

<style lang="scss">
	/*隐藏滚动条*/
	scroll-view ::-webkit-scrollbar {
	
	width: 0;
	
	height: 0;
	
	background-color: transparent;
	
	}
	page {
		width: 100%;
		position: relative;
	}

	.topView {
		width: 100%;
		height: 160upx;

		position: absolute;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.topView text {
		font-size: 25upx;
		color: $uni-text-color-disable;
	}

	.bottomView {
		width: 100%;
		height: 120upx;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottomView text {
		font-size: 25upx;
		color: $uni-text-color-disable;
	}

	.loading-more-line-loading-image {
		margin-right: 8rpx;
		width: 28rpx;
		height: 28rpx;
		/* #ifndef APP-NVUE */
		animation: loading-flower 1s steps(12) infinite;
		/* #endif */
	}

	.custom-refresher-top-image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 8rpx;
		/* #ifdef APP-NVUE */
		width: 80rpx;
		height: 80rpx;
		/* #endif */
	}

	.custom-refresher-bottom-image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 8rpx;
		/* #ifdef APP-NVUE */
		width: 50rpx;
		height: 50rpx;
		/* #endif */
	}

	@keyframes loading-flower {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}
</style>
