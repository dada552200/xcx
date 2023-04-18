<template>
	<view class="savepadding content">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="个人信息" color="#fff" background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<!-- 撑标题态栏 -->
		<yf-clear-bar />
		<view class="conten-wrap">
			<view class="list-wrap">
				<view class="top-title">学生基本信息</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">姓名</view>
					<view class="conceal1 list-content">小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张小张</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">学生头像</view>
					<view class="conceal1 list-content"><image src="/static/commen/add_user.png" mode=""></image></view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">学校</view>
					<view class="conceal1 list-content">XX第一中学</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">校区</view>
					<view class="conceal1 list-content">XX校区</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">班级</view>
					<view class="conceal1 list-content">高三（1）班</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">学号</view>
					<view class="conceal1 list-content">000000</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">身份证号码</view>
					<view class="conceal1 list-content">小张</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">登记类型</view>
					<view class="conceal1 list-content">小张</view>
				</view>
			</view>
			<view class="list-wrap">
				<view class="top-title">班主任信息</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">姓名</view>
					<view class="conceal1 list-content">小张小张小张</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">联系方式</view>
					<view class="conceal1 list-content">小张</view>
				</view>
				<view class="yf-flex-left list-item">
					<view class="list-name">科目</view>
					<view class="conceal1 list-content">小张</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
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
.content {
	width: 100%;
	height: 100vh; //高度必须是固定的值
	overflow-y: auto;
}
.conten-wrap {
	position: relative;
	padding: 32rpx 32rpx 32rpx;
	width: 100%;
	.list-wrap {
		width: 100%;
		padding: 48rpx 42rpx 10rpx;
		border-radius: 28rpx;
		box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
		margin-bottom: 16rpx;
		.top-title {
			font-size: 30rpx;
			color: #333333;
			padding-left: 20rpx;
			position: relative;
			line-height: 34rpx;
			margin-bottom: 10rpx;
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
		.list-item {
			height: 98rpx;
			border-bottom: 2rpx solid #f2f2f2;
			.list-name {
				color: #999999;
				flex: 1;
				font-size: 30rpx;
			}
			.list-content {
				text-align: right;
				width: 380rpx;
				font-size: 30rpx;
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
				}
			}
		}
	}

	.list-wrap .list-item:last-child {
		border: none;
	}
}
</style>
