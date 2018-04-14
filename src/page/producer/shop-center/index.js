/*
* @Author: Polylanger
* @Date:   2018-04-07 16:31:54
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-07 20:15:39
*/

'use strict'
// producer-center: 卖家中心

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
    },  
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'shop-center'});
        // 加载店铺信息
        this.loadShopInfo();
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