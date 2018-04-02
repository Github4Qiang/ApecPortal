/*
* @Author: Polylanger
* @Date:   2018-04-02 15:06:35
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-02 15:08:51
*/

'use strict'

const _apec = require('util/apec.js');

const _order = {
    // 向购物车中添加商品
    addToCart: function(productInfo, resolve, reject) {
        _apec.request({
            url: _apec.getServerUrl('/cart/add.do'),
            data: productInfo, 
            success: resolve, 
            error: reject
        });
    },
};

module.exports = _order;