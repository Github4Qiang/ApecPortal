/*
* @Author: Polylanger
* @Date:   2018-03-28 20:46:24
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-12 23:39:57
*/

'use strict'

const Hogan = require('hogan.js');

// 配置属性
const conf = {
	serverHost: '',  			// 服务器域名
	producerServerHost: '', 	// 卖家对应域名
	adminServerHost: ''			// 管理员对应域名
};

var _apec = {
	// 买家专用 request 方法
	request: function(param) {
		var _this = this;
		$.ajax({
			type 	: param.method 	|| 'get', 
			url 	: param.url 	|| '', 
			dataType: param.type 	|| 'json', 
			data 	: param.data 	|| '', 
			success : function(res) {
				// 请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登录状态，需要强制登录
				else if (5 === res.status) {
					_this.doLogin();
				}
				// 请求数据错误
				else if (1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			}, 
			// 请求失败
			error 	: function(err) {
				typeof param.error === 'function' && param.error(err.status);
			}
		});
	}, 
	fileRequest: function(param) {
		var _this = this;
		$.ajax({
			type 		: param.method 	|| 'post', 
			url 		: param.url 	|| '', 
			processData	: false,
			contentType	: false,  
			data 		: param.data 	|| '', 
			success 	: function(res) {
				// 请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登录状态，需要强制登录
				else if (5 === res.status) {
					_this.doLogin();
				}
				// 请求数据错误
				else if (1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			}, 
			// 请求失败
			error 	: function(err) {
				typeof param.error === 'function' && param.error(err.status);
			}
		});
	}, 
	// 买家专用 获取服务器地址
	getServerUrl: function(path) {
		return conf.serverHost + path;
	},
	// 获取 url 参数：host:port/path/filename?key1=value1&key2=value2
	getUrlParam: function(name) {
		var regex = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(regex);
		return result ? decodeURIComponent(result[2])  : null;
	}, 
	// 渲染 HTML：拼接模板与数据
	renderHtml: function(htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate);	// 编译模板
		var result = template.render(data)			// 渲染数据
		return result;
	}, 
	// 成功提示
	successTips: function(msg) {
		alert(msg || '操作成功！');
	}, 
	// 错误提示
	errorTips: function(msg) {
		alert(msg || '哪里不对了~');
	}, 
	// 字段的有效性验证：非空判断、手机、邮箱
	validate: function(value, type) {
		// 去掉前后的空格；将非字符串类型转化为字符串
		var value = $.trim(value);
		if ('require' === type) {
			return !!value;
		}
		// 手机号验证
		if ('phone' === type) {
			return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value);
		}
		// 邮箱格式验证
		if ('email' === type) {
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
		}
	}, 
	// 统一登录处理
	doLogin: function() {
		window.location.href = '../customer/user-login.html?redirect=' + encodeURIComponent(window.location.href);
	}, 
	// 统一返回主页
	goHome: function() {
		window.location.href = '../customer/index.html';
	}, 

	// 卖家专用 request 方法
	producerRequest: function(param) {
		var _this = this;
		$.ajax({
			type 	: param.method 	|| 'get', 
			url 	: param.url 	|| '', 
			dataType: param.type 	|| 'json', 
			data 	: param.data 	|| '', 
			success : function(res) {
				// 请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登录状态，需要强制登录
				else if (5 === res.status) {
					_this.doLogin();
				}
				// 卖家尚未提交申请信息，转向 open-shop-agreement
				else if (9 === res.status) {
					window.location.href = '../producer/open-shop.html?step=agreement';
				}
				// 申请信息正在等待管理员审核，转向 open-shop-verify
				else if (10 === res.status) {
					window.location.href = '../producer/open-shop.html?step=verify';
				}
				// 店铺审核成功，等待激活，转向 open-shop-activate
				else if (11 === res.status) {
					window.location.href = '../producer/open-shop.html?step=activate';
				}
				// 请求数据错误
				else if (1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			}, 
			// 请求失败
			error 	: function(err) {
				typeof param.error === 'function' && param.error(err.status);
			}
		});
	}, 
	// 卖家专用 获取服务器地址
	getProducerServerUrl: function(path) {
		return conf.producerServerHost + path;
	},
};

module.exports = _apec;