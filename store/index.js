import Vue from 'vue'
import Vuex from 'vuex'
import $cache from '@/common/cache.js';
const TOKEN = $cache.getStorageSync("token");
const USER_INFO = $cache.getStorageSync("userInfo");
const STUDENT_INFO = $cache.getStorageSync("studentInfo");
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		// 前端token
		token: TOKEN,
		// 用户信息 头像 昵称
		userInfo: USER_INFO,
		studentInfo: STUDENT_INFO,
	},
	getters: {
		// 用户是否登录
		hasLogin: state => {
			let _token = state.token; 
			if (_token == undefined) {
				_token = $cache.getStorageSync("token");
			}
			if (_token) {
				return true;
			} else {
				return false
			}
		}, 
		// 用户是否有手机号
		hasMobile: state => {
			let _mobile = state.userInfo.mobile; 
			if (_mobile) {
				return true;
			} else {
				return false
			}
		},
	},
    mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			$cache.setStorageSync("token", token);
		},
		SET_OPENID(state, openid) {
			$cache.setStorageSync("openid", openid);
		},
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo;
			$cache.setStorageSync("userInfo", userInfo);
		},
		SET_STUDENT_INFO(state, studentInfo) {
			state.userInfo = userInfo;
			$cache.setStorageSync("studentInfo", studentInfo);
		},
		SET_LOGOUT(state) {
			state.token = "";
			state.userInfo = "";
			$cache.removeStorageSync("userInfo");
			$cache.removeStorageSync("token");
		},
	},
    actions: {}
})
export default store
