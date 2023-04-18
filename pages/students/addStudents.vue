<template>
	<view class="savepadding">
		<view class="custom" :style="{ background: 'linear-gradient(224deg, #2681FB 0%, #159DFF 100%)' }">
			<uni-nav-bar :status-bar="true" :fixed="false" leftIcon="arrowleft" title="学生管理" color="#fff"
				background-color="rgba(255,255,255,0)"></uni-nav-bar>
		</view>
		<!-- 撑标题态栏 -->
		<yf-clear-bar />
		<form @submit="formSubmit">
			<view class="conten-wrap">
				<view class="from-wrap">
					<view class="yf-flex-left from-item">
						<view class="from-name">学校</view>
						<picker @change="bindPickerChange" :value="schoolIndex[0]" :data-num="0" name="schoola"
							:range="schoolArray[0]" range-key="name" mode="selector" class="yf-flex-right from-content">
							<view class="conceal1">
								{{ schoolIndex[0]&&schoolIndex[0]>=0&&schoolArray[0][schoolIndex[0]].name?schoolArray[0][schoolIndex[0]].name:'请选择学校' }}
							</view>
						</picker>
						<uni-icons type="arrowright" class="from-icon" size="20"></uni-icons>
					</view>
					<view class="yf-flex-left from-item">
						<view class="from-name">校区</view>
						<picker @change="bindPickerChange" :value="schoolIndex[1]" :data-num="1" name="schoolb"
							:range="schoolArray[1]" range-key="name" mode="selector" class="yf-flex-right from-content">
							<view class="conceal1">
								{{ schoolIndex[1]&&schoolIndex[1]>=0&&schoolArray[1][schoolIndex[1]].name?schoolArray[1][schoolIndex[1]].name:'请选择校区' }}
							</view>
						</picker>
						<uni-icons type="arrowright" class="from-icon" size="20"></uni-icons>
					</view>
					<view class="yf-flex-left from-item">
						<view class="from-name">班级</view>
						<picker @change="bindPickerChange" :value="schoolIndex[2]" :data-num="2" name="schoolc"
							:range="schoolArray[2]" range-key="name" mode="selector" class="yf-flex-right from-content">
							<view class="conceal1"> 
								{{ schoolIndex[2]&&schoolIndex[2]>=0&&schoolArray[2][schoolIndex[2]].name?schoolArray[2][schoolIndex[2]].name:'请选择班级' }}
							</view>
						</picker>
						<uni-icons type="arrowright" class="from-icon" size="20"></uni-icons>
					</view>
				</view>
				<view class="from-wrap">
					<view class="yf-flex-left from-item">
						<view class="from-name">姓名</view>
						<input type="text" :value="param.name" name="name" class="from-content" placeholder="请填写学生姓名" />
					</view>
					<view class="yf-flex-left from-item">
						<view class="from-name">头像</view>
						<view class="yf-flex-right from-content">
							<image src="/static/commen/add_user.png" mode=""></image>
						</view>
						<uni-icons type="arrowright" class="from-icon" size="20"></uni-icons>
						<input type="idcard" :value="param.head_image" name="head_image" v-show="false" />
					</view>
					<view class="yf-flex-left from-item">
						<view class="from-name">身份证号码</view>
						<input type="idcard" :value="param.card_number" name="card_number" class="from-content" placeholder="请填写身份证号码" />
					</view>
					<view class="yf-flex-left from-item">
						<view class="from-name">学工号</view>
						<input type="number" value="" class="from-content" placeholder="请填写学工号" />
					</view>
				</view>
			</view>
			<view class="button-wrap savebottom">
				<yf-button type="gradual-2" size="block" form-type="submit">立即添加</yf-button>
				<!-- <button  form-type="submit">立即添加</button> -->
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolArray: [], //下标0学校1校区2班级
				schoolIndex: [], //下标0学校1校区2班级
				typelist: {}, //学生身份类型列表
				param: {
					card_number: "3333", //身份证
					name: "", //学生姓名
					identity_type: "",
					identity_title: "",
					organization: "", //AA/BB/CC组织架构
					head_image: "", //head_image
					gender: "", //性别
					grade: "", //年级 
				}
			};
		},
		onLoad() {
			//学生身份类型列表
			// this.getTypeList();
			// 组织架构学校班级校区
			this.organizationList();
		},
		methods: {
			jumpTo(url, data) {
				this.$Router.navigateTo(url, data);
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var formdata = e.detail.value;
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			bindPickerChange: function(e) {
				console.log('picker1发送选择改变，携带值为', e.currentTarget.dataset.num);
				console.log('picker1发送选择改变，携带值为', e.target.value);
				let _num=e.currentTarget.dataset.num;//第几个选择器
				let _index = e.target.value;
				this.schoolIndex[_num] = _index; 
				if(_num<2){
					this.organizationList(this.schoolArray[_num][_index].orgId, _num+1);
				}
				this.$forceUpdate();
			}, 
			// 组织架构学校班级校区
			//orgId=0查全部
			organizationList(orgId = 0, index = 0) {
				let that = this;
				that.$apis
					.organizationList({
						parentId: orgId
					})
					.then(result => {
						let _data = result;
						console.log(_data);
						if (_data.code === 200) {
							//判断是否有数据，有则取数据 
							that.schoolArray[index] = _data.data;
							this.$forceUpdate();
						}
					})
					.catch(err => {});
			},
			// 学生身份类型列表
			// getTypeList() {
			// 	let that = this;
			// 	that.$apis
			// 		.studentsTypeList({})
			// 		.then(result => {
			// 			let _data = result;
			// 			console.log(_data);
			// 			if (_data.code === 200) {
			// 				//判断是否有数据，有则取数据
			// 				that.typelist = _data.data;
			// 			}
			// 		})
			// 		.catch(err => {});
			// },
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

	.content {
		width: 100%;
		height: 100vh; //高度必须是固定的值
		overflow-y: auto;
	}

	.conten-wrap {
		position: relative;
		padding: 32rpx 32rpx 120rpx;
		width: 100%;

		.from-wrap {
			width: 100%;
			padding: 10rpx 42rpx;
			border-radius: 28rpx;
			box-shadow: 0 4rpx 34rpx 0 rgba(0, 0, 0, 0.08);
			margin-bottom: 12rpx;

			.from-item {
				height: 98rpx;
				border-bottom: 2rpx solid #f2f2f2;

				.from-name {
					color: #999999;
					flex: 1;
					font-size: 30rpx;
				}

				.from-content {
					text-align: right;
					width: 380rpx;
					font-size: 30rpx;
					align-items: center;

					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}

					.conceal1 {
						max-width: 380rpx;
						font-size: 30rpx;
					}
				}

				.from-icon {
					margin-left: 20rpx;
				}
			}
		}

		.from-wrap .from-item:last-child {
			border: none;
		}
	}

	.button-wrap {
		width: 100%;
		padding: 0 66rpx;
		position: fixed;
		left: 0;
		z-index: 10;
		bottom: 20rpx;
	}
</style>
