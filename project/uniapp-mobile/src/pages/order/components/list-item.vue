<template>
	<view class="list-item">
		<view class="title">{{itemData.title}}</view>
		<lazy-component>
		  <image :src="itemData.url" v-lazy="itemData.url"></image>
		</lazy-component>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object,
				required: true
			},
		},
	}
</script>

<style>
</style>