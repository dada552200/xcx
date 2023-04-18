import Vue from 'vue'
import App from './App'
import md5 from 'js-md5';
// import mButtom from "@/components/hq-ui/m-buttom.vue";
// import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
// import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
// import tuiTabbar from '@/components/tui-tabbar/tui-tabbar.vue';
import * as $Router from '@/common/route.js';
import store from './store';
import * as $apis from './apis/index.js'
import '@/common/filter'; 
import indexConfig from '@/config/index.config.js'
import { 
	checkLogin,
	currPage,
	currPageUrl
} from '@/common/util.js'


const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const showLoading = (title) => {
	uni.showLoading({
		title: title || '加载中',
		mask: true
	});
}
const hideLoading = () => {
	uni.hideLoading();
}
// 上一个页面
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	console.log(pages)
	console.log(prePage)
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
Vue.prototype.$api = {
	showLoading,
	hideLoading,
	msg,
	prePage,
	checkLogin,
	currPage,
	currPageUrl
};
// 注册全局组件uniLoadMore
// Vue.component('uniNavBar', uniNavBar)
// Vue.component('uni-load-more', uniLoadMore)
// Vue.component('m-buttom', mButtom)
// Vue.component('tui-tabbar', tuiTabbar)
Vue.config.productionTip = false
Vue.prototype.$Router = $Router;
Vue.prototype.$store = store;
Vue.prototype.$md5 = md5; 
Vue.prototype.$apis = $apis;
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
