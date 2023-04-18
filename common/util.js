import indexConfig from '@/config/index.config.js'
import md5 from 'js-md5';
import * as $Router from '@/common/route.js'
import moment from 'moment'
import Big from "big.js";
import $cache from '@/common/cache.js';
import {
	findRoutes,
	getPath
} from '@/common/route.js';

/**
 * @description 签名生成
 */
const signatureFormat = function(apikey = '', json = null, timestamp) {
	if (json == null) return '';
	const JsonValueArray = sortObjByKey(json);
	let signature = `${apikey}${JsonValueArray.join('')}${timestamp}`;
	// console.log('未加密签名:', signature);
	// console.log('中文编码后的', encodeURIComponent(signature));
	// console.log('md5后', md5(signature));
	signature = encodeURIComponent(signature);
	return md5(signature);
}
export function comboParameter(json = null) {
	if (json == null) return '';
	const timestamp = Date.parse(new Date());
	const apikey = "b117df30868bd1f5f280c36d50fdf21a";
	const newSignature = signatureFormat(apikey.trim(), json, timestamp);
	return { ...json,
		ts: timestamp,
		tsign: newSignature
	};
}
const encode = encodeURIComponent;
function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}
function stringifyQuery(url, data) {
	let str = url.split('#')
	const hash = str[1] || ''
	str = str[0].split('?')
	let query = str[1] || ''
	url = str[0]
	const search = query.split('&').filter(item => item)
	query = {}
	search.forEach(item => {
		item = item.split('=')
		query[item[0]] = item[1]
	})
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			if (isPlainObject(data[key])) {
				query[encode(key)] = encode(JSON.stringify(data[key]))
			} else {
				query[encode(key)] = encode(data[key])
			}
		}
	}
	query = Object.keys(query).map(item => `${item}=${query[item]}`).join('&')
	return url + (query ? '?' + query : '') + (hash ? '#' + hash : '')
}
// 当前页面路径
const currPage = () => {
	let pages = getCurrentPages();
	let cPage = pages[pages.length - 1];
	return cPage;
}
// 当前页面路径和参数
const currPageUrl = () => {
	let curPage = currPage();
	let _url = stringifyQuery(curPage.route, curPage.options);
	return _url;
}
// 上一页页面路径
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	return prePage;
}
// 上一页页面路径和参数
const prePageUrl = () => {
	let _prePage = prePage();
	let _url = stringifyQuery(_prePage.route, _prePage.options);
	return _url;
}
//密码加密
function valuemd5(password) {
	if (password == '' || password == null || password == undefined) {
		return '';
	}
	return md5(password);
}
//时间戳转换
function moments(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	if (dataStr === null || dataStr === "" || dataStr === undefined || dataStr === 0) {
		return '';
	}
	return moment.unix(dataStr).format(pattern)
}
//精度计算乘法
function amount(s, n = 100, _tofixed = 2) {
	let x = new Big(s);
	let y = x.times(n);
	return y.toFixed(_tofixed);
}

//精度计算加法
function amountPlus(s, n = 0, _tofixed = 0) {
	let x = new Big(s);
	let y = x.plus(n);
	return y.toFixed(_tofixed);
}

//精度计算减法
function amountMinus(s, n, _tofixed = 0) {
	let x = new Big(s);
	let y = x.minus(n);
	return y.toFixed(_tofixed);
}

//精度计算除法
function amountDiv(s, n, _tofixed = 0) {
	let x = new Big(s);
	let y = new Big(n);
	let z = x.div(y);
	return z.toFixed(_tofixed);
}
//功能：计算两个时间戳之间相差的日时分秒
//$begin_time  开始时间戳
//$end_time 结束时间戳
function timediff(begin_time, end_time) {
	let starttime, endtime;
	if (begin_time < end_time) {
		starttime = begin_time;
		endtime = end_time;
	} else {
		return {
			"day": 0,
			"hour": 0,
			"min": 0,
			"sec": 0
		}
	}
	//计算天数
	let timediff = endtime - starttime;
	let days = parseInt(timediff / 86400);
	//计算小时数
	let remain = timediff % 86400;
	let hours = parseInt(remain / 3600);
	//计算分钟数
	remain = remain % 3600;
	let mins = parseInt(remain / 60);
	//计算秒数
	let secs = remain % 60;
	let res = {
		"day": days,
		"hour": hours,
		"min": mins,
		"sec": secs
	};
	return res;
}

function checkLogin(path = 'navigateBack', params = {}) {
	const TOKEN = $cache.getStorageSync('token');
	// const USER_INFO = $cache.getStorageSync("userInfo"); &&USER_INFO.mobile
	if (TOKEN) {
		return true;
	} 
	let urlName = "wxLogin";
	if (path == false) {
		$Router.navigateTo(urlName);
	} else {
		if (path !== 'navigateBack') {
			path = getPath(path, params);
			$Router.redirectTo(urlName, {
				redirect: path
			});
		} else {
			$Router.navigateTo(urlName, {
				redirect: path
			});
		}
	}
	return false;
}

function getLoginUrl(path) {
	const TOKEN = $cache.getStorageSync('token') || '';
	if (TOKEN) {
		return path;
	}
	let urlName = "wxLogin";
	let _loginPath = findRoutes(urlName);
	path = stringifyQuery(_loginPath, {
		redirect: path
	});
	return path;
} 
// 模板店铺跳转1商城，2餐饮，34汽车房产5汽修
function templatejump(template) {
	let values = "";
	if (template == 1) {
		values = "shop-store-home";
	} else if (template == 2) {
		values = "repastShop-home";
	} else if (template == 3 || template == 4) {
		values = "shop-carshop-home";
	} else if (template == 5) {
		values = "pages-flow-carHome";
	}
	return values;
}
///<param name="str">要获得长度的字符串</param>
function getLength(str) {
	var realLength = 0,
		len = str.length,
		charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
}
module.exports = {
	comboParameter,
	amount,
	amountPlus,
	amountMinus,
	amountDiv,
	stringifyQuery,
	timediff,
	checkLogin,
	getLoginUrl,
	currPage,
	currPageUrl,
	templatejump,
	getLength,
	valuemd5,
	moments,
	prePage,
	prePageUrl
}
