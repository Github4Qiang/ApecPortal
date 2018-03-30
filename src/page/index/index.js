/*
* @Author: Polylanger
* @Date:   2018-03-27 20:42:16
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-30 14:36:45
*/

'use strict'
// nav-side: 侧边导航栏
require('page/common/nav/index.js');
require('page/common/header/index.js');

const navSide = require('page/common/nav-side/index.js');
const _apec = require('util/apec.js'); 

navSide.init({name: 'pass-update'});