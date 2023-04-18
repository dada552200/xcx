<template>
	<view class="card-wrap" @click="studentInfo?'':jumpTo('students-index')">
		<image src="/static/commen/image.jpg" mode="" class="card-bg"></image>
		<view class="card-content">
			<view class="card-content-title1 yf-flex-left">
				<view class="card-line"></view>领取专属电子校园卡
			</view>
			<view class="card-content-title2">
				开启智能校园2.0
			</view>
			<view class="card-content-but yf-flex-center" :class="{'butcolor':isshow}">
				{{studentInfo?'点击查看':'立即领取'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				isshow: false, //
			};
		},
		computed: {
			...mapState(['studentInfo'])
		},
		methods:{
			// 跳转页面
			jumpTo(url, params) {
				this.$Router.navigateTo(url, params);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.card-wrap {
		width: 686rpx;
		height: 200rpx;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 34rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 28rpx;
		margin: 16rpx auto 0;
		position: relative;
		overflow: hidden;

		.card-bg {
			width: 100%;
			height: 100%;
		}

		.card-content {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			padding: 24rpx 38rpx;

			.card-line {
				width: 8rpx;
				height: 20rpx;
				background: #FF584A;
				border-radius: 6rpx;
				margin-right: 10rpx;
			}

			.card-content-title1 {
				color: #333333;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bold;
			}

			.card-content-title2 {
				font-size: 24rpx;
				color: #666666;
				line-height: 24rpx;
				margin-top: 16rpx;
			}

			.card-content-but {
				width: 152rpx;
				height: 60rpx;
				border-radius: 28rpx;
				font-size: 24rpx;
				font-weight: 600;
				color: #FFFFFF;
				background: #FF584A;
				margin-top: 22rpx;
			}

			.butcolor {
				border: 1rpx solid #FF584A;
				color: #FF584A;
				background: #FFF;
			}
		}
	}
</style>
