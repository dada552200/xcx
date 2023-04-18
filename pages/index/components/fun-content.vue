<template> 
		<!-- 九宫格 -->
		<view class="yf-flex-left fun-content-wrap">
			<view class="fun-content-item">
				<image src="/static/commen/index_icon1.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					人脸录入
				</view>
			</view>
			<view class="fun-content-item" @click="jumpTo('message-detailList')">
				<image src="/static/commen/index_icon2.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					请假管理
				</view>
			</view>
			<view class="fun-content-item" @click="jumpTo('consume')">
				<image src="/static/commen/index_icon3.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					消费记录
				</view>
			</view>
			<view class="fun-content-item">
				<image src="/static/commen/index_icon4.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					发票申请
				</view>
			</view>
			<view class="fun-content-item">
				<image src="/static/commen/index_icon5.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					联系客服
				</view>
			</view>
			<view class="fun-content-item">
				<image src="/static/commen/index_icon6.png" mode="" class="fun-content-img"></image>
				<view class="fun-content-text">
					消费设置
				</view>
			</view> 
		</view> 
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 跳转页面
			jumpTo(url, params) {
				this.$Router.navigateTo(url, params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fun-content-wrap{
		margin-top: 52rpx; 
		width: 100%; 
		flex-wrap: wrap; 
		.fun-content-item{
			width: 114rpx;
			text-align: center;
			margin-bottom: 52rpx;
			margin-left: 60rpx;
			.fun-content-img{
				width: 114rpx;
				height: 114rpx;
			}
			.fun-content-text{
				font-size: 24rpx;
				line-height: 30rpx;
			}
		}
	}
</style>
