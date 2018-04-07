/*
* @Author: Polylanger
* @Date:   2018-04-05 18:34:49
* @Last Modified by:   Polylanger
* @Last Modified time: 2018-04-05 19:28:30
*/

'use strict'

const _apec = require('util/apec.js');
const _producer = { 
    
    // 检查卖家是否已经开通店铺
    checkOpenShop: function(resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/user/get_producer_info.do'), 
            method  : 'POST', 
            success : resolve, 
            error   : reject
        });
    }, 

    // 获取卖家信息
    getProducerInfo: function(resolve, reject) {
        _apec.producerRequest({
            url     : _apec.getServerUrl('/producer/user/get_information.do'), 
            method  : 'POST', 
            success : resolve, 
            error   : reject
        });
    }, 

};

module.exports = _producer;