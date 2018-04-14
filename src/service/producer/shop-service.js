/*
* @Author: Polylanger
* @Date:   2018-04-07 12:46:40
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-07 17:21:32
*/

'use strict'

const _apec = require('util/apec.js');
const _shop = { 
    
    // 创建店铺
    createShop: function(shopInfo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/shop/save.do'), 
            data    : shopInfo, 
            success : resolve, 
            error   : reject
        });
    }, 

    // 获取店铺信息
    getShopInfo: function(resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/shop/get_information.do'), 
            success : resolve, 
            error   : reject
        });
    }, 

    // 修改店铺信息
    updateShop: function(shopInfo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/shop/update.do'), 
            data    : shopInfo, 
            success : resolve, 
            error   : reject
        });
    }, 

    // 激活店铺
    activateShop: function(resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/shop/activate.do'), 
            success : resolve, 
            error   : reject
        });
    }
};

module.exports = _shop;