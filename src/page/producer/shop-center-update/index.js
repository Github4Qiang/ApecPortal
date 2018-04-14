/*
* @Author: Polylanger
* @Date:   2018-04-07 17:26:40
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-07 19:52:33
*/
'use strict'
// shop-center-update: 修改店铺信息

require('./index.css');
require('page/common/producer/nav/index.js');
require('page/common/header/index.js');

const _shop = require('service/producer/shop-service.js');
const _apec = require('util/apec.js'); 
const navSide = require('page/common/producer/nav-side/index.js');
const templateIndex = require('./index.string');

const page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },  
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'shop-center'});
        // 加载店铺信息
        this.loadShopInfo();
    }, 
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            // 验证表单数据
            var shopInfo = {
                id              : $.trim($('.shop-center-container').data('shop-id')),
                shopName        : $.trim($('#shopName').val()), 
                producerProvince: $.trim($('#producerProvince').val()), 
                producerCity    : $.trim($('#producerCity').val()), 
                producerDistrict: $.trim($('#producerDistrict').val()), 
                producerAddress : $.trim($('#producerAddress').val()), 
                serverPhone     : $.trim($('#serverPhone').val()), 
                bankCard        : $.trim($('#bankCard').val()), 
            };
            var validateResult = _this.formValidate(shopInfo);
            if (validateResult.status) {
                // 修改店铺信息
                _shop.updateShop(shopInfo, function(res) {
                    _apec.successTips(res);
                    window.location.href = '../producer/shop-center.html';
                }, function(errMsg) {
                    _apec.errorTips(errMsg);
                });
            }
            else {
                _apec.errorTips(validateResult.msg);
            }
        });
    }, 
    formValidate: function(shopInfo) {
        var result = {
            status: false, 
            msg: ''
        };
        // todo
        result.status = true;
        return result;
    }, 
    loadShopInfo: function() {
        var userHtml = '';
        _shop.getShopInfo(function(res) {
            userHtml = _apec.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _apec.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
});