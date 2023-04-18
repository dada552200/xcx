<template>
	<view class="content">
		<!-- 状态栏 -->
		<uni-status-bar />
		<image class="top-bg" src="/static/commen/index_bg.png"></image>
		<view class="yf-flex-left" :style="{ height: selectHeight + 'px' }" style="width: 100%;">
			<image class="index-logo" src="/static/commen/index_logo.png"></image>
		</view>
		<!-- 用户信息 -->
		<user-model />
		<!-- 轮播图 -->
		<view class="swiper-wrap">
			<swiper :autoplay="true" :interval="3000" :duration="500" :circular="true" class="swiper-content">
				<swiper-item>
					<image src="/static/commen/image.jpg" mode="widthFix" class="swiper-content-img"></image>
				</swiper-item>
				<swiper-item>
					<image src="/static/commen/image.jpg" mode="widthFix" class="swiper-content-img"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 会员卡 -->
		<user-card />
		<fun-content />
	</view>
</template>

<script>
	import userModel from './components/user-model.vue';
	import userCard from './components/user-card.vue';
	import funContent from './components/fun-content.vue';
	export default {
		components: {
			userModel,
			funContent,
			userCard
		},
		data() {
			return {
				selectHeight: 32,
				
			};
		},
		onLoad() {
			this.orderList();
		},
		methods: {
			// 加载基本信息
			orderList() {
				const that = this;
				that.$apis.smallBanner({
					cardNumber: 1
				}).then(result => {
					const _data = result;
					console.log(_data);
					if (_data.code === 200) {
						// that.SET_USERINFO(_data.result);
						// that.redirectTo();
					}
				});
			},
		}
	};
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100vh; //高度必须是固定的值
		overflow-y: auto;
	}

	.top-bg {
		height: 750rpx;
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.index-logo {
		height: 48rpx;
		width: 220rpx;
		margin: 0 0 0 32rpx;
		margin-top: 12px;
		position: relative;
		z-index: 3;
	}

	// 轮播图
	.swiper-wrap {
		margin-top: 16rpx;
		padding: 0 32rpx;

		.swiper-content {
			width: 100%;
			height: 200rpx;
			box-shadow: 0px 4rpx 34rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 28rpx;

			.swiper-content-img {
				width: 100%;
				height: 200rpx;
				border-radius: 28rpx;
			}
		}

	}
</style>
