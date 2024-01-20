<template>
	<view>
		<view class="nonedate">
			<view class="center">
				<image src="../../static/noview.png"></image>
				<text>{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'noview',
		props:{
			title1:{
				type:String,
				default:'暂无结果',
			}
		},
		watch:{
			title1(value){
				this.title = value;
			},
		},
		data() {
			return {
				title:this.title1,
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.nonedate{
		background-color: $uni-bg-color;
		
		width: 100%;
		height:calc(100vh + 70upx);
		
		display: flex;
	}
	.nonedate .center{
		
		margin-top: 250upx;
		width: 100%;
		height: 500upx;
		
		// background-color: blue;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.nonedate .center image{
		width: 400upx;
		height: 300upx;
		
		margin-bottom: 30upx;
	}
	.nonedate .center text{
		color: $uni-text-color-grey;
		
		font-size: 36upx;
	}
</style>
