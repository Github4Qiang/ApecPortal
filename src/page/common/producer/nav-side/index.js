/*
* @Author: Polylanger
* @Date:   2018-04-07 16:48:47
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 16:06:51
*/

'use strict'
// producer - nav-side: 侧边导航栏
require('../../nav-side/index.css');

const _apec = require('util/apec.js');

const templateIndex = require('../../nav-side/index.string');

const navSide = {
    option: {
        name: '', 
        navList: [
            {name: 'shop-center', desc: '我的店铺', href: '../producer/shop-center.html'}, 
            {name: 'product-manage', desc: '商品管理', href: '../producer/shop-product-manage.html'}, 
            {name: 'order-manage', desc: '订单管理', href: '../producer/shop-order-manage.html'}, 
            {name: 'statistic', desc: '数据统计', href: '../producer/shop-statistic.html'}, 
            {name: 'about', desc: '关于APEC', href: '../customer/about.html'}, 
        ]
    }, 
    init: function(option) {
        // 用传入的 option 对象修改 this.option
        // 浅拷贝，只对第一层有效
        $.extend(this.option, option);
        this.renderNav();
    }, 
    // 渲染导航菜单
    renderNav: function() {
        // 计算 active 数据
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        // 渲染 list 数据
        var navHtml = _apec.renderHtml(templateIndex, {
            navList: this.option.navList, 
        });
        // 把 html 放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;