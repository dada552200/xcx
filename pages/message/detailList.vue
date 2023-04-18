<template>
	<view class="savepadding">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="待处理" color="#fff" background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<view class="conten-wrap" v-if="list.length > 0">
			<!-- 撑标题态栏 -->
			<yf-clear-bar />
			<!-- 列表 -->
			<view class="list-wrap" v-for="(item, index) of list" :key="index">
				<view class="yf-flex-left top-title">
					<view class="top-title-text1">请假时间</view>
					<view class="top-title-text2">5月20日 9:00-18:00</view>
				</view>
				<view class="list-content">
					<view class="content-title">
						<text class="hint">*</text>
						请假理由
					</view>
					<view class="content-text">
						带小孩去亲戚家参加牛逼的家庭聚会，超级无敌重要的那种望批准！带小孩去亲戚家参加牛逼的家庭聚会，超级无敌重要的那种望批准！带小孩去亲戚家参加牛逼的家庭聚会，超级无敌重要的那种望批准！带小孩去亲戚家参加牛逼的家庭聚会，超级无敌重要的那种望批准！
					</view>
					<view class="content-title">
						<text class="hint">*</text>
						申请时间
					</view>
					<view class="content-text">
						5月19号 13:43:12
						<image src="/static/commen/check_icon1.png" mode=""></image>
					</view>
					<view class="content-line"></view>
					<view class="content-title">
						审批人
						<text class="teacher-name">张老师</text>
					</view>

					<view class="reason-text">驳回理由</view>
					<view class="content-text reason-content">由于国内疫情不断，不建议走亲串友。</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<template v-else>
			<yf-default-page default-img="/static/commen/default_page1.png" default-text="暂时没有待处理哦"></yf-default-page>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					id: 1,
					image: '../../static/slide-list/logo.png',
					title: '张三',
					rightDetail: '2019-03-18',
					detail: 'XXXXXXXXXXXXXXXXXXX公司',
					isShare: true,
					slide_x: 0
				},
				{
					id: 2,
					surname: '李',
					title: '李二',
					rightDetail: '2019-03-17',
					detail: 'XXXXXXXXXXXXXXXXXXX公司',
					isShare: false,
					slide_x: 0
				},
				{
					id: 3,
					// surname: '王',
					title: '王五',
					rightDetail: '2019-03-18',
					// detail: 'XXXXXXXXXXXXXXXXXXX公司',
					isShare: true,
					slide_x: 0
				}
			]
		};
	},
	methods: {
		jumpTo(url, data) {
			this.$Router.navigateTo(url, data);
		}
	}
};
</script>

<style lang="scss">
.custom {
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
}

.conten-wrap {
	position: relative;
	padding: 32rpx 32rpx 0;
	width: 100%;
	.list-wrap {
		width: 100%;
		border-radius: 28rpx;
		box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
		margin-bottom: 16rpx;
		.top-title {
			padding-left: 58rpx;
			position: relative;
			height: 98rpx;
			border-radius: 28rpx 28rpx 0 0;
			background: #e7e7e7;
			&::after {
				content: '';
				width: 8rpx;
				height: 26rpx;
				background: linear-gradient(224deg, #2681fb 0%, #159dff 100%);
				border-radius: 4rpx;
				position: absolute;
				left: 40rpx;
				top: 36rpx;
			}
			.top-title-text1 {
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
				line-height: 30rpx;
			}
			.top-title-text2 {
				margin-left: 10rpx;
				font-size: 30rpx;
				color: #666666;
				line-height: 30rpx;
			}
		}
		.list-content {
			padding: 0 42rpx 32rpx;
			.content-title {
				font-size: 30rpx;
				margin-top: 32rpx;
				line-height: 30rpx;
				.hint {
					color: #ff3c3c;
					font-size: 30rpx;
				}
				.teacher-name {
					font-size: 30rpx;
					margin-left: 20rpx;
					color: #666666;
				}
			}
			.content-text {
				font-size: 30rpx;
				color: #666666;
				margin-top: 28rpx;
				line-height: 48rpx;
				position: relative;
				image {
					width: 160rpx;
					height: 160rpx;
					position: absolute;
					right: 16rpx;
					bottom: -20rpx;
				}
			}
			.content-line {
				border-bottom: 2rpx solid #f2f2f2;
				width: 100%;
				margin-top: 32rpx;
			}
			.reason-text {
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
				line-height: 30rpx;
				margin-top: 60rpx;
			}
			.reason-content {
				color: #ff3c3c;
			}
		}
	}
}
</style>
