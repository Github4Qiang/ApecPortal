/*
* @Author: Polylanger
* @Date:   2018-04-14 15:30:20
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 18:32:59
*/
'use strict'
// order-manage: 订单管理-订单列表

require('./index.css');
require('page/common/producer/nav/index.js');
require('page/common/header/index.js');

const _shop = require('service/producer/shop-service.js');
const _order = require('service/producer/order-service.js');
const _apec = require('util/apec.js'); 
const navSide = require('page/common/producer/nav-side/index.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        listParam: {
            pageNum: 1, 
            pageSize: 3, 
        }, 
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    },  
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'order-manage'});
        // 加载店铺信息
        this.loadOrderList();
    }, 
    bindEvent: function() {
        var _this = this;
        // 订单状态选择
        $('#order-status-selector').change(function() {
            // 清空分页栏
            $('.pagination').html('');
            // 重新加载订单列表
            _this.loadOrderList();
        });
        // 发货

        // 查看订单详情

    }, 
    loadOrderList: function() {
        var _this = this, 
            orderListHtml = '', 
            listParam = this.data.listParam;
        listParam.status = $('#order-status-selector').val();
        // 加载订单列表
        _order.getOrderList(listParam, function(res) {
            // 列表为空则显示“列表为空”
            if (res.list.length) {
                _this.filterOrderList(res.list);
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
                _this.showOrderListErrorTips('您暂时还没有订单');
            }
        }, function(errMsg) {
            _this.showOrderListErrorTips(errMsg);
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
    showOrderListErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '订单列表加载失败';
        $('.order-list-container').html('<p class="err-tip">'+ msg + '</p>');
    }, 
    filterOrderList: function(list) {
        list.forEach(function(item, index) {
            item.online = true;
            // 1: 在线；2：下架
            if (item.status === 2) {
                item.online = false;
            }
        });
    }
};

$(function() {
    page.init();
});