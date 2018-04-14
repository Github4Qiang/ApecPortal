/*
* @Author: Polylanger
* @Date:   2018-04-05 14:29:18
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-07 16:56:25
*/

'use strict'
// open-shop: 开店
require('page/common/producer/nav/index.js');
require('page/common/producer/header-simple/index.js');
require('./index.css');

const _apec = require('util/apec.js'); 
const _producer = require('service/producer/producer-service.js');
const _shop = require('service/producer/shop-service.js');

const templateAgreement = require('./agreement.string');
const templateShopInfo = require('./shop-info.string');
const templateVerify = require('./verify.string');
const templateActivate = require('./activate.string');


const page = {
    data: {
        step: '', 
        shopInfo: {
        }, 
    }, 
    init: function() {
        this.onload();
        this.bindEvent();
    }, 
    onload: function() {
        this.data.step = _apec.getUrlParam('step');
        if (this.data.step) {
            // 传来 step 参数，加载对应的 step
            this.loadStep(this.data.step);
        } else {
            // 没有传来 step 参数，获取 producer 信息（判断登录及step）
            _producer.getProducerInfo(function(res) {
                // do nothing
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        }
    }, 
    bindEvent: function() {
        var _this = this;
        // 签署入驻协议，“同意”按钮
        $(document).on('click', '.btn-agree', function() {
            window.location.href = '../producer/open-shop.html?step=shop-info';
        });
        // 商家信息提交，“提交”按钮
        $(document).on('click', '.btn-submit', function() {
            // todo: validate
            // todo: province-city-district 级联列表
            _this.data.shopInfo.shopName            = $('#shopName').val();
            _this.data.shopInfo.producerProvince    = $('#producerProvince').val();
            _this.data.shopInfo.producerCity        = $('#producerCity').val();
            _this.data.shopInfo.producerDistrict    = $('#producerDistrict').val();
            _this.data.shopInfo.producerAddress     = $('#producerAddress').val();
            _this.data.shopInfo.serverPhone         = $('#serverPhone').val();
            _this.data.shopInfo.bankCard            = $('#bankCard').val();
            _shop.createShop(_this.data.shopInfo, function(res) {
                window.location.href = '../producer/open-shop.html?step=verify';
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
        // 店铺开通，"激活"按钮
        $(document).on('click', '.btn-activate', function() {
            _shop.activateShop(function(res) {
                window.location.href = '../producer/shop-center.html';
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
    }, 
    loadStep: function(step) {
        if ('agreement' === step) {
            this.loadAgreement();
        } else if ('shop-info' === step) {
            this.loadShopInfo();
        } else if ('verify' === step) {
            this.loadVerify();
        } else if ('activate' === step) {
            this.loadActivate();
        }
    }, 
    loadAgreement: function() {
        this.data.step = 'agreement';
        $('.step-agreement').addClass('active').siblings('.step-item').removeClass('active');
        var agreementHtml = _apec.renderHtml(templateAgreement, '');
        $('.open-shop-container').html(agreementHtml);
    }, 
    loadShopInfo: function() {
        this.data.step = 'shop-info';
        $('.step-shop-info').addClass('active').siblings('.step-item').removeClass('active');
        var shopInfoHtml = _apec.renderHtml(templateShopInfo, '');
        $('.open-shop-container').html(shopInfoHtml);
    }, 
    loadVerify: function() {
        this.data.step = 'verify';
        $('.step-verify').addClass('active').siblings('.step-item').removeClass('active');
        var verifyHtml = _apec.renderHtml(templateVerify, '');
        $('.open-shop-container').html(verifyHtml);
    }, 
    loadActivate: function() {
        this.data.step = 'activate';
        $('.step-activate').addClass('active').siblings('.step-item').removeClass('active');
        var activateHtml = _apec.renderHtml(templateActivate, '');
        $('.open-shop-container').html(activateHtml);
    }, 
};

$(function() {
    page.init();
});