/*
* @Author: Polylanger
* @Date:   2018-03-31 16:36:43
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-31 17:05:48
*/

'use strict'
// user-pass-update: 修改密码页面
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _user = require('service/user-service.js');
const _apec = require('util/apec.js'); 
const navSide = require('page/common/nav-side/index.js');

const page = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	}, 
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({name: 'user-pass-update'});
	}, 
	bindEvent: function() {
		var _this = this;
		// 由于数据是由 js 生成的，正常无法绑定事件，需要用事件冒泡
		$(document).on('click', '.btn-submit', function() {
			// 验证表单数据
			var formData = {
				passwordOld 		: $.trim($('#passowrd-old').val()), 
				passwordNew 		: $.trim($('#password-new').val()), 
				passwordConfirm 	: $.trim($('#password-confirm').val()), 
			};
			var validateResult = _this.formValidate(formData);
			if (validateResult.status) {
				// 修改个人信息
				_user.updatePassword({
					passwordOld: formData.passwordOld, 
					passwordNew: formData.passwordNew
				}, function(res) {
					_apec.successTips('密码修改成功，请重新登录！');
					_user.logout(function(res) {
						// do nothing 
					}, function(errMsg) {
						_apec.errorTips(errMsg);						
					});
					window.location.href = './user-login.html';
				}, function(errMsg) {
					_apec.errorTips(errMsg);
				});
			}
			else {
				_apec.errorTips(validateResult.msg);
			}
		});
	}, 
	formValidate: function(formData) {
		var result = {
			status: false, 
			msg: ''
		};
		if (!_apec.validate(formData.passwordOld, 'require')) {
			result.msg = '请输入原密码';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '请输入长度大于 6 位的新密码';
			return result;
		}	
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '新密码与确认密码不一致';
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