export default {
	formatTimeToStr: function(times, pattern) {
		let d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
		if (pattern) {
			d = new Date(times).Format(pattern);
		}
		return d.toLocaleString();
	},
	/**
	 * 显示 loading 提示框
	 * @param {Object} mask 是否显示透明蒙层，防止触摸穿透，默认：true
	 */
	showLoading: function(mask) {
		if (mask == "" || mask == undefined || mask == null) {
			mask = true;
		}
		uni.showLoading({
			title: 'Loading...',
			mask: mask
		});
	},
	/**
	 * @校验手机
	 * @param value
	 * @returns {boolean}
	 */
	isMobile: function(value) {
		var isMob = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
		if (isMob.test(value)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 隐藏 loading 提示框。
	 * @param {Object} time 定时器 默认：0
	 */
	hideLoading: function(time) {
		if (time == "" || time == undefined || time == null) {
			time = 0;
		}
		setTimeout(function() {
			uni.hideLoading();
		}, time);
	},
	/**
	 * @param {Object} val
	 */
	getAddress: function(val) {
		if (!val) return false;
		return val.substr(0, 8) + "...";
	},
	
	/**
	 * 字符串转16进制
	 * @param {Object} str
	 */
	strToHexCharCode: function(str) {
		if (str === "")
			return "";
		var hexCharCode = [];
		hexCharCode.push("0x");
		for (var i = 0; i < str.length; i++) {
			hexCharCode.push((str.charCodeAt(i)).toString(16));
		}
		return hexCharCode.join("");
	},
	/**
	 * 弹出框信息
	 * @param {Object} msg
	 */
	showModal: function(msg, showCancel) {
		if (showCancel == null || showCancel == "" || showCancel == undefined) {
			showCancel = false;
		}
		uni.showModal({
			title: 'tip',
			content: msg,
			showCancel: showCancel
		})
	},
	//获取存储的键值
	getStorage: function(key) {
		let cacheDate = uni.getStorageSync(key);
		if (cacheDate) {
			try {
				if (key == 'token') {
					return cacheDate;
				} else {
					return JSON.parse(cacheDate);
				}
			} catch (e) {
				return cacheDate;
			}
		} else {
			return null;
		}
	},
	//存储键值
	setStorage: function(key, value) {
		try {
			if (key == 'token') {
				uni.setStorageSync(key, value);
			} else {
				uni.setStorageSync(key, JSON.stringify(value));
			}
		} catch (e) {
			// error
			console.log(e);
		}
	},
	// 清除存储数据
	removeStorage: function(key) {
		try {
			uni.removeStorageSync(key);
		} catch (e) {
			// error
		}
	},
	// 清除存储数据
	clearStorage: function() {
		try {
			uni.clearStorage();
			uni.clearStorageSync();
		} catch (e) {
			console.log("uni.clearStorage failed: " + JSON.stringify(e));
		}
	},
	objectToParamString: function(paramObj) {
		if (!paramObj) {
			return ''
		}
		let paramList = []
		Object.keys(paramObj) && Object.keys(paramObj).forEach(key => {
			let val
			if (key == 'fullName' || key == 'name' || key == 'policyList' || key == 'wxBeiBXrenName') {
				val = encodeURIComponent(paramObj[key])
			} else {
				val = paramObj[key]
			}
			if (val.constructor === Array) {
				val.forEach(_val => {
					paramList.push(key + '=' + _val)
				})
			} else {
				paramList.push(key + '=' + val)
			}
		})
		return paramList.join('&')
	},

	//问号传参
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
};

/**
 * @对Date的扩展，将 Date 转化为指定格式的String
 * @月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * @年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @例子：
 * @(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * @(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function(fmt) {
	//author: meizz
	let o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
	return fmt;
};
