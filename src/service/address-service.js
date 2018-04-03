/*
* @Author: Polylanger
* @Date:   2018-04-02 21:46:12
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-02 21:47:30
*/


'use strict';
var _apec = require('util/apec.js')
var _address = {

    //获取地址列表
    getLoadAddress : function(resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/shipping/list.do'),
            success : resolve,
            error   : reject
        });
    },

    //新建收件人
    save : function(addressInfo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //新建收件人
    update : function(addressInfo,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //新建收件人
    deleteAddress : function(id,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : id
            },
            success : resolve,
            error   : reject
        });
    },
    //获取单条收件人信息
    getAddress : function(shippingId,resolve,reject) {
        _apec.request({
            url     : _apec.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _address;