/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-13T21:12:04+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-14T23:23:05+08:00
 */

'use strict';

var _mm = require('util/mm.js');

var html = '<div>{{data}}</div>'
var data = {
    data:123
}
console.log(_mm.renderHtml(html, data))
