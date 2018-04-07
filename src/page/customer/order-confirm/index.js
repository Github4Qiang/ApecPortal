/*
* @Author: Polylanger
* @Date:   2018-04-02 20:44:06
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-06 16:50:18
*/
'use strict';
// order-confirm: 订单确认页
require('./index.css')

require('page/common/header/index.js');
require('page/common/nav/index.js');
const _apec     = require('util/apec.js');
const _address  = require('service/address-service.js');
const _order    = require('service/order-service.js');

const templateAddress = require('./address.string');
const templateProduct = require('./product.string');

const page = {
    data: {
        selectedAddressId: null
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        this.loadAddress();
        this.loadProduct();
    }, 
    bindEvent: function() {
        var _this = this;
        // 收货地址的选中和新增
        $(document).on('click', '.address-item', function() {
            var $this = $(this);
            if (!$this.hasClass('add')) {
                // 收货地址的选中
                $this.addClass('active').siblings('.address-item').removeClass('active');
                _this.data.selectedAddressId = $this.data('address-id');
            } else {
                // todo: 添加收货地址
            }
        });
        // todo: 编辑收货地址

        // 删除收货地址
        $(document).on('click', '.address-delete', function(e) {
            // 阻止点击事件向 address-item 传递；（否则该 item 会被选中）
            e.stopPropagation();
            if (window.confirm('确认要删除该地址？')) {
                var addressId = $(this).parents('.address-item').data('address-id');
                _address.deleteAddress(addressId, function(res) {
                    // 删除成功则重新加载地址
                    _this.loadAddress();
                }, function(errMsg) {
                    _apec.errorTips(errMsg);
                })
            }
        });
        // 提交订单
        $(document).on('click', '.order-submit', function() {
            if (_this.data.selectedAddressId) {
                _order.createOrderNo(_this.data.selectedAddressId, function(res) {
                    window.location.href = '../customer/payment.html?orderNo=' + res.orderNo;
                }, function(errMsg) {
                    _apec.errorTips(errMsg);
                });
            } else {
                _apec.errorTips('请选择收货地址');                
            }
        });
    }, 
    // 加载地址栏
    loadAddress: function() {
        var _this = this;
        // 获取地址列表
        _address.getLoadAddress(function(res) {
            _this.addressFilter(res);
            var addressHtml = _apec.renderHtml(templateAddress, res);
            $('.address-container').html(addressHtml);
        }, function(errMsg) {
            _this.showAddressErrorTips(errMsg);
        });
    }, 
    // 加载商品列表栏
    loadProduct: function() {
        var _this = this;
        // 获取购物车中选中商品的列表
        _order.getProductList(function(res) {
            var productHtml = _apec.renderHtml(templateProduct, res);
            $('.product-container').html(productHtml);
        }, function(errMsg) {
            _apec.errorTips(errMsg);
        });
    }, 
    addressFilter: function(data) {
        if (this.data.selectedAddressId) {
            var existSelectedAddress = false;
            for (var i = data.list.length - 1; i >= 0; i--) {
                if (this.data.selectedAddressId === data.list[i]) {
                    data.list[i].isActive = true;
                    existSelectedAddress = true;
                }
            }
        }
        // this.data.selectedAddressId 可能不存在（被选中的被删除了）
        if (!existSelectedAddress) {
            this.data.selectedAddressId = null;
        }
    }, 
    showAddressErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '地址加载失败';
        $('.address-container').html('<p class="err-tip">'+ msg + '</p>');        
    }
};

$(function() {
    page.init();
})