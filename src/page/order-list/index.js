/*
* @Author: Polylanger
* @Date:   2018-04-03 14:13:48
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 15:54:47
*/
'use strict'
// order-list: 订单列表页
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

const _apec = require('util/apec.js'); 
const _order = require('service/order-service.js');
const navSide = require('page/common/nav-side/index.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        listParam: {
            pageNum: 1, 
            pageSize: 5
        }
    }, 
    init: function() {
        this.onLoad();
    }, 
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'order-list'});
        // 加载订单列表
        this.loadOrderList();
    }, 
    loadOrderList: function() {
        var orderListHtml = '';
        var _this = this;
        _order.getOrderList(this.data.listParam, function(res) {
            // 列表为空则显示“列表为空”
            if (res.list.length) {
                orderListHtml = _apec.renderHtml(templateIndex, {
                    list: res.list, 
                });
                $('.order-list-container').html(orderListHtml);
                _this.loadPagination({
                    hasPreviousPage : res.hasPreviousPage, 
                    prePage         : res.prePage, 
                    hasNextPage     : res.hasNextPage, 
                    nextPage        : res.nextPage, 
                    pageNum         : res.pageNum,          // 当前页
                    pages           : res.pages,            // 总页数
                    firstPage       : res.firstPage, 
                    isFirstPage     : res.isFirstPage, 
                    lastPage        : res.lastPage, 
                    isLastPage      : res.isLastPage, 
                    total           : res.total,            // 总记录数
                    navigateFirstPage   : res.navigateFirstPage,    // 导航条第一页的页码
                    navigateLastPage    : res.navigateLastPage,     // 导航条最后一页的页码
                    navigatePageNums    : res.navigatepageNums,     // 所有导航中的显示的页码
                    navigatePages       : res.navigatePages         // 导航条一次显示的页数
                });
            } else {
                _this.showOderListErrorTips('您暂时还没有订单');
            }
        }, function(errMsg) {
            _this.showOderListErrorTips(errMsg);
        });
    }, 
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'), 
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }, 
    showOderListErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '订单列表加载失败';
        $('.order-list-container').html('<p class="err-tip">'+ msg + '</p>');
    }
};

$(function() {
    page.init();
});