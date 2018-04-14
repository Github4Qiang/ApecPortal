/*
* @Author: Polylanger
* @Date:   2018-04-14 15:30:03
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 18:32:51
*/
'use strict'
// order-detail: 订单详情页
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _apec = require('util/apec.js'); 
const _order = require('service/producer/order-service.js');
const navSide = require('page/common/producer/nav-side/index.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        subOrderNo: _apec.getUrlParam('subOrderNo')
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'order-manage'});
        // 加载订单详情
        this.loadOrderDetail();
    }, 
    bindEvent: function() {
        var _this = this;
        // 通知买家已发货
        $(document).on('click', '.send-product', function() {
            _order.sendProduct(_this.data.subOrderNo, function(res) {
                _apec.successTips('已通知买家发货成功');
                _this.loadOrderDetail();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
    }, 
    loadOrderDetail: function() {
        var orderDetailHtml = '';
        var _this = this;
        _order.getOrderDetail(this.data.subOrderNo, function(res) {
            // 判断订单状态
            _this.orderDetailFilter(res);
            orderDetailHtml = _apec.renderHtml(templateIndex, res);
            $('.content').html(orderDetailHtml);
        }, function(errMsg) {
            _this.showOderDetailErrorTips(errMsg);
        });
    }, 
    orderDetailFilter(data) {
        data.sendProduct = data.status === 20 ;     // 已付款可发货
        data.isCancelable = data.status === 10 ;    // 未付款可取消
    }, 
    showOderDetailErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '订单详情加载失败';
        $('.content').html('<p class="err-tip">'+ msg + '</p>');
    }
};

$(function() {
    page.init();
});