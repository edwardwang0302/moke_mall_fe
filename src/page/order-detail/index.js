/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-29T20:51:23+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-29T21:55:30+08:00
 */
 'use strict';

 require('./index.css')
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
 var _mm = require('util/mm.js');
 var _order = require('service/order-service.js');
 var templateIndex = require('./index.string');

 // page逻辑部分
 var page = {
     data: {
         orderNumber: _mm.getUrlParam('orderNumber')
     },
     init: function() {
         this.onLoad();
         this.bindEvent();
     },
     onLoad: function() {
         // 初始化左侧菜单
         navSide.init({
             name: 'order-list'
         });
         // 加载detail菜单
         this.loadOrderDetail();
     },
     bindEvent: function() {
         var _this = this;
         $(document).on('click', '.order-cancel', function() {
             if(window.confirm('确认取消订单？')) {
                 _order.cancelOrder(_this.data.orderNumber, function(res) {
                     _mm.successTips('该订单取消成功');
                     _this.loadOrderDetail();
                 }, function(errMsg) {
                     _mm.errorTips(errMsg);
                 });
             }
         });
     },
     // 加载订单详情
     loadOrderDetail: function() {
         var _this = this,
             orderDetailHtml = '',
             $content = $('.content');

         $content.html('<div class="loading"></div>')
         _order.getOrderDetail(this.data.orderNumber, function(res) {
             _this.dataFilter(res);
             // 渲染html
             orderDetailHtml = _mm.renderHtml(templateIndex, res);
             $content.html(orderDetailHtml);
         }, function(errMsg) {
             $content.html('<p class="err-tip">'+errMsg+'</p>')
         });
     },
     // 数据适配
     dataFilter: function(data) {
         data.needPay = data.status === 10;
         data.isCancelable = data.status === 10;
     }
 };

 $(function(){
     page.init();
 });
