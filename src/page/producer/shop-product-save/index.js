/*
* @Author: Polylanger
* @Date:   2018-04-08 17:39:11
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-14 16:05:33
*/
'use strict'
// product-save: 卖家修改商品信息或添加新的商品
require('./index.css')
require('node_modules/simditor/styles/simditor.css');

require('page/common/producer/nav/index.js');
require('page/common/header/index.js');
const _apec = require('util/apec.js');
const _product = require('service/producer/product-service.js');
const _category = require('service/producer/category-service.js');
const _cart = require('service/cart-service.js');
const navSide = require('page/common/producer/nav-side/index.js');
const Simditor = require('node_modules/simditor/lib/simditor.js');

const templateIndex = require('./index.string');
const templateImage = require('./image.string');

// 为数组对象定义 remove 方法
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}

const page = {
    editor: null, 
    data: {
        productId: _apec.getUrlParam('productId') || '', 
        productInfo: {
            name        : '', 
            subtitle    : '', 
            categoryIdLv1 :  0, 
            categoryIdLv2 :  0, 
            categoryIdLv3 :  0, 
            price       : '', 
            stock       : '', 
            subImages   : [], 
            imageHost   : '', 
            detail      : '', 
        }
    }, 
    init: function() {
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({name: 'product-manage'});
        var _this = this;
        // url 上有 productId 参数，说明是修改商品，修改 title/面包屑导航，加载商品信息
        if(this.data.productId) {
            _product.getProductDetail(this.data.productId, function(res) {
                // 分割 'img1,img2,...'
                res.subImages = res.subImages.split(',');
                // 给每个 image-url 前添加 imageHost
                res.subImages = $.map(res.subImages, (item) => {
                    return res.imageHost + item;
                });
                $.extend(_this.data.productInfo, res);
                // 初始化 panel-body
                _this.loadProductHtml();
                // 初始化 Simditor
                _this.loadSimditor();
                // 加载一级品类信息
                _this.loadCategoryByLevel(1);
                // 加载二级品类信息
                _this.loadCategory(2, res.categoryIdLv1, res.categoryIdLv2);
                // 加载三级品类信息
                _this.loadCategory(3, res.categoryIdLv2, res.categoryIdLv3);
            }, function(errMsg) {
                $('.page-wrap').html('<p class="error-tips">此商品太淘气，找不到了</p>')
            });
        } else {
            // 初始化 panel-body
            this.loadProductHtml();
            // 初始化 Simditor
            this.loadSimditor();
            // 加载一级品类信息
            this.loadCategoryByLevel(1);
        }
    }, 
    bindEvent: function() {
        var _this = this;
        // 一级品类状态监控
        $(document).on('change', '#level-1-category', function() {
            // 当二级品类需要更新时再联动
            if ($(this).val() != _this.data.productInfo.categoryIdLv1) {
                // 记录一级品类值
                _this.data.productInfo.categoryIdLv1 = parseInt($(this).val());
                // 一、二级品类联动
                _this.loadCategoryByLevel(2);
                // 三级品类清空
                $('#level-3-category').html('<option value="">请选择</option>');
            }
        });
        // 二级品类状态监控
        $(document).on('change', '#level-2-category', function() {
            // 当二三级品类需要更新时再联动
            if ($(this).val() != _this.data.productInfo.categoryIdLv2) {
                // 记录二级品类值
                _this.data.productInfo.categoryIdLv2 = parseInt($(this).val());
                // 二、三级品类联动
                _this.loadCategoryByLevel(3);
            }
        });
        // 添加图片: 点击添加区域，trigger -> file-input -> input.change()
        $(document).on('click', '.image-add', function() {
            $('#add-image').trigger('click');
        })
        // 上传图片: 同一张图片不能连续上传两次 
        $(document).on('change', '#add-image', function() {
            var formData = new FormData();
            formData.append('upload_file', $('#add-image')[0].files[0]);
            _product.uploadProductImage(formData, function(res) {
                // 记录下商品信息
                _this.data.productInfo.subImages.push(res.url);
                _this.loadImageList();
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
        // 删除图片
        $(document).on('click', '.fa-close', function() {
            $(this).parents('.image-item').addClass('deleted');
            $.each($('.image-item'), (index, item) => {
                if ($(item).hasClass('deleted')) {
                    // 删除 subImages 中的该元素
                    _this.data.productInfo.subImages.remove(index);
                    // 重新加载 image-list
                    _this.loadImageList();
                    return;
                }
            });
        });
        // 提交表单
        $(document).on('click', '.btn-submit', function() {
            // 组装表单
            var formData = {
                id: $.trim($('#name').data('product-id')), 
                name: $.trim($('#name').val()), 
                subtitle: $.trim($('#subtitle').val()), 
                subImages: _this.processImages(_this.data.productInfo.subImages), 
                detail: $.trim(_this.editor.getValue()), 
                price: $.trim($('#price').val()), 
                stock: $.trim($('#stock').val()), 
                categoryId: $.trim(parseInt($('#level-3-category').val())), 
            };
            _product.save(formData, function(res) {
                window.location.href = '../producer/shop-product-manage.html';
            }, function(errMsg) {
                _apec.errorTips(errMsg);
            });
        });
    }, 
    processImages: function(imageArray) {
        var images = '';
        $.each(imageArray, (index, item) => {
            // 只保留文件名，不上传 http://image.apec.com/
            var filename = item.split('/').pop();
            images = (index == 0) ? (images + filename) : (images + ',' + filename);
        });
        return images;
    }, 
    // 加载商品详情数据
    loadDetail: function() {

    }, 
    // getProductInfo: function() {
    //     var _this = this;
    //     this.data.productInfo.name = $.trim($('#name').val());
    //     this.data.productInfo.subtitle = $.trim($('#subtitle').val());
    //     this.data.productInfo.categoryIdLv1 = $.trim($('#level-1-category').val());
    //     this.data.productInfo.categoryIdLv2 = $.trim($('#level-2-category').val());
    //     this.data.productInfo.categoryIdLv3 = $.trim($('#level-3-category').val());
    //     this.data.productInfo.price = $.trim($('#price').val());
    //     this.data.productInfo.stock = $.trim($('#stock').val());
    //     this.data.productInfo.detail = $.trim(this.editor.getValue());
    // }, 
    // loadProductDetail: function() {
    //     // 加载 html
    //     this.loadProductHtml();
    //     // 加载 category 数据
    //     this.loadCategoryByLevel(1);
    //     if (this.data.productInfo.categoryIdLv1) {
    //         this.loadCategoryByLevel(2);
    //     }
    //     if (this.data.productInfo.categoryIdLv2) {
    //         this.loadCategoryByLevel(3);
    //     }
    //     // 加载 simditor 数据
    //     this.loadSimditor();
    // }, 
    loadProductHtml: function() {
        this.filterProductInfo();
        // 加载 productInfo 数据
        var detailHtml = _apec.renderHtml(templateIndex, this.data.productInfo);
        $('.panel-body').html(detailHtml);
    }, 
    loadImageList: function() {
        this.filterProductInfo();
        // 加载 productInfo 数据
        var imageHtml = _apec.renderHtml(templateImage, {
            subImages   : this.data.productInfo.subImages, 
            showAdd     : this.data.productInfo.showAdd
        });
        $('.image-list').html(imageHtml);
    }, 
    filterProductInfo: function() {
        this.data.productInfo.showAdd = 
            this.data.productInfo.subImages.length != 5;
    }, 
    loadSimditor: function() {
        this.editor = new Simditor({
            textarea: $('#rich-editor'),
            placeholder: "请编辑产品详情",
            defaultImage: "assets/images/img-default.png",
            toolbar: toolbar,
            upload: {
                url: '/product/upload-simditor',
                fileKey: 'upload_file',
                connectionCount: 3,
                leaveConfirm: '正在上传，确定离开？'
            }
        });
        this.editor.setValue(this.data.productInfo.detail);
    }, 
    loadCategoryByLevel: function(level) {
        var _this = this, 
            selector = $('#level-' + level + '-category'), 
            optionHtml = '<option value="">请选择</option>', 
            parentId = 0;
        // 一级类别的 parentId=0
        if (level != 1) {
            parentId = $('#level-' + (level-1) + '-category').val();
        }
        _category.getCategory(parentId, function(res) {
            for (var i = 0; i < res.length; i++) {
                if (_this.data.productInfo['categoryIdLv'+level] === res[i].id) {
                    optionHtml += '<option value="'+ res[i].id + '" selected="selected">' + res[i].name + '</option>';
                } else {
                    optionHtml += '<option value="'+ res[i].id + '">' + res[i].name + '</option>';
                }
            }
            selector.html(optionHtml);
        }, function(errMsg) {
            _apec.errorTips(errMsg);
        });
    }, 
    loadCategory: function(level, parentId, categoryId) {
        var selector = $('#level-' + level + '-category'), 
            optionHtml = '<option value="">请选择</option>'; 
        _category.getCategory(parentId, function(res) {
            for (var i = 0; i < res.length; i++) {
                if (categoryId === res[i].id) {
                    optionHtml += '<option value="'+ res[i].id + '" selected="selected">' + res[i].name + '</option>';
                } else {
                    optionHtml += '<option value="'+ res[i].id + '">' + res[i].name + '</option>';
                }
            }
            selector.html(optionHtml);
        }, function(errMsg) {
            _apec.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
})