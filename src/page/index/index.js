/*
* @Author: Polylanger
* @Date:   2018-03-27 20:42:16
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-01 14:34:39
*/

'use strict'
// index: 首页
require('./index.css');
 
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
const _apec = require('util/apec.js'); 

const templateBanner = require('./index.string');

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