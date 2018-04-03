/*
* @Author: Polylanger
* @Date:   2018-03-27 20:46:49
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-03 14:11:52
*/

'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量的配置：dev | online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 获取 html-webpack-plugin 参数的方法
var getHtmlConfig = function(name, title){
	return {
            template: __dirname + "/src/view/" + name + ".html", 	// 本地模板文件的位置
            filename: "view/" + name + ".html", 					// 相对于 config.output.path 即：/dist/
            title: title, 
            inject: true, 				// 所有 JavaScript 静态资源插入到 body 元素的底部
            hash: true, 				// 为所有注入的静态资源添加 webpack 每次编译产生的唯一 hash 值
            chunks: ["common", name]	// 允许插入到模板中的 trunks
    	};
}

// webpack config
var config = {
	// webpack 基本配置
	entry: {								// 唯一入口文件
		'common'	        : [__dirname + '/src/page/common/index.js'],
		'index'		        : [__dirname + '/src/page/index/index.js'],
        'list'              : [__dirname + '/src/page/list/index.js'],
        'detail'            : [__dirname + '/src/page/detail/index.js'],
        'cart'              : [__dirname + '/src/page/cart/index.js'],
        'order-confirm'     : [__dirname + '/src/page/order-confirm/index.js'],
        'order-detail'      : [__dirname + '/src/page/order-detail/index.js'],
        'order-list'        : [__dirname + '/src/page/order-list/index.js'],
        'payment'           : [__dirname + '/src/page/payment/index.js'],
		'user-login'        : [__dirname + '/src/page/user-login/index.js'],
        'user-register'     : [__dirname + '/src/page/user-register/index.js'],
        'user-pass-reset'   : [__dirname + '/src/page/user-pass-reset/index.js'],
        'user-center'       : [__dirname + '/src/page/user-center/index.js'],
        'user-center-update': [__dirname + '/src/page/user-center-update/index.js'],
        'user-pass-update'  : [__dirname + '/src/page/user-pass-update/index.js'],
        'result'            : [__dirname + '/src/page/result/index.js']
	}, 
	output: {
		path: __dirname + '/dist', 			// 打包后的文件路径
		publicPath : '/dist',				// webpack-dev-server 访问文件时的路径
		filename: 'js/[name].js'			// 打包后输出文件的文件名
	}, 
	externals: {
		'jquery': 'window.jQuery'
	}, 
	// Loaders 
	module: { rules:[
		// 处理 CSS 的 Loader
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback:"style-loader",		// 编译后用 style-loader 提取 CSS 文件
                use:"css-loader"				// 用该 css-loader 编译 CSS 文件
            })
        }, 
        // 处理图片的 Loader
        {
        	test: /\.(ico|gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
        	use: [{
        		loader: 'url-loader', 
	        	options: {
	        		limit: '100', 					// 当文件小于 100 字节时，文件编码并返回 DataURL；否则调用 file-loader 进行处理
	        		name: 'resource/[name].[ext]'	// 文件输出位置及文件命名规则
	        	}
        	}]
        }, 
        // 处理模板 (.string) 的 loader
        {
        	test: /.string$/, 
        	loader: 'html-loader'
        }
    ]},
    resolve: {
    	// 别名
    	alias: {
    		util: __dirname + '/src/util', 
    		page: __dirname + '/src/page', 
    		service: __dirname + '/src/service', 
    		image: __dirname + '/src/image', 
    		view: __dirname + '/src/view', 
    		node_modules: __dirname + '/node_modules'
    	}
    }, 
	plugins: [
		// 提取公共模块 -> js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', 
			filename: 'js/base.js'
		}), 
		// 分离 CSS 单独打包
		new ExtractTextPlugin('css/[name].css'), 
		// 依据 html 模板，生成一个自动引用打包后 js 文件的新 html
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')), 
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
	]
};

if('dev' == WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost.:8088')
}

module.exports = config;