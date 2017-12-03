/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-30T21:40:05+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-30T21:46:30+08:00
 */
 'use strict';

 var _mm = require('util/mm.js');

 var _payment = {
     // 获取支付信息
     getPaymentInfo: function(orderNumber, resolve, reject) {
         _mm.request({
             url: _mm.getServerUrl('/order/pay.do'),
             data:{
                orderNo: orderNumber
             },
             success: resolve,
             error: reject
         });
     },
     // 获取订单状态
     getPaymentState: function(orderNumber, resolve, reject) {
         _mm.request({
             url: _mm.getServerUrl('/order/query_order_pay_status.do'),
             data:{
                orderNo: orderNumber
             },
             success: resolve,
             error: reject
         });
     }
 }

 module.exports = _payment;
