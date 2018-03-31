/*
* @Author: Polylanger
* @Date:   2018-03-31 11:25:22
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-31 14:51:32
*/


'use strict'
// user-pass-reset: 找回密码页
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
	data: {
		username: '', 
		question: '', 
		answer  : '', 
		token   : ''
	}, 
	init: function() {
		this.onLoad();
		this.bindEvent();
	}, 
	onLoad: function() {
		this.loadStepUsername();
	}, 
	bindEvent: function() {
		var _this = this;
		// 点击 用户名·下一步 按钮
		$('#submit-username').click(function() {
			_this.nextStepUsername();
		});
		// 按下回车按钮，提交表单
		$('#username').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.nextStepUsername();
			}
		});

		// 点击 密码提示问题·下一步 按钮
		$('#submit-question').click(function() {
			_this.nextStepQuestion();
		});
		// 按下回车按钮，提交表单
		$('#answer').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.nextStepQuestion();
			}
		});

		// 点击 新密码·下一步 按钮
		$('#submit-password').click(function() {
			_this.nextStepPassword();
		});
		// 按下回车按钮，提交表单
		$('#password').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.nextStepPassword();
			}
		});
	}, 
	// 加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show();
		// 从上一步进入该页面后，防止浏览器自动填充
		// 输入框获取焦点
		$('#username').val('').focus();
	}, 
	nextStepUsername: function() {
		var _this = this;
		var username = $('#username').val();
		if (username) {
			_user.getQuestion(username, function(res) {
				_this.data.username = username;
				_this.data.question = res;
				_this.loadStepQuestion();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {
			formError.show('请输入用户名');
		}
	}, 
	// 加载输入密码提示问题的一步
	loadStepQuestion: function() {
		// 清除错误提示
		formError.hide();
		// 容器切换
		$('.step-username').hide().siblings('.step-question').show()
			.find('.question').text(this.data.question);
		// 从上一步进入该页面后，防止浏览器自动填充
		// 输入框获取焦点
		$('#answer').val('').focus();
	}, 
	nextStepQuestion: function() {
		var _this = this;
		var answer = $('#answer').val();
		if (answer) {
			_user.checkAnswer({
				username: _this.data.username, 
				question: _this.data.question, 
				answer  : answer
			}, function(res) {
				_this.data.answer = answer;
				_this.data.token  = res;
				_this.loadStepPassword();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {
			formError.show('请输入密码提示问题的答案');
		}
	}, 
	// 加载输入新密码的一步
	loadStepPassword: function() {
		// 清除错误提示
		formError.hide();
		// 容器切换
		$('.step-question').hide().siblings('.step-password').show();
		// 从上一步进入该页面后，防止浏览器自动填充
		// 输入框获取焦点
		$('#password').val('').focus();
	}, 
	nextStepPassword: function() {
		var _this = this;
		var password = $('#password').val();
		if (password && password.length >= 6) {
			_user.resetPassword({
				username   	: _this.data.username, 
				passwordNew : password, 
				forgetToken : _this.data.token
			}, function(res) {
				window.location.href = './result.html?type=pass-reset';
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {
			formError.show('请输入不少于 6 位的新密码');
		}		
	}
};

$(function() {
	page.init();
});