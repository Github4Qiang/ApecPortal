/*
* @Author: Polylanger
* @Date:   2018-04-02 16:37:17
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-02 20:13:37
*/
'use strict'

const _apec = require('util/apec.js');

const _category = {
    // 获取前两级类别
    getTop2Category: function(resolve, reject) {
        _apec.request({
            url: _apec.getServerUrl('/category/get_top2_category.do'),
            success: resolve,
            error: reject 
        });
    },
}; 

module.exports = _category;