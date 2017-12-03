/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-15T22:51:01+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-20T13:50:21+08:00
 */
 'use strict';
 require('./index.css');

 var _mm = require('util/mm.js');
// 通用页面头部
 var header = {
     init: function() {
         this.bindEvent();
         this.onLoad();
     },
     onLoad: function() {
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
     },
     bindEvent: function() {
         var _this = this;
         // 点击搜索按钮以后，做搜索提交
         $('#search-btn').click(function() {
             _this.searchSubmit();
         });
         // 输入回车后，搜索
         $('#search-input').keyup(function(e) {
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
         });
     },
     // 搜索的提交
     searchSubmit: function() {
         var keyword = $.trim($('#search-input').val());
         // 如果提交的时候有keyword，正常跳转到list页
         if(keyword) {
             window.location.href = './list.html?keyword=' + keyword;
         }
         // 如果keyword为空，直接返回首页
         else {
             _mm.goHome();
         }
     }
 };

header.init();
