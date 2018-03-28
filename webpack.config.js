/*
* @Author: Polylanger
* @Date:   2018-03-27 20:46:49
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-03-28 16:06:25
*/

'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取 html-webpack-plugin 参数的方法
var getHtmlConfig = function(name){
	return {
            template: __dirname + "/src/view/" + name + ".html", 	// 本地模板文件的位置
            filename: "view/" + name + ".html", 					// 相对于 config.output.path 即：/dist/
            inject: true, 				// 所有 JavaScript 静态资源插入到 body 元素的底部
            hash: true, 				// 为所有注入的静态资源添加 webpack 每次编译产生的唯一 hash 值
            chunks: ["common", name]	// 允许插入到模板中的 trunks
    	};
}

// 环境变量的配置：dev | online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// webpack config
var config = {
	// webpack 基本配置
	entry: {								// 唯一入口文件
		'common'	: [__dirname + '/src/page/common/index.js'],
		'index'		: [__dirname + '/src/page/index/index.js'],
		'login'		: [__dirname + '/src/page/login/index.js'],
	}, 
	output: {
		path: __dirname + '/dist', 			// 打包后的文件路径
		publicPath : '/dist',	// webpack-dev-server 访问文件时的路径
		filename: 'js/[name].js'			// 打包后输出文件的文件名
	}, 
	externals: {
		'jquery': 'window.jQuery'
	}, 
	// Loaders 
	module: {
		rules:[
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
        }

    ]
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
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
};

if('dev' == WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8388/');
}

module.exports = config;