/*
* @Author: Polylanger
* @Date:   2018-03-30 14:39:08
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-30 14:58:43
*/

'use strict'
// result: 操作结果页
require('page/common/nav-simple/index.js');
require('./index.css');

const _apec = require('util/apec.js'); 

$(function() {
	// 从 url 中取得 type 参数，没有则显示默认结果页：“操作成功”
	var type = _apec.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	// 显示对应的提示元素
	$element.show();
});