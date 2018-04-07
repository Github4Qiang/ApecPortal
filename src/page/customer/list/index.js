/*
* @Author: Polylanger
* @Date:   2018-04-01 14:57:34
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 14:56:44
*/

'use strict';
// list: 商品列表页
require('./index.css')

require('page/common/nav/index.js');
require('page/common/header/index.js');
const _apec = require('util/apec.js');
const _product = require('service/product-service.js');
const Pagination = require('util/pagination/index.js');

const templateIndex = require('./index.string');

const page = {
    data: {
        listParam: {
            keyword: _apec.getUrlParam('keyword') || '', 
            categoryId: _apec.getUrlParam('categoryId') || '', 
            orderBy: _apec.getUrlParam('orderBy') || '', 
            pageNum: _apec.getUrlParam('pageNum') || '', 
            pageSize: _apec.getUrlParam('pageSize') || ''
        }
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        this.loadList();
    }, 
    bindEvent: function() {
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function() {
            var $this = $(this);
            // 每次点击都返回第一页
            _this.data.listParam.pageNum = 1;
            if ($this.data('type') === 'default') {
                // 在“默认排序”被激活的情况下，再次点击“默认排序”，直接返回
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') {
                // 当点击“价格”时，取消其他同级元素的激活状态，并激活“价格”（即使“价格”已被激活
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序降序处理: 默认升序
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载排序列表
            _this.loadList();
        });
    }, 
    loadList: function() {
        var _this = this, 
            listHtml = '', 
            listParam = this.data.listParam, 
            $pListContainer = $('p-list-container');
        // 显示进度条
        $pListContainer.html('<div class="loading"></div>');
        // 删除不必要的字段: categoryId, keyword 二者不可兼得
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        // 请求商品列表
        _product.getProductList(listParam, function(res) {
            listHtml = _apec.renderHtml(templateIndex, {
                list: res.list, 
            });
            $('.p-list-container').html(listHtml);
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
        }, function(errMsg) {
            _apec.errorTips(errMsg);
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
    }
};

$(function() {
    page.init();
})