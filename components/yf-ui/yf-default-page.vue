<template>
	<view class="yf-flex-vertical default-wrap">
		<image :src="defaultImg" mode="widthFix" class="default-img" :style="{width:`${defaultWidth}rpx`}"></image>
		<view class="default-text">
			{{defaultText}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			defaultImg:String,
			defaultText:String,
			defaultWidth:{
				type:Number,
				default:350
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.default-wrap{
		width: 100%;
		height: 100vh;
		justify-content: center;
		align-items: center;
		.default-text{
			color: #728295;
			font-size: 22rpx;
		}
	}
</style>
