const encode = encodeURIComponent;
const isPlainObject = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}
const stringifyQuery = function(url, data) {
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
const routes = [{
		path: "/pages/index/index",
		name: 'tabBar-index'
	},
	{
		path: "/pages/user/user",
		name: 'tabBar-user'
	},
	{
		path: "/pages/students/index",
		name: 'students-index'
	}, {
		path: "/pages/students/addStudents",
		name: 'students-addStudents'
	}, {
		path: "/pages/students/userInfo",
		name: 'students-userInfo'
	}, {
		path: "/pages/consume/consume",
		name: 'consume'
	}, {
		path: "/pages/message/list",
		name: 'message-list'
	}, {
		path: "/pages/message/detailList",
		name: 'message-detailList'
	},
]

const findRoutes = function(name) {
	let _route = routes.find(item => item.name == name),
		_path = "";
	if (_route) {
		_path = _route.path;
	} else {
		console.error(`${name}对应的路由不存在`);
	}
	return _path;
}
const getPath = function(name, param = null) {
	let _path = "";
	if (name == undefined || name == "") {
		console.error(`name 必传参数!`);
		return false;
	}
	if (name.indexOf('/') > -1) {
		_path = stringifyQuery(name, param);
	} else {
		_path = stringifyQuery(findRoutes(name), param);
	}
	return _path;
}
const navigateTo = function(name, param = null) {
	let _path = getPath(name, param);
	if (_path) {
		uni.navigateTo({
			url: _path,
			fail: function(err) {
				console.error(err)
			}
		})
	}
}
const redirectTo = function(name, param = null) {
	let _path = getPath(name, param);
	if (_path) {
		uni.redirectTo({
			url: _path,
			fail: function(err) {
				console.error(err)
			}
		})
	}
}
const reLaunch = function(name, param = null) {
	let _path = getPath(name, param);
	if (_path) {
		uni.reLaunch({
			url: _path,
			fail: function(err) {
				console.error(err)
			}
		})
	}
}
const switchTab = function(name, param = null) {
	let _path = getPath(name, param);
	if (_path) {
		uni.switchTab({
			url: _path,
			fail: function(err) {
				console.error(err)
			}
		})
	}
}
const navigateBack = function(delta = 1) {
	uni.navigateBack({
		delta
	});
}
export {
	getPath,
	findRoutes,
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack
}
