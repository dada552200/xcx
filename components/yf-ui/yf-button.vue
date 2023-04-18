<template>
	<button class="yf-btn-class yf-btn"  :class="['yf-btn-'+size,plain?'yf-'+type+'-outline':`yf-${type}`,getDisabledClass(disabled,type),getShapeClass(shape,plain)]"
	 :hover-class="getHoverClass(disabled,type,plain)" :loading="loading" :disabled="disabled" :open-type="openType" @tap="handleClick"
	 @getuserinfo="bindgetuserinfo" :form-type="formType" v-if="!hidden">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: "yfButton",
		behaviors: ['uni://form-field-button'],
		props: {
			// primary, white, danger, warning, green, gray,gradual-1,gradual-2 
			type: {
				type: String,
				default: 'yf-gradual-2'
			},
			// block, mini, small group 
			size: {
				type: String,
				default: 'block'
			},
			// circle, square，rightAngle
			shape: {
				type: String,
				default: 'circle'
			},
			plain: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			openType: {
				type: String,
				default: ''
			},
			formType: {
				type: String,
				default: ''
			},
			hidden: {
				type: Boolean,
				default: false
			},
			bottom: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClick() {
				if (this.disabled) {
					return false;
				}
				this.$emit('click', {})
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
			getDisabledClass: function(disabled, type) {
				let className = '';
				if (disabled && type != 'white' && type != 'gray') {
					className = type.indexOf('gradual') > -1 ? `yf-${type}-disabled` : 'yf-dark-disabled';
				}
				return className;
			},
			getShapeClass: function(shape, plain) {
				let className = '';
				if (shape == 'circle') {
					className = plain ? 'yf-outline-fillet' : 'yf-fillet';
				} else if (shape == "rightAngle") {
					className = plain ? 'yf-outline-rightAngle' : 'yf-rightAngle';
				}
				return className;
			},
			getHoverClass: function(disabled, type, plain) {
				let className = '';
				if (!disabled) {
					className = plain ? 'yf-outline-hover' : `yf-${type}-hover`;
				}
				return className;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* color start*/

	.yf-primary {
		background: #FF5E00 !important;
		color: #fff;
	}

	.yf-danger {
		background: #EB0909 !important;
		color: #fff;
	}

	.yf-red {
		background: #e41f19 !important;
		color: #fff;
	}

	.yf-warning {
		background: #ff7900 !important;
		color: #fff;
	}

	.yf-green {
		background: #19be6b !important;
		color: #fff;
	}

	.yf-white {
		background: #fff !important;
		color: #333 !important;
	}

	.yf-gray {
		background: #D1D1D6 !important;
		color: #fff !important;
	}

	.yf-hover-gray {
		background: #f7f7f9 !important;
	}

	/* color end*/

	/* button start*/

	.yf-btn {
		width: 100%;
		position: relative;
		border: 0 !important;
		border-radius: 18rpx;
		display: inline-block;
		border: solid 1px #8e8e93;
	}

	.yf-btn::after {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.yf-btn-block {
		font-size: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.yf-white::after {
		border: 1px solid #eaeef1;
	}

	.yf-white-hover {
		background: #e5e5e5 !important;
		color: #2e2e2e !important;
	}

	.yf-dark-disabled {
		opacity: 0.6 !important;
		color: #fafbfc !important;
	}

	.yf-outline-hover {
		opacity: 0.5;
	}

	.yf-primary-hover {
		background: #FF3510 !important;
		color: #FFFFFF !important;
	}

	.yf-primary-outline::after {
		border: 1px solid #ff5d00 !important;
	}

	.yf-primary-outline {
		color: #ff5d00 !important;
		background: none;
	}

	.yf-danger-hover {
		background: #c80808 !important;
		color: #e5e5e5 !important;
	}

	.yf-danger-outline {
		color: #EB0909 !important;
		background: none;
	}

	.yf-danger-outline::after {
		border: 1px solid #EB0909 !important;
	}

	.yf-red-hover {
		background: #c51a15 !important;
		color: #e5e5e5 !important;
	}

	.yf-red-outline {
		color: #e41f19 !important;
		background: none;
	}

	.yf-red-outline::after {
		border: 1px solid #e41f19 !important;
	}

	.yf-warning-hover {
		background: #e56d00 !important;
		color: #e5e5e5 !important;
	}

	.yf-warning-outline {
		color: #ff7900 !important;
		background: none;
	}

	.yf-warning-outline::after {
		border: 1px solid #ff7900 !important;
	}

	.yf-green-hover {
		background: #16ab60 !important;
		color: #e5e5e5 !important;
	}

	.yf-green-outline {
		color: #44cf85 !important;
		background: none;
	}

	.yf-green-outline::after {
		border: 1px solid #44cf85 !important;
	}

	.yf-gray-hover {
		background: #d5d5d5 !important;
		color: #898989;
	}

	.yf-gray-outline {
		color: #999 !important;
		background: none !important;
	}

	.yf-white-outline {
		color: #fff !important;
		background: none !important;
	}

	.yf-gray-outline::after {
		border: 1px solid #8E8E93 !important;
	}

	.yf-white-outline::after {
		border: 1px solid #fff !important;
	}

	/*圆角 */

	.yf-fillet {
		border-radius: 45rpx;
	}

	.yf-white.yf-fillet::after {
		border-radius: 90rpx;
	}

	.yf-outline-fillet::after {
		border-radius: 90rpx;
	}

	/*平角*/
	.yf-rightAngle {
		border-radius: 0;
	}

	.yf-white.yf-rightAngle::after {
		border-radius: 0;
	}

	.yf-outline-rightAngle::after {
		border-radius: 0;
	}

	/*渐变 */

	.yf-gradual-1 {
		background: linear-gradient(90deg, #FF5936 0%, #FF3510 100%);
		color: #fff;
	}

	.yf-gradual-1-hover {
		color: #fff !important;
		background: linear-gradient(-90deg, #FF3510, #FF3510);
	}

	.yf-gradual-1-disabled {
		color: #fafbfc !important;
		background: linear-gradient(-90deg, #cad8fb, #c9d3fb);
	}
	
	.yf-gradual-2 {
		background: linear-gradient(224deg, #2681FB 0%, #159DFF 100%);
		color: #fff;
	}
	
	.yf-gradual-2-hover {
		color: #fff !important;
		background: linear-gradient(-90deg, #2681FB, #159DFF);
	}
	
	.yf-gradual-2-disabled {
		color: #fafbfc !important;
		background: linear-gradient(-90deg, #cad8fb, #c9d3fb);
	}

	/*不同尺寸 */

	.yf-btn-mini {
		width: auto;
		font-size: 28rpx;
		height: 56rpx;
		line-height: 56rpx;
	}

	.yf-btn-small {
		width: auto;
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.yf-btn-group { 
		font-size: 28rpx;
		height: 70rpx;
		line-height: 70rpx;
	}
	/* button end*/
</style>
