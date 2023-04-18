<template>
	<view class="savepadding">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="请假管理" color="#fff" background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<view class="conten-wrap" v-if="list.length > 0">
			<!-- 撑标题态栏 -->
			<yf-clear-bar />
			<!-- 列表 -->
			<view class="list-wrap" v-for="(item, index) of list" :key="index">
				<view class="yf-flex-left top-title">
					<view class="yf-flex-1 top-title-text1">请假审批通知</view>
					<view class="top-title-text2" >查看详情</view>
					<uni-icons type="arrowright"  color="#2582fb" ></uni-icons>
				</view>
				<view class="conceal2 list-content">本校研究决定，针对今日疫情及国家卫健委通知，对端午3天假期做如下处理，将于6月1将于6月1将于6月1将于6月1将于6月1将于6月1</view>
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
			], 
			loadingType: 'more'
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
		padding: 28rpx 40rpx 40rpx;
		border-radius: 28rpx;
		box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
		margin-bottom: 16rpx;
		.top-title {
			padding-left: 20rpx;
			position: relative;
			margin-bottom: 26rpx;
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
			.top-title-text1 {
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
				line-height: 30rpx;
			}
			.top-title-text2 {
				font-size: 26rpx;
				color: #2582fb;
				line-height: 26rpx;
			} 
		}
		.list-content {
			color: #999999;
			font-size: 30rpx;
			line-height: 50rpx;
		}
	}
}
</style>
