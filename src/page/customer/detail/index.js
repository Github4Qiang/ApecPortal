/*
* @Author: Polylanger
* @Date:   2018-04-01 20:23:51
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-08 17:41:09
*/
'use strict';
// detail: 商品详情
require('./index.css')

require('page/common/nav/index.js');
require('page/common/header/index.js');
const _apec = require('util/apec.js');
const _product = require('service/product-service.js');
const _cart = require('service/cart-service.js');

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
        this.loadDetail();
    }, 
    bindEvent: function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // 设置商品数量
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount = $('.p-count');
            var currCount = parseInt($pCount.val());
            var minCount = 1, 
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > 1 ? currCount - 1 : currCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function() {
            var productInfo = {
                productId: _this.data.productId, 
                count: $('.p-count').val()
            };
            _cart.addToCart(productInfo, function(res) {
                window.location.href = '../customer/result.html?type=cart-add';
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
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
            $('.page-wrap').html(html);
        }, function(errMsg) {
            $('.page-wrap').html('<p class="error-tips">此商品太淘气，找不到了</p>')
        });
    }
};

$(function() {
    page.init();
})