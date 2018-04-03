/*
* @Author: Polylanger
* @Date:   2018-04-03 12:41:33
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 14:07:14
*/

'use strict'
// payment: 订单支付页
require('./index.css');

require('page/common/header/index.js');
const nav = require('page/common/nav/index.js');
const _apec = require('util/apec.js'); 
const _order = require('service/order-service.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        orderNo: _apec.getUrlParam('orderNo')
    }, 
    init: function() {
        this.onLoad();
    }, 
    onLoad: function() {
        this.loadPayment();
    }, 
    // 加载支付二维码
    loadPayment: function() {
        var _this = this;
        var paymentHtml = '';
        // 请求数据
        _order.getPaymentInfo(this.data.orderNo, function(res) {
            paymentHtml = _apec.renderHtml(templateIndex, res);
            $('.page-wrap').html(paymentHtml);
            // 二维码加载成功后，监听订单是否被支付
            _this.listenOrderStatus();
        }, function(errMsg) {
            _this.showPaymentErrorTips(errMsg);
        });
        
    }, 
    showPaymentErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '哪里不对了，刷新一下试试~';
        $('.page-wrap').html('<p class="err-tip">'+ msg + '</p>');        
    }, 
    // 监听订单是否已被支付
    listenOrderStatus: function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _order.getPaymentStatus(_this.data.orderNo, function(res) {
                // 订单已支付
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNo;                    
                }
            }, function(errMsg) {
                // 一次发送失败，do nothing
            });
        }, 5000);
    }
};

$(function() {
    page.init();
})