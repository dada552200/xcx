import Vue from 'vue'
import moment from 'moment'
import indexConfig from '@/config/index.config.js'
import Big from "big.js"
import {
	amount,
	amountPlus,
	amountMinus,
	amountDiv
} from '@/common/util';
Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	if (dataStr === null || dataStr === "" || dataStr === undefined || dataStr === 0) {
		return '';
	}
	return moment.unix(dataStr).format(pattern)
})
Vue.filter('assetsIcon', function(imgUrl) {
	let _path = ""; 
	if (utility.isString(imgUrl)) {
		_path = `${indexConfig.assetsPath}/${imgUrl}`;
	}
	var num = _path.indexOf(':') + 1; //返回4
	_path = _path.slice(num);
	return _path;
})
//本地图片大图截图
Vue.filter('assetsAuto', function(imgUrl, width = 750) {
	let _path = "";
	let _width = `?x-oss-process=image/resize,w_${width}/auto-orient,1`;
	if (utility.isString(imgUrl)) {
		_path = `${indexConfig.assetsPath}/${imgUrl}${_width}`;
	}
	var num = _path.indexOf(':') + 1; //返回4
	_path = _path.slice(num);
	return _path;
})
// 时间戳转时间格式
Vue.filter('formatTime', function(time) {
	console.log(time)
	if (typeof time !== 'number' || time < 0) {
		return time
	}
	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time
	console.log(hour)
	console.log(minute)
	console.log(second)
	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
})
//秒数转时间
Vue.filter('formatSeconds', function(num) {
	var theTime = parseInt(num); // 秒
	var middle = 0; // 分
	var hour = 0; // 小时 
	if (theTime > 60) {
		middle = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (middle > 60) {
			hour = parseInt(middle / 60);
			middle = parseInt(middle % 60);
		}
	} else {
		return '1分钟';
	}
	var result = "";
	if (middle > 0) {
		result = "" + parseInt(middle) + "分" + result;
	}
	if (hour > 0) {
		result = "" + parseInt(hour) + "小时" + result;
	}
	return result;
})
// 会员类型
Vue.filter('viptype', function(str) {
	const orderStateMap = {
		'VIP0': '点击登录会员',
		'VIP1': '白卡会员',
		'VIP2': '铜卡会员',
		'VIP3': '银卡会员',
		'VIP4': '金卡会员',
		'VIP5': '',
	};
	return orderStateMap[str] && orderStateMap[str];
})

//精度计算乘法
Vue.filter('amount', function(s, n = 100, _tofixed = 2) {
	let x = new Big(s);
	let y = x.times(n);
	return y.toFixed(_tofixed);
})
//精度计算加法
Vue.filter('amountPlus', function(s, n = 0, _tofixed = 0) {
	let x = new Big(s);
	let y = x.plus(n);
	return y.toFixed(_tofixed);
})
//精度计算减法
Vue.filter('amountMinus', function(s, n, _tofixed = 0) {
	let x = new Big(s);
	let y = x.minus(n);
	return y.toFixed(_tofixed);
})

//精度计算除法
Vue.filter('amountDiv', function(s, n, _tofixed = 0) {
	let x = new Big(s);
	let y = new Big(n);
	let z = x.div(y);
	return z.toFixed(_tofixed);
})
//精度计算除法
Vue.filter('integralUrl', function(item, bonusNum) { 
	let num = 0;
	let bonus = amount(bonusNum, 10, 0);
	item = amount(item, 10, 0);
	let lastNum = amountMinus(bonus, item, 0);
	if (lastNum > 0) {
		num = 10;
	} else if (lastNum == 0) {
		if (bonus > 10) {
			num = 10;
		} else {
			num = 0;
		} 
	} else if (lastNum < 0) { 
		if(lastNum<=-10){
			num = 0;
		}else{
			num = 10-Math.abs(lastNum);
		}
		
	} else {
		num = 0;
	} 
	let text = `/static/hgstatus/vipstatus${num}.png`;
	return text;
})
