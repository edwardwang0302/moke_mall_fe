/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-26T20:11:36+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-28T22:21:09+08:00
 */
 'use strict';

 var _mm = require('util/mm.js');

 var _order = {
     // 获取商品列表
     getProductList: function(resolve, reject) {
         _mm.request({
             url: _mm.getServerUrl('/order/get_order_cart_product.do'),
             success: resolve,
             error: reject
         });
     },
     // 提交订单
     createOrder: function(orderInfo, resolve, reject) {
         _mm.request({
             url: _mm.getServerUrl('/order/create.do'),
             data: orderInfo,
             success: resolve,
             error: reject
         });
     },
     // 获取订单列表
     getOrderList: function(listParam, resolve, reject) {
         _mm.request({
             url: _mm.getServerUrl('/order/list.do'),
             data: listParam,
             success: resolve,
             error: reject
         });
     }
 }

 module.exports = _order;
