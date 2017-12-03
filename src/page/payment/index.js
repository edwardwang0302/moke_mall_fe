/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-30T21:06:04+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-30T21:46:43+08:00
 */
 'use strict';

 require('./index.css')
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var _mm = require('util/mm.js');
 var _payment = require('service/payment-service.js');
 var templateIndex = require('./index.string');

 // page逻辑部分
 var page = {
     data: {
         orderNumber: _mm.getUrlParam('orderNumber')
     },
     init: function() {
         this.onLoad();
     },
     onLoad: function() {
         // 加载支付信息
         this.loadPaymentInfo();
     },

     // 加载订单详情
     loadPaymentInfo: function() {
         var _this = this,
             paymentHtml = '',
             $pageWrap = $('.page-wrap');

         $pageWrap.html('<div class="loading"></div>')
         _payment.getPaymentInfo(this.data.orderNumber, function(res) {
             // 渲染html
             paymentHtml = _mm.renderHtml(templateIndex, res);
             $pageWrap.html(paymentHtml);
             _this.listenOrderStatus();
         }, function(errMsg) {
             $pageWrap.html('<p class="err-tip">'+errMsg+'</p>')
         });
     },
     // 监听订单状态
     listenOrderStatus: function() {
         var _this = this;
         this.paymentTimer = window.setInterval(function() {
             _payment.getPaymentState(_this.data.orderNumber, function(res) {
                if(res === true) {
                    window.location.href
                        = './result.html?type=payment&orderNumber=' + _this.data.orderNumber
                }
             });
         }, 5e3);
     }
 };

 $(function(){
     page.init();
 });
