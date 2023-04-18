const CONFIG = {
	//开发环境配置
	development: { 
		assetsPath: "/static", // 静态资源路径
		baseUrl: "http://39.105.168.89/",
		// baseUrl: "https://39.105.168.89/",
	},
	//生产环境配置
	production: { 
		assetsPath: "/static", // 静态资源路径 
		baseUrl: "https://dark.landbase.com.cn/",
		// baseUrl: "https://test.yoyasy.com/",
	}
}
export default CONFIG[process.env.NODE_ENV];
