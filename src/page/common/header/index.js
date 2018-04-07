/*
* @Author: Polylanger
* @Date:   2018-03-29 23:30:53
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-06 16:43:00
*/

'use strict'
// header: 通用页面头部
require('./index.css');
const _apec = require('util/apec.js');

const header = {
	init: function() {
		this.bindEvent();
		this.onload();
	},
	// Url 参数回填进搜索框 
	onload: function() {
		var keyword = _apec.getUrlParam('keyword');
		// keyword 存在，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	}, 
	// 搜索的提交
	searchSubmit: function() {
		var keyword = $.trim($('#search-input').val());
		// 输入框中有内容，则跳转 list 页执行搜索
		if (keyword) {
			window.location.href = '../customer/list.html?keyword=' + keyword;
		} 
		// 输入框没有内容，则回到主页
		else {
			_apec.goHome();
		}
	}, 
	bindEvent: function() {
		// 点击搜索按钮后，搜索提交
		var _this = this;
		$('.search-btn').click(function() {
			_this.searchSubmit();
		});
		// 输入回车后，搜索提交
		$('#search-input').keyup(function(e) {
			// 回车键的 keyCode = 13
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	}
}

header.init();
