/*
* @Author: Polylanger
* @Date:   2018-03-31 14:12:00
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-31 15:25:21
*/

'use strict'
// user-center: 用户个人中心页
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _user = require('service/user-service.js');
const _apec = require('util/apec.js'); 
const navSide = require('page/common/nav-side/index.js');
const templateIndex = require('./index.string');

const page = {
	init: function() {
		this.onLoad();
	}, 
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({name: 'user-center'});
		// 加载用户信息
		this.loadUserInfo();
	}, 
	loadUserInfo: function() {
		var userHtml = '';
		_user.getUserInfo(function(res) {
			userHtml = _apec.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_apec.errorTips(errMsg);
		});
	}
};

$(function() {
	page.init();
});