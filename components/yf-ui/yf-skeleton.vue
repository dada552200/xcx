<template>
	<view>
		<view v-if="loading" class="skeleton" :class="{ animate: animate }" :style="{ justifyContent: flexType}">
			<!-- 轮播图 -->
			<view v-if="imgTitle" class="skeleton-imgTitle"
				style="width: 95%;border-radius: 10px;height: 100px;display: block;"></view>
			<!-- 头像图 -->
			<view v-if="showAvatar && !imgTitle" class="skeleton-avatar" v-for="(item, index) in nameRow" :key="index"
				:class="[avatarShape]" :style="{ width: avatarSize, height: avatarSize}"></view>
			<!-- 文字条 -->
			<view class="skeleton-content" v-if="showTitle  && !imgTitle">
				<view class="skeleton-title" :style="{ width: titleWidth }"></view>
				<view class="skeleton-rows">
					<view class="skeleton-row-item" v-for="(item, index) in rowList" :key="index"
						:style="{ width: item.width }"></view>
				</view>
			</view>
		</view>
		<view v-else>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	const DEFAULT_ROW_WIDTH = '100%'
	const DEFAULT_LAST_ROW_WIDTH = '60%'

	export default {
		props: {
			// 是否显示占位图
			loading: {
				type: Boolean,
				default: true,
			},
			// 轮播图占位图
			imgTitle: {
				type: Boolean,
				default: false,
			},
			// 显示头像圆1个
			nameRow: {
				type: Number,
				default: 1,
			},
			// 排列方式 center 居中 √ space-between 两端对齐 √ space-around 子元素拉手分布 √ flex-start 居左 flex-end 居右
			flexType: {
				type: String,
				default: 'flex-start',
			},
			// 是否显示头像占位图
			showAvatar: {
				type: Boolean,
				default: true,
			},
			// 头像站占位图大小
			avatarSize: {
				type: String,
				default: '50px',
			},
			// 头像形状，可选值：round, square
			avatarShape: {
				type: String,
				default: 'round', // square | round
			},
			// 是否显示标题占位图
			showTitle: {
				type: Boolean,
				default: false,
			},
			// 标题占位图宽度
			titleWidth: {
				type: String,
				default: '40%',
			},
			// 标题段落占位图行数
			row: {
				type: Number,
				default: 3,
			},
			// 是否开启动画
			animate: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {}
		},
		computed: {
			rowList() {
				let list = []
				for (let i = 0; i < this.row; i++) {
					list.push({
						width: i === this.row - 1 && i !== 0 ? DEFAULT_LAST_ROW_WIDTH : DEFAULT_ROW_WIDTH,
					})
				}
				return list
			},
		},
	}
</script>

<style scoped>
	.skeleton {
		display: flex;
		margin: 16px;
		--bg-color: #f2f3f5;
		--row-height: 16px;
		--row-margin-top: 16px;
	}

	.skeleton-imgTitle {
		flex-wrap: wrap;
		background: var(--bg-color);
		margin: 10px auto;

	}

	.skeleton-avatar {
		flex-shrink: 0;
		background: var(--bg-color);
		margin-right: 8px;
	}

	.skeleton-avatar.round {
		border-radius: 50%;
	}

	.skeleton-content {
		width: 100%;
	}

	.skeleton-title {
		background-color: var(--bg-color);
		height: var(--row-height);
	}

	.skeleton-title+.skeleton-rows {
		margin-top: var(--row-margin-top);
	}

	.skeleton-rows {}

	.skeleton-row-item {
		background-color: var(--bg-color);
		height: var(--row-height);
	}

	.skeleton-row-item:not(:first-child) {
		margin-top: var(--row-margin-top);
	}

	.skeleton.animate {
		animation: skeleton-blink 1.2s ease-in-out infinite;
	}

	@keyframes skeleton-blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.6;
		}

		100% {
			opacity: 1;
		}
	}
</style>
