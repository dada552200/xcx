import {
	http
} from '@/js_sdk/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改 

import config from "@/config/index.config.js";

// 小程序授权登录获取openid
export const authLogin = (data) => http.post('small/login', data);//test/login
// export const authLogin = (data) => http.post('test/login', data);
// 授权登录测试
export const loginTest = (data) => http.post('small/loginTest', data);
// 获取用户信息
export const memberInfo = (data) => http.post('small/member/info', data);
// 获取手机号
export const getWxPhone = (data) => http.post('small/getWxPhone', data);
// 获取轮播图
export const smallBanner = (data) => http.post('small/banner', data);
// 获取学生分组信息 
export const getGroup = (params) => http.get('small/order/group', {
    params
});
// 获取会员学生列表 
export const studentsList = (params) => http.get('small/students/list', {
    params
});
// 获取会员学生信息 
export const studentsInfo = (params) => http.get('small/students/info', {
    params
});
// 获取会员学生身份类型 
export const studentsTypeList = (params) => http.get('small/students/type/list', {
    params
});
// 添加学生 
export const studentsAdd = (params) => http.get('small/students/add', {
    params
});
// 学生组织类型列表 
export const organizationList = (params) => http.get('small/organization/list', {
    params
});
// 交易统计 
export const orderGroup = (params) => http.get('small/order/group', {
    params
});
// 交易列表 
export const orderList = (params) => http.get('small/order/list', {
    params
});