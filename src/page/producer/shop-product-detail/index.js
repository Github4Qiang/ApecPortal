/*
* @Author: Polylanger
* @Date:   2018-04-08 17:39:27
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 16:05:00
*/

'use strict'
// product-detail: 卖家查看商品详情
require('./index.css')

require('page/common/producer/nav/index.js');
require('page/common/header/index.js');
const _apec = require('util/apec.js');
const _product = require('service/producer/product-service.js');
const navSide = require('page/common/producer/nav-side/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        productId: _apec.getUrlParam('productId') || '', 
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        // url 上没有 productId 参数，直接返回首页
        if(!this.data.productId) {
            _apec.goHome();
        }
        // 初始化左侧菜单
        navSide.init({name: 'product-manage'});
        this.loadDetail();
    }, 
    bindEvent: function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.btn-update', function() {
            window.location.href = '../producer/shop-product-save.html?productId=' + _this.data.productId;
        });
    }, 
    // 加载商品详情数据
    loadDetail: function() {
        var html = '', 
            _this = this;
        _product.getProductDetail(this.data.productId, function(res) {
            _this.data.detailInfo = res;
            res.subImages = res.subImages.split(',');
            html = _apec.renderHtml(templateIndex, res);
            $('.panel-body').html(html);
        }, function(errMsg) {
            $('.panel-body').html('<p class="error-tips">此商品太淘气，找不到了</p>')
        });
    }
};

$(function() {
    page.init();
})