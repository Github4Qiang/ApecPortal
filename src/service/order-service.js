/*
* @Author: Polylanger
* @Date:   2018-04-02 15:06:35
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 14:04:49
*/

'use strict'

const _apec = require('util/apec.js');

const _order = {
    // 获取购物车中选中商品的列表
    getProductList : function(resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },

    // 创建订单
    createOrderNo : function(shippingId,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/create.do'),
            data    : {
                shippingId: shippingId
            },
            success : resolve,
            error   : reject
        });
    },

    // 获取订单列表
    getOrderList : function(listParam,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },

    // 获取订单详情
    getOrderDetail : function(orderNo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/detail.do'),
            data    : {
                orderNo: orderNo
            },
            success : resolve,
            error   : reject
        });
    },

    //取消订单
    cancelOrder : function(orderNo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo: orderNo
            },
            success : resolve,
            error   : reject
        });
    },

    //获取支付信息
    getPaymentInfo : function(orderNo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/pay.do'),
            data    : {
                orderNo: orderNo
            },
            success : resolve,
            error   : reject
        });
    },

    //获取支付信息状态
    getPaymentStatus : function(orderNo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo: orderNo
            },
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _order;