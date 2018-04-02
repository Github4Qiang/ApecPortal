/*
* @Author: Polylanger
* @Date:   2018-04-01 14:59:02
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-01 15:33:42
*/
'use strict';

const _apec = require('util/apec.js')

const _product = {
	// 商品列表
	getProductList : function(listParam,resolve,reject){
		_apec.request({
			url 	: _apec.getServerUrl('/product/list.do'),
			data	: listParam,
			success	: resolve,
			error 	: reject
		});
	},
	// 商品详情
	getProductDetail : function(productId,resolve,reject){
		_apec.request({
			url 	: _apec.getServerUrl('/product/detail.do'),
			data	: {
				productId : productId
			},
			success	: resolve,
			error 	: reject
		});
	}
}

module.exports = _product;