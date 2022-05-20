// 引入 uni-ajax 模块
import ajax from '@/uni_modules/u-ajax/js_sdk';
import web from '@/common/web.js';
import common from '@/common/common.js';
let baseURL = web.host;
uni.setStorageSync('baseURL', JSON.stringify(baseURL));

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址：" + req.url, req.data || req.params)
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res)
	}
}

// 创建自定义接口服务实例
const http = ajax.create({
	baseURL: baseURL,
	timeout: 60000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true, // 允许携带cookie
	// #endif
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
})
// 添加请求拦截器
http.interceptors.request.use(
	config => {
		config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const token = common.getStorage('token');
		token && (config.header['Authorization'] = "Bearer " + token);
		
		_reqlog(config);
		return config;
	},
	error => {
		return Promise.error(error);
	})

// 添加响应拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	_reslog(response);

	return response
}, err => {
	if (err && err.data) {
		if(err.statusCode === 401){
			common.removeStorage('address');
			common.removeStorage('token');
		}
		err.message =JSON.stringify(err.data);
		return Promise.reject(err.message)
	} else {
		console.log('连接服务器失败!' + err);
		/* uni.showModal({
			title: '提示',
			content: err,
			showCancel: false
		}) */
	}
})
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		http.post(url, params).then(res => {
			resolve(res);
			if (res.statusCode != 200 || res.statusCode != 201) {
				reject('失败');
			} else {
				resolve(res);
			}
		}).catch(error => {
			reject(error);
		})
	})
}
/** 
 * patch方法，对应patch请求 
 * 该请求是一个局部更新，后端仅更新接收到的字段
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function patch(url, params) {
	return new Promise((resolve, reject) => {
		http.patch(url, params).then(res => {
			resolve(res);
			if (res.statusCode != 200 || res.statusCode != 201) {
				reject('失败');
			} else {
				resolve(res);
			}
		}).catch(error => {
			reject(error);
		})
	})
}

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 */
export function get(url, params) {
	if (typeof(params) !== 'undefined' && params !== null){
		url = `${url}?`
		Object.keys(params).forEach(key => {
			url += `${key}=${params[key]}&`
		})
	}
	return new Promise((resolve, reject) => {
		http.get(url).then(res => {
			resolve(res);
			if (res.statusCode != 200 || res.statusCode != 201) {
				reject('失败');
			} else {
				resolve(res);
			}
		}).catch(error => {
			reject(error);
		})
	})
}
/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 */
export function put(url, params) {
	console.log(url)
	return new Promise((resolve, reject) => {
		http.put(url, params).then(res => {
			resolve(res);
			if (res.statusCode != 200 || res.statusCode != 201) {
				reject('失败');
			} else {
				resolve(res);
			}
		}).catch(error => {
			reject(error);
		})
	})
}
/** 
 * deleteP方法，对应deleteP请求 
 * @param {String} url [请求的url地址] 
 */
export function deleteP(url, params) {
	return new Promise((resolve, reject) => {
		http.delete(url, params).then(res => {
			resolve(res);
			if (res.statusCode != 200 || res.statusCode != 201) {
				reject('失败');
			} else {
				resolve(res);
			}
		}).catch(error => {
			reject(error);
		})
	})
}


export function formDataReq(url, params, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url, // 请求接口
			data: params, // 发送参数
			method: method || 'GET', // 参数类型
			header: {
				"authorization": "Bearer " + common.getStorage('token'),
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			}, // 请求头
			dataType: 'json', // 返回数据格式
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			},
		})
	})
}
