/*
* @Author: Polylanger
* @Date:   2018-03-29 22:25:48
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-30 12:55:48
*/

'use strict'

require('./index.css');
const _apec = require('util/apec.js');
const _user = require('service/user-service.js');
const _cart = require('service/cart-service.js');

const nav = {
	init: function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	}, 
	// 为导航链接绑定 URL
	bindEvent: function() {
		// “登录”点击事件
		$('.js-login').click(function() {
			_apec.doLogin();
		});
		// “注册”点击事件
		$('.js-register').click(function() {
			window.location.href = './user-register.html';
		});
		// “退出”点击事件
		$('.js-logout').click(function() {
			_user.logout(function(res) {
				// 退出登录成功 resolve
				window.location.reload();
			}, function(errMsg) {
				// 退出登录失败 reject
				_apec.errTips(errMsg);
			});
		});
	}, 
	// 加载用户信息
	loadUserInfo: function() {
		_user.checkLogin(function(res) {
			// 隐藏 '.user.not-login'；显示 '.user.login' 并且打印“用户名”
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(errMsg) {
			// do nothing
		});
	}, 
	// 加载购物车数量
	loadCartCount: function() {
		_cart.getCartCount(function(res) {
			$('.nav .cart-count').text(res || 0);
		}, function(errMsg) {
			$('.nav .cart-count').text(0);
		});
	}
};

module.exports = nav.init();
