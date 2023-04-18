<template>
	<view class="user-wrap">
		<view class="user-content">
			<view class="top-content">
				<view class="top-content-item1" v-if="type==1">
					<!-- 未登录v-if="canIUseGetUserProfile" -->
					<view class="top-item1-title">
						欢迎使用金证智校
					</view>
					<button class="yf-flex-center top-item1-btn">
						一键登录
					</button>
				</view>
				<view class="yf-flex-vertical top-content-item2" v-else-if="type==2" @click="jumpTo('students-index')">
					<!-- 授权手机号 -->
					<image src="/static/commen/add_user.png" mode=""></image>
					<view class="top-content-item2-text">
						绑定学生
					</view>
				</view>
				<view class="top-content-item3" v-else-if="type==3">
					<!-- 登录了 -->
					<view class="yf-flex user-info-wrap">
						<image src="/static/commen/add_user.png" mode="aspectFill" class="user-img"></image>
						<view class="yf-flex-1 user-info-content">
							<view class="yf-flex-left user-info-name">
								姬雁刚<image src="/static/commen/user_cheak.png" mode="" class="user-cheak-img"></image>
							</view>
							<view class="user-info-class">
								瑞金第一中学沙洲坝校区
							</view>
							<view class="user-info-class">
								初二(12)班
							</view>
						</view>
					</view>
					<view class="yf-flex-left fun-wrap">
						<view class="yf-flex-1 fun-item">
							<image src="/static/commen/user_info_icon1.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">
								个人信息
							</view>
						</view>
						<view class="line-border"></view>
						<view class="yf-flex-1 fun-item">
							<image src="/static/commen/user_info_icon2.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">
								待处理
							</view>
							<tui-badge type="danger" absolute :scaleRatio="0.8" translateX="40%" top="-10rpx"
								right="74rpx">
								99
							</tui-badge>
						</view>
						<view class="line-border"></view>
						<view class="yf-flex-1 fun-item">
							<image src="/static/commen/user_info_icon3.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">
								校园码
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="yf-flex bottom-content">
				<view class="yf-flex-1 yf-flex-vertical bottom-content-item">
					<view class="bottom-item-num">
						0.00
					</view>
					<view class="bottom-item-text">
						今日消费(元)
					</view>
				</view>
				<view class="line-border"></view>
				<view class="yf-flex-1 yf-flex-vertical bottom-content-item">
					<view class="bottom-item-num">
						0.00
					</view>
					<view class="bottom-item-text">
						本月消费(元)
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 2
			};
		},
		methods: {
			// 跳转页面
			jumpTo(url, params) {
				this.$Router.navigateTo(url, params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-wrap {
		padding: 32rpx 32rpx 0;
		position: relative;
		z-index: 2;
		width: 100%;

		.user-content {
			width: 100%;
			background: #fff;
			border-radius: 28rpx;
			box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
			overflow: hidden;

			.top-content {

				// 未登录
				.top-content-item1 {
					padding: 32rpx 32rpx 50rpx 32rpx;

					.top-item1-title {
						font-size: 34rpx;
						color: #333333;
						padding-left: 20rpx;
						position: relative;
						line-height: 34rpx;

						&::after {
							content: "";
							width: 8rpx;
							height: 26rpx;
							background: linear-gradient(224deg, #2681FB 0%, #159DFF 100%);
							border-radius: 4rpx;
							position: absolute;
							left: 0;
							top: 4rpx;
						}
					}

					.top-item1-btn {
						width: 200rpx;
						height: 70rpx;
						background: linear-gradient(224deg, #2681FB 0%, #159DFF 100%);
						box-shadow: 0px 4rpx 6rpx 0px rgba(23, 120, 218, 0.26);
						border-radius: 38rpx;
						color: #fff;
						font-size: 30rpx;
						margin-top: 46rpx;

						&::after {
							border: none;
						}
					}
				}

				// 登录没手机号
				.top-content-item2 {
					padding: 54rpx 0;
					justify-content: center;
					align-items: center;
					width: 100%;

					.top-content-item2-text {
						font-size: 30rpx;
						line-height: 30rpx;
						color: #666;
					}

					image {
						width: 84rpx;
						height: 84rpx;
						margin-bottom: 14rpx;
					}
				}

				// 已登录
				.top-content-item3 {
					padding: 32rpx 0;

					.user-info-wrap {
						padding: 0 32rpx;

						.user-img {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							overflow: hidden;
						}

						.user-info-content {
							padding-left: 32rpx;

							.user-info-name {
								font-size: 30rpx;
								line-height: 30rpx;
								padding-bottom: 20rpx;
							}

							.user-cheak-img {
								width: 30rpx;
								height: 30rpx;
								margin-left: 16rpx;
							}
						}

						.user-info-class {
							font-size: 26rpx;
							color: #999;
						}
					}

					.fun-wrap {
						margin-top: 38rpx;

						.line-border {
							width: 2rpx;
							height: 56rpx;
							border: 1rpx solid #CCCCCC;
						}

						.fun-item {
							text-align: center;
							position: relative;

							.fun-item-img {
								width: 60rpx;
								height: 60rpx;
							}

							.fun-item-text {
								margin-top: 6rpx;
								font-size: 24rpx;
								color: #666;
							}
						}
					}
				}
			}

			.bottom-content {
				width: 100%;
				height: 160rpx;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 34rpx 0px rgba(0, 0, 0, 0.08);
				border-radius: 28rpx;
				padding: 34rpx 0;

				.bottom-content-item {
					justify-content: center;
					align-items: center;

					.bottom-item-num {
						font-size: 52rpx;
						color: #333333;
						line-height: 52rpx;
						font-weight: bold;
					}

					.bottom-item-text {

						font-size: 24rpx;
						margin-top: 10rpx;
						color: #666;
					}
				}

				.line-border {
					width: 2rpx;
					height: 80rpx;
					border: 1rpx solid #CCCCCC;
					margin-top: 6rpx;
				}
			}
		}
	}
</style>
