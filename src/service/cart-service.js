/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-15T22:38:40+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-15T22:40:36+08:00
 */
'use strict';

var __mm = require('util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _mm.request({
            url: __mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
}

module.exports = _cart;
