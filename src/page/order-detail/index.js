/*
* @Author: Polylanger
* @Date:   2018-04-03 14:13:25
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 16:34:33
*/
'use strict'
// order-detail: 订单详情页
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _apec = require('util/apec.js'); 
const _order = require('service/order-service.js');
const navSide = require('page/common/nav-side/index.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        orderNo: _apec.getUrlParam('orderNo')
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'order-list'});
        // 加载订单详情
        this.loadOrderDetail();
    }, 
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            _order.cancelOrder(_this.data.orderNo, function(res) {
                _apec.successTips('订单取消成功');
                _this.loadOrderDetail();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
    }, 
    loadOrderDetail: function() {
        var orderDetailHtml = '';
        var _this = this;
        _order.getOrderDetail(this.data.orderNo, function(res) {
            // 判断订单状态
            _this.orderDetailFilter(res);
            orderDetailHtml = _apec.renderHtml(templateIndex, res);
            $('.content').html(orderDetailHtml);
        }, function(errMsg) {
            _this.showOderDetailErrorTips(errMsg);
        });
    }, 
    orderDetailFilter(data) {
        data.needPay = data.status == 10 ; 
        data.isCancelable = data.status == 10 ; 
    }, 
    showOderDetailErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '订单详情加载失败';
        $('.content').html('<p class="err-tip">'+ msg + '</p>');
    }
};

$(function() {
    page.init();
});