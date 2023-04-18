<template>
	<view class="user-wrap">
		<view class="user-content">
			<view class="top-content">
				<view class="top-content-item1" v-if="!hasLogin&&!hasMobile">
					<!-- 未登录v-if="canIUseGetUserProfile" -->
					<view class="top-item1-title">欢迎使用金证智校</view>
					<view class="yf-flex-center top-item1-btn">一键登录</view>
				</view>
				<view class="yf-flex-vertical top-content-item2" v-else-if="hasLogin&&!studentInfo"
					@click="jumpTo('students-index')">
					<!-- 授权手机号 -->
					<image src="/static/commen/add_user.png" mode=""  ></image>
					<view class="top-content-item2-text">绑定学生</view>
				</view>
				<view class="top-content-item3" v-else-if="hasLogin&&hasMobile&&studentInfo">
					<!-- 登录了 -->
					<view class="yf-flex user-info-wrap">
						<image src="/static/commen/add_user.png" mode="aspectFill" class="user-img"></image>
						<view class="yf-flex-1 user-info-content">
							<view class="yf-flex-left user-info-name">
								姬雁刚
								<image src="/static/commen/user_cheak.png" mode="" class="user-cheak-img" ></image>
							</view>
							<view class="user-info-class">瑞金第一中学沙洲坝校区</view>
							<view class="user-info-class">初二(12)班</view>
						</view>
					</view>
					<view class="yf-flex-left fun-wrap">
						<view class="yf-flex-1 fun-item" @click="jumpTo('students-userInfo')">
							<image src="/static/commen/user_info_icon1.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">个人信息</view>
						</view>
						<view class="line-border"></view>
						<view class="yf-flex-1 fun-item" @click="jumpTo('message-list')">
							<image src="/static/commen/user_info_icon2.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">待处理</view>
							<tui-badge type="danger" absolute :scaleRatio="0.8" translateX="40%" top="-10rpx"
								right="74rpx">99</tui-badge>
						</view>
						<view class="line-border"></view>
						<view class="yf-flex-1 fun-item">
							<image src="/static/commen/user_info_icon3.png" mode="" class="fun-item-img"></image>
							<view class="fun-item-text">校园码</view>
						</view>
					</view>
				</view>
			</view>
			<view class="yf-flex bottom-content">
				<view class="yf-flex-1 yf-flex-vertical bottom-content-item">
					<view class="bottom-item-num">0.00</view>
					<view class="bottom-item-text">今日消费(元)</view>
				</view>
				<view class="line-border"></view>
				<view class="yf-flex-1 yf-flex-vertical bottom-content-item">
					<view class="bottom-item-num">0.00</view>
					<view class="bottom-item-text">本月消费(元)</view>
				</view>
			</view>
		</view>
		<template v-if="!hasLogin">
			<button class="login-button" @click="getUserProfile" v-if="canIUseGetUserProfile">授权登录</button>
			<button class="login-button" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true"
				v-else>授权登录</button>
		</template>
		<button class="login-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
			v-if="hasLogin&&!hasMobile">授权手机号</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				canIUseGetUserProfile: false // 是否可用wx.getUserProfile
			};
		},
		computed: {
			...mapGetters(['hasMobile', 'hasLogin']),
			...mapState(['userInfo', 'studentInfo'])
		},
		created() {
			if (uni.getUserProfile) {
				// 是否可用wx.getUserProfile
				this.canIUseGetUserProfile = true;
			}
		},
		methods: {
			...mapMutations(['SET_USERINFO', 'SET_TOKEN']), 
			// 跳转页面
			jumpTo(url, params) {
				this.$Router.navigateTo(url, params);
			},
			wxGetUserInfo(res) { //旧版登录兼容
				let that = this;
				console.log(res)
				// if (!res.detail.iv) {
				// 	that.$Router.reLaunch('tabBar-index');
				// 	return false;
				// }
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('-------获取code-------');
						console.log(loginRes.code);
						uni.getUserInfo({
							withCredentials: true,
							success: function(res) {
								console.log('-------获取用户基本信息和加密数据-------');
								console.log(res);
								that.$apis
									.authLogin({
										code: loginRes.code,
										userInfo: res.rawData
									})
									.then(result => {
										uni.hideLoading();
										let _data = result;
										console.log(_data);
										if (_data.code === 200) {
											that.SET_TOKEN(_data.data.token);
											that.loadUserInfo(); //加载基本信息
										} else {
											that.$api.msg(_data.message);
										}
									})
									.catch(err => {
										uni.hideLoading();
									});
							}
						});
					}
				});
			},
			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				const that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.getUserProfile({
					desc: '用于完善会员资料哦~', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: function(res) {
						console.log('-------获取用户基本信息和加密数据-------');
						console.log(res);
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log('-------获取code1-------');
								console.log(loginRes);
								console.log(loginRes.code);
								that.$apis
									.authLogin({
										code: loginRes.code,
										userInfo: res.rawData,
									})
									.then(result => {
										uni.hideLoading();
										const _data = result;
										// console.log(_data);
										// console.log(_data.code == 2101);
										if (_data.code === 200) {
											that.SET_TOKEN(_data.data.token);
											that.loadUserInfo(); // 加载基本信息 
										}
									})
									.catch((msg) => {
										setTimeout(() => {
											uni.hideLoading();
										}, 1500);
									});
							}
						});
					},
					fail: function() {
						uni.hideLoading();
					}
				});
			},
			// 加载基本信息
			loadUserInfo() {
				const that = this;
				that.$apis.memberInfo().then(result => {
					const _data = result;
					console.log(_data);
					if (_data.code === 200) {
						that.SET_USERINFO(_data.data);
						// that.redirectTo();
					}
				});
			},
			getPhoneNumber(e) {
				let that = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					console.log('用户拒绝提供手机号');
				} else {
					console.log('用户同意提供手机号');
					uni.login({
						provider: 'weixin',
						success({
							errMsg,
							code
						}) {
							if (errMsg == 'login:ok') {
								//解密手机号需要的参数
								let params = {
									code: code,
									iv: e.detail.iv,
									encryptedData: e.detail.encryptedData
								};
								that.$apis
									.getWxPhone(params)
									.then(result => {
										uni.hideLoading();
										let _data = result;
										console.log(_data);
										if (_data.code === 200) {
											// that.$api.msg("授权成功~");
											that.loadUserInfo(); //加载基本信息
										} else {
											that.$api.msg(_data.message);
										}
									})
									.catch(err => {
										uni.hideLoading();
									});
							}
						}
					});
				}
			},
		}
	};
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
						font-weight: bold;

						&::after {
							content: '';
							width: 8rpx;
							height: 26rpx;
							background: linear-gradient(224deg, #2681fb 0%, #159dff 100%);
							border-radius: 4rpx;
							position: absolute;
							left: 0;
							top: 4rpx;
						}
					}

					.top-item1-btn {
						width: 200rpx;
						height: 70rpx;
						background: linear-gradient(224deg, #2681fb 0%, #159dff 100%);
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
					position: relative;

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

					.confirm-btn {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
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
							border: 1rpx solid #cccccc;
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
				background: #ffffff;
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
					border: 1rpx solid #cccccc;
					margin-top: 6rpx;
				}
			}
		}
	}

	.login-button {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10000;
		opacity: 0;
	}
</style>
