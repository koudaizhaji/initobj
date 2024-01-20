# 简介
uniapp

本插件适用方便提示请求的信息，使用起来方便，可以后期二期开发

这是一个项目下载地址链接 [github](https://github.com/lizhizhong/popView)

# 兼容说明
适合所有前端组件


# 导入
```
import popview4 from '@/components/pop-view/pop-view4.vue'
```


# 方法说明

| 方法 | 名  | 说明 |
| :-----| ----: | :----: |
| success(content) | 成功 | content参数成功提示信息 |
| error(content) | 失败 |  content参数失败提示信息 |
| warn(content) | 警告 |  content参数警告提示信息 |

# 使用案例
```
<template>
	<view class="content">
		<text class="success" @click="success">成功</text>
		<text class="error" @click="error">失败</text>
		<text class="warn" @click="warn">警告</text>
		<popview4 ref="popview4"></popview4>
	</view>
</template>

<script>
	import popview4 from '@/components/pop-view/pop-view4.vue'
	export default {
		components: {
		    popview4
		  },
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			success(){
				this.$refs['popview4'].success('成功');
			},
			error(){
				this.$refs['popview4'].error('失败');
			},
			warn(){
				this.$refs['popview4'].warn('警告');
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	text {
		font-size: 36rpx;
		margin-top: 20upx;
		font-size: 30upx;
		color: #fff;
		padding: 15upx 20upx;
	}
	.content .success{
		background-color: #1afa29;
	}
	.content .error{
		background-color: #d81e06;
	}
	.content .warn{
		background-color: #f4ea2a;
	}
	
</style>

```




