<template>
	<view class="savepadding">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="学生管理" color="#fff"
				background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<view class="conten-wrap" v-if="list.length>0">
			<!-- 撑标题态栏 -->
			<yf-clear-bar />
			<!-- 列表 -->
			<yf-slide-list :list="list" :button="buttonList" @click="clickMethod" @change="changeMethod">
			</yf-slide-list>
			<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
		</view>
		<template v-else>
			<yf-default-page default-img="/static/commen/default_page2.png" default-text="暂时没有学生哦">
			</yf-default-page>
		</template>
		<view class="button-wrap savebottom">
			<yf-button type="gradual-2" size="block" @click="jumpTo('students-addStudents',{type:'add'})">添加学生
			</yf-button>
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
				list: [{
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
					},
				],
				buttonList: [{
					title: '删除',
					background: '#FF3C3C'
				}],
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.loadList(); //加载列表
		},
		computed: {
			...mapState(['userInfo'])
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.loadList(); //加载列表
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				let self = this
				console.log('点击删除')
				if (button.title === '删除') {
					uni.showModal({
						title: '',
						content: '确定要删除该信息吗？',
						confirmText: '删除',
						confirmColor: '#ff3b32',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								self.list.splice(index, 1)
								uni.showToast({
									icon: "success",
									title: '操作成功!',
									duration: 2000
								});
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			clickMethod(data) {
				console.log('点击行回调', data)
			},
			jumpTo(url, data) {
				this.$Router.navigateTo(url, data);
			},
			//加载列表
			loadList() {
				let that = this;
				let _params = {
					mobile: that.userInfo.mobile
				};
				that.$apis
					.studentsList(_params)
					.then(result => {
						let _data = result;
						console.log(_data);
						if (_data.code === 200) {
							//判断是否有数据，有则取数据
							if (_data.data && _data.data.length > 0) {
								that.list = _data.data;
							} else {
								that.list = [];
							} 
						} else if (_data.code === 2007) {
							that.list = [];
						}
					})
					.catch(err => {});
			},
		}
	}
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
		padding-bottom: 120rpx;
	}

	.button-wrap {
		width: 100%;
		padding: 0 66rpx;
		position: fixed;
		left: 0;
		z-index: 10;
	}
</style>
