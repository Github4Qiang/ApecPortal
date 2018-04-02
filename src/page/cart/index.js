/*
* @Author: Polylanger
* @Date:   2018-04-02 12:12:48
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-02 15:12:03
*/

'use strict'
// cart: 购物车
require('./index.css');

require('page/common/header/index.js');
const nav = require('page/common/nav/index.js');
const _cart = require('service/cart-service.js');
const _apec = require('util/apec.js'); 

const templateIndex = require('./index.string');

const page = {
    data: {}, 
    init: function() {
        this.onLoad();
        this.bindEvent();

    }, 
    onLoad: function() {
        this.loadCart();
    }, 
    bindEvent: function() {
        var _this = this;
        // 单选、取消单个选中
        $(document).on('click', '.cart-select', function() {
            var $this = $(this), 
                productId = $this.parents('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                // 单选
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartErrorTips(errMsg);
                });
            } else {
                // 取消单选
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartErrorTips(errMsg);
                })
            }
        });
        // 全选、全部取消选中
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this); 
            if ($this.is(':checked')) {
                // 全选
                _cart.selectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartErrorTips(errMsg);
                });
            } else {
                // 全部取消选中
                _cart.unselectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartErrorTips(errMsg);
                })
            }
        });
        // 修改购物车中商品数量
        $(document).on('click', '.count-btn', function(res) {
            var $this = $(this), 
                $pCount = $this.siblings('.count-input');
            var productId = $this.parents('.cart-table').data('product-id');
            var minCount = 1, 
                maxCount = parseInt($pCount.data('stock')), 
                currCount = parseInt($pCount.val()), 
                newCount = 0;
            var type = $this.hasClass('plus') ? 'plus' : 'minus';
            if (type === 'plus') {
                if (maxCount <= currCount) {
                    _apec.errorTips("该商品库存不足，当前最多可买" + maxCount);
                    return;
                } 
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (minCount >= currCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新商品数量
            _cart.updateProduct({
                productId: productId, 
                count: newCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartErrorTips(errMsg);
            });
        });
        // 单个删除
        $(document).on('click', '.cell-delete', function() {
            if (window.confirm("确认要将该商品从购物车中移除吗？")) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProducts(productId);
            }
        });
        // 删除选中
        $(document).on('click', '.delete-select', function() {
            if (window.confirm("确认要将所有选中商品从购物车中移除吗？")) {
                var productIds = [];
                var $selectedItems = $('.cart-select:checked');
                for (var i = $selectedItems.length - 1; i >= 0; i--) {
                    productIds.push($($selectedItems[i]).parents('.cart-table').data('product-id'));
                }
                if (productIds.length) {
                    _this.deleteCartProducts(productIds.join(','));
                } else {
                    _apec.errorTips("请选择您要删除的商品");
                }
            }
        });
        // 去结算
        $(document).on('click', '.btn-submit', function() {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _apec.errorTips('请选择商品后再结算');
            }
        });
    }, 
    // 加载购物车详情数据
    loadCart: function() {
        var _this = this;
        // 请求数据
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartErrorTips(errMsg);
        });
    }, 
    renderCart: function(data) {
        // 数据预处理
        this.filter(data);
        // 缓存购物车数据
        this.data.cartInfo = data;
        // 渲染购物车 html 
        var cartHtml = _apec.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航条，重新加载购物车中商品数量
        nav.loadCartCount();
    }, 
    filter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    }, 
    showCartErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '哪里不对了，刷新一下试试~';
        $('.page-wrap').html('<p class="err-tip">'+ msg + '</p>');        
    }, 
    deleteCartProducts: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartErrorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
})