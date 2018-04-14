/*
* @Author: Polylanger
* @Date:   2018-03-30 13:58:53
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-08 15:26:09
*/

'use strict'
// nav-side: 侧边导航栏
require('./index.css');
const _apec = require('util/apec.js');
const templateIndex = require('./index.string');

const navSide = {
	option: {
		name: '', 
		navList: [
			{name: 'user-center', desc: '个人中心', href: '../customer/user-center.html'}, 
			{name: 'order-list', desc: '我的订单', href: '../customer/order-list.html'}, 
			{name: 'user-pass-update', desc: '修改密码', href: '../customer/user-pass-update.html'}, 
			{name: 'about', desc: '关于APEC', href: '../customer/about.html'}, 
		]
	}, 
	init: function(option) {
		// 用传入的 option 对象修改 this.option
		// 浅拷贝，只对第一层有效
		$.extend(this.option, option);
		this.renderNav();
	}, 
	// 渲染导航菜单
	renderNav: function() {
		// 计算 active 数据
		for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		}
		// 渲染 list 数据
		var navHtml = _apec.renderHtml(templateIndex, {
			navList: this.option.navList, 
		});
		// 把 html 放入容器
		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;