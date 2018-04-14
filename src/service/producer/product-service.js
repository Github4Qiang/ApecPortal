/*
* @Author: Polylanger
* @Date:   2018-04-11 15:32:38
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-13 13:37:40
*/
'use strict'

const _apec = require('util/apec.js');
const _product = { 
    
    // 添加或更新商品
    save: function(productInfo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/product/save.do'), 
            data    : productInfo, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // // 更新商品信息
    // updateProduct: function(productInfo, resolve, reject) {
    //     _apec.producerRequest({
    //         url     : _apec.getServerUrl('/producer/product/save.do'), 
    //         data    : productInfo, 
    //         method  : 'GET', 
    //         success : resolve, 
    //         error   : reject
    //     });
    // }, 

    // 根据商品 ID 获取商品详情
    getProductDetail: function(productId, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/product/detail.do'), 
            data    : {
                productId: productId
            },
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 获取商家商品列表
    getProductList: function(listParam, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/product/list.do'), 
            data    : listParam, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 改变商品状态
    setProductStatus: function(productInfo, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/product/set_sale_status.do'), 
            data    : productInfo, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 删除商品
    deleteProduct: function(productId, resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/product/delete.do'), 
            data    : {
                productId: productId
            }, 
            method  : 'GET', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 上传商品图片
    uploadProductImage: function(imageInfo, resolve, reject) {
        _apec.fileRequest({
            url     : _apec.getServerUrl('/producer/product/upload.do'), 
            data    : imageInfo, 
            success : resolve, 
            error   : reject
        })
    }
};

module.exports = _product;