/*
* @Author: Polylanger
* @Date:   2018-03-30 11:56:58
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-30 12:34:28
*/

'use strict'

const _apec = require('util/apec.js');

const _cart = {
	// 向购物车中添加商品
	addToCart: function(productInfo, resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/add.do'),
			data: productInfo, 
			success: resolve, 
			error: reject
		});
	},
	// 移除购物车某个产品
	deleteProduct: function(productIds, resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/delete_product.do'),
			data: {
				productIds: productIds
			},
			success: resolve, 
			error: reject
		});
	},
	// 查询在购物车里的产品数量
	getCartCount: function(resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject 
		});
	},
	// 购物车List列表
	getCartList: function(resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/list.do'),
			success: resolve,
			error: reject
		});
	},
	// 购物车选中某个商品
	selectProduct: function(productId, resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/select.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		});
	},
	// 购物车全选
	selectAllProduct: function(resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/select_all.do'), 
			success: resolve, 
			error: reject
		});
	},
	// 购物车取消选中某个商品
	unselectProduct: function(productId, resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/un_select.do'),
			data: {
				productId: productId
			}, 
			success: resolve,
			error: reject
		});
	},
	// 购物车取消全选
	unselectAllProduct: function(resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/un_select_all.do'), 
			success: resolve, 
			error: reject
		});
	},
	// 更新购物车某个产品数量
	updateProduct: function(productInfo, resolve, reject) {
		_apec.request({
			url: _apec.getServerUrl('/cart/update.do'),
			data: productInfo, 
			success: resolve, 
			error: reject
		});
	}
};

module.exports = _cart;