/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-13T21:12:04+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-20T12:50:15+08:00
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');
var _mm = require('util/mm.js');

$(function() {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张的操作绑定
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev':'next';
        $slider.data('unslider')[forward]();
    });
});
