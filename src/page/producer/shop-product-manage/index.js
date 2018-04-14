/*
* @Author: Polylanger
* @Date:   2018-04-07 18:53:42
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 15:37:25
*/
'use strict'
// product-manage: 商品管理-商品列表

require('./index.css');
require('page/common/producer/nav/index.js');
require('page/common/header/index.js');

const _shop = require('service/producer/shop-service.js');
const _product = require('service/producer/product-service.js');
const _apec = require('util/apec.js'); 
const navSide = require('page/common/producer/nav-side/index.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        listParam: {
            pageNum: 1, 
            pageSize: 6, 
        }
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    },  
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'product-manage'});
        // 加载店铺信息
        this.loadProductList();
    }, 
    bindEvent: function() {
        var _this = this;
        // 上架点击事件
        $(document).on('click', '.product-online', function() {
            var productId = $(this).parents('tr').data('product-id');
            _product.setProductStatus({
                productId: productId, 
                status   : 1
            }, function(res) {
                _this.loadProductList();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            })
        });
        // 下架点击事件
        $(document).on('click', '.product-take-down', function() {
            var productId = $(this).parents('tr').data('product-id');
            _product.setProductStatus({
                productId: productId, 
                status   : 2
            }, function(res) {
                _this.loadProductList();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            })
        });
        // 删除点击事件
        $(document).on('click', '.product-delete', function() {
            var productId = $(this).parents('tr').data('product-id');
            _product.deleteProduct(productId, function(res) {
                _this.loadProductList();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            })
        });
    }, 
    loadProductList: function() {
        var _this = this, 
            productListHtml = '', 
            listParam = this.data.listParam;
        // 加载商品列表
        _product.getProductList(this.data.listParam, function(res) {
            // 列表为空则显示“列表为空”
            if (res.list.length) {
                _this.filterProductList(res.list);
                productListHtml = _apec.renderHtml(templateIndex, {
                    list: res.list, 
                });
                $('.panel-body').html(productListHtml);
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
                _this.showProductListErrorTips('您暂时还没有商品');
            }
        }, function(errMsg) {
            _this.showProductListErrorTips(errMsg);
        });
    }, 
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'), 
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }, 
    showProductListErrorTips: function(errMsg) {
        var msg = errMsg ? errMsg : '商品列表加载失败';
        $('.panel-body').html('<p class="err-tip">'+ msg + '</p>');
    }, 
    filterProductList: function(list) {
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