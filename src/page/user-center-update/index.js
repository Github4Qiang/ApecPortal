/*
* @Author: Polylanger
* @Date:   2018-03-31 14:33:51
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-31 16:11:15
*/

'use strict'
// user-center-update: 修改用户个人信息页
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
		this.bindEvent();
	}, 
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({name: 'user-center'});
		// 加载用户信息
		this.loadUserInfo();
	}, 
	bindEvent: function() {
		var _this = this;
		// 由于数据是由 js 生成的，正常无法绑定事件，需要用事件冒泡
		$(document).on('click', '.btn-submit', function() {
			// 验证表单数据
			var userInfo = {
				email 		: $.trim($('#email').val()), 
				phone 		: $.trim($('#phone').val()), 
				question 	: $.trim($('#question').val()), 
				answer 		: $.trim($('#answer').val())
			};
			var validateResult = _this.formValidate(userInfo);
			if (validateResult.status) {
				// 修改个人信息
				_user.updateUserInfo(userInfo, function(res) {
					_apec.successTips(res);
					window.location.href = './user-center.html';
				}, function(errMsg) {
					_apec.errorTips(validateResult.msg);
				});
			}
			else {
				_apec.errorTips(validateResult.msg);
			}
		});
	}, 
	loadUserInfo: function() {
		var userHtml = '';
		_user.getUserInfo(function(res) {
			userHtml = _apec.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_apec.errorTips(errMsg);
		});
	}, 
	formValidate: function(formData) {
		var result = {
			status: false, 
			msg: ''
		};
		if (!_apec.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		if (!_apec.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (!_apec.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_apec.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
			return result;
		}		
		result.status = true;
		result.msg = "验证通过";
		return result;
	}
};

$(function() {
	page.init();
});