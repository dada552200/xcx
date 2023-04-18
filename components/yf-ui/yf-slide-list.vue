<template>
	<view>
		<view class="container">
			<view class="slide-box" v-for="(item, index) in listData" :key="index">
				<view class="slide-list" @touchstart="touchStart($event, index)" @touchend="touchEnd($event, index)"
					@touchmove="touchMove($event, index)" @tap="recover(index)"
					:style="{ transform: 'translate3d(' + item.slide_x + 'px, 0, 0)' }">
					<view class="now-message-info" @click="clickItemMethod(item)">
						<view class="user-wrap">
							<image src="/static/commen/add_user.png" mode="aspectFill" class="user-img"></image>
							<view class="yf-flex-1 user-info-content">
								<view class="yf-flex-left user-info-name">
									姬雁刚
								</view>
								<view class="user-info-class">
									瑞金第一中学沙洲坝校区
								</view>
								<view class="user-info-class">
									初二(12)班
								</view>
							</view>
						</view>
						<view class="add-card">已选</view>
						<image src="/static/commen/is_pick.png" mode="" class="add-img"></image>
					</view>

				</view>
				<view class="group-btn">
					<view class="btn-div" v-for="(value, key) in button" :key="key"
						@click="clickMethod(item, value, index)" :style="{background: value.background}">
						{{value.title}}
					</view>
				</view>
				<view class="list-item-border" v-if="border"></view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * m-slide-list 滑动操作列表
	 * @description 滑动操作列表组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=209
	 * @property {Array} list 数据源，格式为：[{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0},{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0}]
	 * @property {Array} button 按钮数据源，格式为：[{title: 'xxx', background:'xxx'},{title: 'xxx', background:'xxx'}]
	 * @property {Boolean} border 边框
	 */
	export default {
		name: 'mark-slide-list',
		props: {
			list: { //数据list
				type: Array,
				default () {
					return [];
				}
			},
			button: { //按钮数据list
				type: Array,
				default () {
					return [];
				}
			},
			border: { //边框
				type: Boolean,
				default: false
			}
		},
		computed: {
			windowWidth() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		data() {
			return {
				listData: [],
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				itemIndex: 0
			};
		},
		mounted() {
			this.listData = this.clone(this.list)
		},
		watch: {
			list: {
				handler: function(val, oldval) {
					this.listData = this.clone(this.list)
				},
				deep: true
			}
		},
		methods: {
			clone(data) {
				const type = typeof data
				let obj;
				if (type === 'array') {
					obj = [];
				} else if (type === 'object') {
					obj = {};
				} else {
					// 不再具有下一层次
					return data;
				}
				if (type === 'array') {
					for (let i = 0, len = data.length; i < len; i++) {
						obj.push(this.clone(data[i]));
					}
				} else if (type === 'object') {
					// 对原型上的方法也拷贝了....
					for (const key in data) {
						obj[key] = this.clone(data[key]);
					}
				}
				return obj;
			},

			// 滑动开始
			touchStart(e, index) {
				if (this.itemIndex == index) {
					this.itemIndex = index
				}
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.listData[index].slide_x;
				// 按钮宽度
				//#ifdef MP-WEIXIN
				uni.createSelectorQuery().in(this).selectAll('.group-btn').boundingClientRect(res => {
					if (res != null) {

						this.btnWidth = res[index].width * -1;
					}
				}).exec();
				//#endif
				//#ifdef H5 || APP-PLUS
				uni.createSelectorQuery()
					.selectAll('.group-btn')
					.boundingClientRect()
					.exec(res => {
						if (res[0] != null) {
							this.btnWidth = res[0][index].width * -1;
						}
					});
				//#endif
				// 记录上一次开始时手指所处位置
				this.startX = e.touches[0].pageX;
				// 记录上一次手指位置
				this.lastX = this.startX;
				//初始化非当前滑动消息列的位置			
				for (var i in this.listData) {
					if (index != i) {
						this.listData[i].slide_x = 0;
					}
				}
			},
			// 滑动中
			touchMove(e, index) {
				const endX = e.touches[0].pageX;
				const distance = endX - this.lastX;
				// 预测滑块所处位置
				const duang = this.listData[index].slide_x + distance;
				// 如果在可行区域内
				if (duang <= 0 && duang >= this.btnWidth) {
					this.listData[index].slide_x = duang;
				}
				// 此处手指所处位置将成为下次手指移动时的上一次位置
				this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
				let distance = 10;
				const endTime = e.timeStamp;
				const x_end_distance = this.startX - this.lastX;
				if (Math.abs(endTime - this.startTime) > 200) {
					distance = this.btnWidth / -2;
				}
				// 判断手指最终位置与手指开始位置的位置差距
				if (x_end_distance > distance) {
					this.listData[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.listData[index].slide_x = 0;
				} else {
					this.listData[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.listData[index].slide_x = 0;
			},
			/** 
			 * 点击按钮触发事件
			 * @param {Object} item 列表数据 
			 * @param {Object} buttonItem 按钮数据
			 * @param {Object} index 列表数据key
			 */
			clickMethod(item, buttonItem, index) {
				this.$emit("change", item, buttonItem, index)
			},
			/**
			 * 点击按钮触发事件
			 * @param {Object} item 列表数据 
			 */
			clickItemMethod(item) {
				this.$emit("click", item)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 16rpx 32rpx;
		width: 100%;

		.slide-box {
			width: 100%;
			box-shadow: 0px 4rpx 34rpx 0px rgba(0, 0, 0, 0.08);
			margin-bottom: 16rpx;
			position: relative;
			border-radius: 28rpx;

			.slide-list {
				transition: all 100ms;
				transition-timing-function: ease-out;
				width: 100%;
				height: 200rpx;
				position: relative;
				overflow: hidden;
				z-index: 3;

				.now-message-info {
					box-sizing: border-box;
					height: 200rpx;
					position: relative;

					.user-wrap {
						padding: 32rpx;
						width: 100%;
						height: 200rpx;
						background: #ffffff;
						display: flex;
						overflow: hidden;
						border-radius: 24rpx;

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
						}

						.user-info-class {
							font-size: 26rpx;
							color: #999;
						}  
					}

					.add-card {
						position: absolute;
						right: 10rpx;
						top: 14rpx;
						font-size: 24rpx;
						color: #fff;
						transform: rotate(45deg); 
						z-index: 2;
					}

					.add-img {
						width: 94rpx;
						height: 94rpx;
						position: absolute;
						right: 0;
						top: 0;
					}
					
				}


			}

			.group-btn {
				display: flex;
				flex-direction: row;
				height: 200rpx;
				min-width: 158rpx;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				z-index: 2;

				.btn-div {
					border-radius: 0 28rpx 28rpx 0;
					height: 200rpx;
					color: #fff;
					text-align: center;
					padding: 0 56rpx 0 88rpx;
					font-size: 26rpx;
					line-height: 200rpx;
					margin-left: -30rpx;
				}

				.top {
					background-color: #c4c7cd;
				}

				.removeM {
					background-color: #ff3b32;
				}
			}
		}
	}
</style>
