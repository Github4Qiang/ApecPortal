/*
* @Author: Polylanger
* @Date:   2018-04-14 21:15:45
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 21:23:02
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
        // 点击登录按钮
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
            username: $.trim($('#username').val()), 
            password: $.trim($('#password').val())
        };
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {    // 验证成功 -> 提交表单
            _user.login(formData, function(res) {
                window.location.href = _apec.getUrlParam('redirect') || '../manager/admin-index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {                        // 验证失败 -> 错误提示
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
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};

$(function() {
    page.init();
});