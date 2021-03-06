/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-20T13:47:19+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-20T19:01:39+08:00
 */
'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
}

module.exports = _product;
