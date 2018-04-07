/*
* @Author: Polylanger
* @Date:   2018-03-27 20:42:16
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-02 20:18:52
*/

'use strict'
// index: 首页
require('./index.css');
 
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
const _apec = require('util/apec.js'); 
const _category = require('service/category-service.js');

const templateBanner = require('./banner.string');
const templateFloor = require('./floor.string');

const page = {
    data: {}, 
    init: function() {
        this.onLoad();
    }, 
    onLoad: function() {
        this.loadBanner();
        this.loadFloor();
    },
    // 加载 Banner 栏
    loadBanner: function() {
        $(function() {
            // 渲染 banner 的 HTML
            var bannerHtml = _apec.renderHtml(templateBanner);
            $('.banner-container').html(bannerHtml);
            // 初始化 banner
            var $slider = $('.banner').unslider({
                dots: true
            });
            // 前一张后一张操作的事件绑定
            $('.banner-container .banner-arrow').click(function(){
                var forward = $(this).hasClass('prev') ? 'prev' : 'next';
                $slider.data('unslider')[forward]();
            });
        });
    }, 
    // 加载 floor 列表
    loadFloor: function() {
        var _this = this;
        // 获取前两级品类信息
        _category.getTop2Category(function(res) {
            // 渲染 HTML  
            var floorHtml = _apec.renderHtml(templateFloor, {
                list: res
            });
            $('.floor-container').html(floorHtml);
        }, function(errMsg) {
            _apec.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
})