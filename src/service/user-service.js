/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-15T22:29:12+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-15T22:36:37+08:00
 */
'use strict';

var __mm = require('util/mm.js');

var _user = {
    // 检查登录状态
    checkLogin: function(resolve, reject) {
        _mm.request({
            url: __mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
    // 登出
    logout: function(resolve, reject) {
        _mm.request({
            url: __mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;
