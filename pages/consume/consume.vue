<template>
	<view class="savepadding">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="消费记录" color="#fff" background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<view class="conten-wrap" v-if="list.length > 0">
			<!-- 撑标题态栏 -->
			<yf-clear-bar />
			<!-- 列表 -->
			<view class="list-wrap" v-for="(item, index) of list" :key="index">
				<view class="top-title">
					<view class="top-title-text1">2021年6月</view>
					<view class="top-title-text2">本月累计消费54元年6月</view>
				</view>
				<!-- 列表 -->
				<view class="yf-flex-between item" v-for="(items, indexs) of item" :key="indexs">
					<view class="item-left">
						<view class="conceal1 item-left-text">食堂档口食堂档口食堂档口食堂档口</view>
						<view class="item-left-date">2021-06-15 13:43:00</view>
					</view>
					<view class="item-right">
						<view class="item-right-text1">-5.20</view>
						<view class="item-right-text2" v-if="index > 0">
							<text>原价-6.00</text>
							已优惠0.80
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<template v-else>
			<yf-default-page default-img="/static/commen/default_page1.png" default-text="您还没有消费记录哦"></yf-default-page>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				[
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
				[
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
			],
			buttonList: [
				{
					title: '删除',
					background: '#FF3C3C'
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
		padding: 42rpx 40rpx 0;
		border-radius: 28rpx;
		box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
		margin-bottom: 32rpx;
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
				font-size: 36rpx;
				color: #333333;
				font-weight: bold;
				line-height: 36rpx;
			}
			.top-title-text2 {
				font-size: 26rpx;
				color: #999999;
				margin-top: 16rpx;
				line-height: 26rpx;
			}
		}
		.item {
			height: 146rpx;
			border-bottom: 2rpx solid #f2f2f2;
			.item-left {
				.item-left-text {
					font-size: 30rpx;
					color: #333330;
					line-height: 30rpx;
					width: 300rpx;
				}
				.item-left-date {
					font-size: 24rpx;
					color: #333330;
					margin-top: 24rpx;
				}
			}
			.item-right {
				text-align: right;
				.item-right-text1 {
					font-size: 36rpx;
					font-weight: bold;
					line-height: 52rpx;
				}
				.item-right-text2 {
					font-size: 26rpx;
					line-height: 26rpx;
					color: #999999;
					text {
						font-size: 26rpx;
						line-height: 26rpx;
						color: #999999;
						text-decoration: line-through;
						margin-right: 10rpx;
					}
				}
			}
		}
	}

	.list-wrap .item:last-child {
		border: none;
	}
}
</style>
