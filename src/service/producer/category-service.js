/*
* @Author: Polylanger
* @Date:   2018-04-12 18:14:40
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-12 18:47:08
*/
'use strict'

const _apec = require('util/apec.js');

const _category = {
    // 根据 parentId 获取所有下一级子类别
    getCategory: function(categoryId, resolve, reject) {
        _apec.request({
            url: _apec.getServerUrl('/producer/category/get_category.do'),
            data: {
                categoryId: categoryId
            }, 
            success: resolve,
            error: reject 
        });
    },
}; 

module.exports = _category;