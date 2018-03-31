/*
* @Author: Polylanger
* @Date:   2018-03-27 22:08:31
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-31 14:51:23
*/

'use strict'
// user-login: 用户注册页
require('page/common/nav-simple/index.js');
require('./index.css');

const _user = require('service/user-service.js');
const _apec = require('util/apec.js'); 

// 表单里的错误提示
var formError = {
	// 显示 error-item 并且填充错误提示
	show: function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	}, 
	// 隐藏 error-item
	hide: function(errMsg) {
		$('.error-item').hide().find('.err-msg').text('');
	}
}

const page = {
	init: function() {
		this.bindEvent();
	}, 
	bindEvent: function() {
		var _this = this;
		// 实时验证 username，当光标移开触发 blur 事件
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			// 如果用户名为空，不进行验证
			if (!username) {
				return;
			}
			// 异步验证 username 是否存在
			_user.checkUsername(username, function(res) {
				formError.hide();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		});
		// todo: 实时验证 email/phone 是否已经存在
		// 点击注册按钮
		$('#submit').click(function() {
			_this.submit();
		});
		// 按下回车按钮，提交表单（无论在用户名还是密码框，都会提交）
		$('.user-content').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.submit();
			}
		})
	}, 
	// 提交表单
	submit: function() {
		var formData = {
			username 		: $.trim($('#username').val()), 
			password 		: $.trim($('#password').val()), 
			passwordConfirm	: $.trim($('#passwordConfirm').val()), 
			phone 			: $.trim($('#phone').val()), 
			email 			: $.trim($('#email').val()), 
			question 		: $.trim($('#question').val()), 
			answer 			: $.trim($('#answer').val())
		};
		var validateResult = this.formValidate(formData);
		if (validateResult.status) {	// 验证成功 -> 提交表单
			_user.register(formData, function(res) {
				window.location.href = './result.html?type=register';
				formError.hide();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {						// 验证失败 -> 错误提示
			formError.show(validateResult.msg);
		}
	}, 
	formValidate: function(formData) {
		var result = {
			status: false, 
			msg: ''
		};
		if (!_apec.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_apec.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (!_apec.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		if (!_apec.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = "密码长度不能小于 6 位";
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = "两次输入的密码不一致";;
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