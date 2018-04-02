/*
* @Author: Polylanger
* @Date:   2018-04-01 16:56:33
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-01 19:42:20
*/

'use strict'
// pagination: 分页工具
require('./index.css');

const _apec = require('util/apec.js');

const templatePagination = require('./index.string');

const Pagination = function() {
    var _this = this;

    _this.defaultOption = {
        container   : null, 
        pageNum     : 1,
        onSelectPage: null
    };
    // 绑定点击事件
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabeld')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : '';
    }) 
};
// 渲染分页组件
Pagination.prototype.render = function(userOption) {
    // 合并选项（{} <- (defaultOption+userOption)）
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的 jQuery 对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断是否只有一页：只有一页则不显示分页栏
    if (this.option.pages <= 1) {
        return;
    }
    // 渲染分页栏
    this.option.container.html(this.getPaginationHtml());
}
// 获取分页栏 HTML
Pagination.prototype.getPaginationHtml = function() {
    // |首页|上一页| 1 2 3 4 =5= 6 |下一页|末页| 5/6
    var html = '', 
        pageArray = []; 
    var option = this.option;

    // 最左边的首页按钮
    pageArray.push({
        name: '首页', 
        value: option.firstPage, 
        disabled: option.isFirstPage
    });
    // 上一页按钮
    pageArray.push({
        name    : '上一页', 
        value   : option.prePage, 
        disabled: !option.hasPreviousPage
    });
    // 中间显示的页数按钮
    option.navigatePageNums.forEach(function(pageNum) {
        pageArray.push({
            name    : pageNum, 
            value   : pageNum, 
            active  : (pageNum === option.pageNum)
        });
    });
    //下一页按钮
    pageArray.push({
        name    : '下一页',
        value   : option.nextPage,
        disabled: !option.hasNextPage
    });
    // 最右边的首页按钮
    pageArray.push({
        name: '末页', 
        value: option.lastPage, 
        disabled: option.isLastPage
    });

    // 渲染 HTML
    html = _apec.renderHtml(templatePagination, {
        pageArray: pageArray, 
        pageNum: option.pageNum, 
        pages: option.pages
    });
    return html;
}

module.exports = Pagination;