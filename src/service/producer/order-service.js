/*
* @Author: Polylanger
* @Date:   2018-04-11 15:32:46
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 18:30:08
*/
'use strict'

const _apec = require('util/apec.js');
const _order = { 

    // 发货
    sendProduct: function(subOrderNo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/order/send.do'), 
            data    : {
                subOrderNo: subOrderNo
            }, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 根据订单 ID 获取订单详情
    getOrderDetail: function(subOrderNo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/order/detail.do'), 
            data    : {
                subOrderNo: subOrderNo
            },
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 获取订单列表
    getOrderList: function(listParam, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/order/list.do'), 
            data    : listParam, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 
};

module.exports = _order;