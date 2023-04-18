<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	view,
	text,
	cover-view,
	rich-text {
		color: #333;
	}

	page {
		background-color: #ffffff;
	}

	// ios底部安全距离-padding
	.savepadding {
		padding-bottom: constant(safe-area-inset-bottom)!important;
		padding-bottom: env(safe-area-inset-bottom)!important;
		box-sizing: content-box;
	}

	// ios底部安全距离-定位-bottom
	.savebottom {
		bottom: constant(safe-area-inset-bottom)!important;
		bottom: env(safe-area-inset-bottom)!important;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: 0.6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	// 文本超出省略号 
	// 超出隐藏1
	.conceal1 {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	// 超出隐藏2
	.conceal2 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		white-space: normal;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(0.5);
		border-bottom: 1px solid #ccc;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	// 弹性布局 
	.yf-flex,
	.yf-flex-left,
	.yf-flex-center,
	.yf-flex-right,
	.yf-flex-between,
	.yf-flex-vertical {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}

	.yf-flex-align,
	.yf-flex-left,
	.yf-flex-center,
	.yf-flex-right,
	.yf-flex-between {
		align-items: center;
		-webkit-align-items: center;
		box-align: center;
		-moz-box-align: center;
		-webkit-box-align: center;
	}

	.yf-flex-center {
		-webkit-justify-content: center;
		justify-content: center;
		-moz-box-pack: center;
		-webkit--moz-box-pack: center;
		box-pack: center;
	}

	.yf-flex-right {
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		-moz-box-pack: flex-end;
		-webkit--moz-box-pack: flex-end;
		box-pack: flex-end;
	}

	.yf-flex-between {
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-moz-box-pack: space-between;
		-webkit--moz-box-pack: space-between;
		box-pack: space-between;
	}

	// flex纵向布局
	.yf-flex-vertical {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-moz-box-orient: vertical;
		-moz-box-direction: normal;
		flex-direction: column;
		-webkit-flex-direction: column;
		height: 100%;
	}

	.yf-flex-1 {
		flex: 1;
	}

	.yf-flex-2 {
		flex: 2;
	}

	.yf-text-right {
		text-align: right;
	}

	.yf-text-center {
		text-align: center;
	}

	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar {
		display: none;
	}

	/* #endif */
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
	}

	/* #endif */
</style>
