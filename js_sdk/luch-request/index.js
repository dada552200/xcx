import indexConfig from "@/config/index.config.js";
import Request from './request.js'
import store from '@/store'
// import router from '@/config/router.config.js' //路由
import {
	comboParameter,
	stringifyQuery,
	currPageUrl
} from '@/common/util.js'
import * as $Router from '@/common/route.js'
const http = new Request()
// 获取token, 意见反馈就请求111的
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseUrl = indexConfig.baseUrl /* 根域名不同 */
	// application/json;charset=UTF-8
	config.header = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	};
	config.dataType = 'json';
	config.responseType = 'text';
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => {
	/* 请求之前拦截器 */
	const token = uni.getStorageSync("token");
	const systeminfo = uni.getStorageSync("systeminfo");
	if (token) {
		config.header['token'] = token;
	} else {
		config.header['token'] = "";
	}
	// if(systeminfo){
	// 	config.header['information'] = systeminfo;
	// }
	// if (config.method === 'get' || config.method === 'GET') {
	// 	if (config.params) { 
	// 		config.params = comboParameter(config.params);
	// 	}
	// }
	// if (config.method === 'post' || config.method === 'POST' || config.method === 'put' || config.method === 'PUT' ||
	// 	config.method === 'DELETE' || config.method === 'delete') {
	// 	if (config.data) {
	// 		if (config.header['Content-Type'] == "x-www-form-urlencoded") { 
	// 			config.data = config.data;
	// 		} else { 
	// 			config.data = config.data;
	// 		}
	// 	}
	// }
	// if (config.method === 'upload' || config.method === 'UPLOAD') {
	// 	if (config.formData) { 
	// 		config.formData = config.formData;
	// 	}
	// }
	// console.log(config)
	return config
})


http.interceptor.response((response) => {
	/* 请求之后拦截器 */
	const _data = response.data;
	if (_data.code > 200 && _data.code < 501) { // 服务端返回的状态码不等于200，则reject()
		if (_data.code === 201 || _data.message == "用户信息获取失败") {
			let url = "";
			let urlName = "wxLogin";
			url = currPageUrl();
			store.commit("SET_LOGOUT");
			// uni.showToast({
			// 	title: "登录状态过期，请重新登录",
			// 	icon: 'none'
			// });
			uni.removeStorageSync("userInfo");
			uni.removeStorageSync("token");
			setTimeout(function() {
				$Router.navigateTo(urlName, {
					redirect: "navigateBack"
				});
			}, 1500);

		} else {
			uni.showToast({
				title: _data.message,
				icon: 'none'
			});
		}
		if (_data.result) {
			return Promise.reject(_data)
		} else {
			return Promise.reject(_data.message)
		}
	}
	return _data;
}, (response) => { // 请求错误做点什么
	if (response.statusCode === 500) {
		uni.showToast({
			title: '抱歉，服务器挂了，紧急修复中~',
			icon: 'none'
		});
	}
})

export {
	http
}
