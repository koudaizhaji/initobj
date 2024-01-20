<template>
	<view v-show="isActive">
		<view class="topView position" :style="{left:leftP}">
			<view class="top" @click="topBtn">
				<text>↑</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'roll',
		props: {
			active: Boolean,
			left:{
				type: String,
				default:'0upx'
			}
		},
		data() {
			return {
				isActive: this.active || false,
				leftP:this.left || '0upx',
			};
		},
		watch: {
			active(value) {
				this.isActive = value
			},
			left(value) {
				this.leftP = value
			}
		},
		methods: {
			//返回顶部
			topBtn() {
				this.isActive = false;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 60
				});
				/*如果不是page要实现这个方法，设置自己滚动的view*/
				this.$emit('scrollTo','');
			},
		}
	}
</script>

<style lang="scss">
	page {
		position: relative;

	}

	.topView {
		width: 100upx;
		height: 100upx;

		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.3);


		position: fixed;
		bottom: 200upx;
		// left: 40upx;
		z-index: 3;
		border-radius: 50upx;
		

		display: flex;
	}

	.topView .top {
		width: 100upx;
		height: 100%;

		// background-color: red;

		display: flex;
		justify-content: center;
		align-items: center;

	}

	.topView .top span {
		font-size: 50upx;
		color: #13b6ff;
	}
</style>
