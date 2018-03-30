/*
* @Author: Polylanger
* @Date:   2018-03-29 23:34:28
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-30 12:30:37
*/

'use strict'
const _apec = require('util/apec.js');
const _user = { 
	// 用户登录
	login: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/login.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 用户注册
	register: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/register.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 验证用户名是否存在
	checkUsername: function(username, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/check_valid.do'), 
			data 	: {
					type: 'username', 
					str : username
			}, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	},
	// 检查用户登录状态
	checkLogin: function(resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/get_user_info.do'), 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 获取密码重置问题
	getQuestion: function(username, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/forget_get_question.do'), 
			data 	: {
				username : username
			}, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 检查密码提示问题答案
	checkAnswer: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/forget_check_answer.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 忘记密码时，重置密码
	resetPassword: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/forget_reset_password.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 登录状态下，重置密码
	updatePassword: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/reset_password.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 更新用户信息
	updateUserInfo: function(userInfo, resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/update_information.do'), 
			data 	: userInfo, 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 获取用户信息
	getUserInfo: function(resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/get_information.do'), 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
	// 登出
	logout: function(resolve, reject) {
		_apec.request({
			url 	: _apec.getServerUrl('/user/logout.do'), 
			method 	: 'POST', 
			success : resolve, 
			error 	: reject
		});
	}, 
};

module.exports = _user;