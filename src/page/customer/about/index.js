/*
* @Author: Polylanger
* @Date:   2018-04-03 17:51:44
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 23:19:18
*/
/*
* @Author: Polylanger
* @Date:   2018-04-03 14:13:25
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 16:34:33
*/
'use strict'
// about: 关于 APEC
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _apec = require('util/apec.js'); 
const navSide = require('page/common/nav-side/index.js');

const page = {
    init: function() {
        this.onLoad();
    }, 
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'about'});
    }, 
};

$(function() {
    page.init();
});