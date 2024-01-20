<template>
	<view>
	<view class="bottom">
		<view class="content">
			<text>我是有底线的</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: 'nodata',
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.bottom {
		width: 100%;
		height: 120upx;
	
		background-color: $uni-bg-color;
	}
	
	.bottom .content {
		width: 100%;
		height: 100%;
	
	
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.bottom .content text {
		color: $uni-text-color-disable;
	}
</style>
