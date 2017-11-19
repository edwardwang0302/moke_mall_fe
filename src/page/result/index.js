/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-16T22:33:26+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-19T11:19:36+08:00
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.'+type+'-success');
    // 显示对应的提示信息
    $element.show();
})
