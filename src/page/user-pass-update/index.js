/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-19T17:43:00+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-19T18:05:46+08:00
 */
 'use strict';

 require('./index.css')
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
 var _mm = require('util/mm.js');
 var _user = require('service/user-service.js');

 // page逻辑部分
 var page = {
     init: function() {
         this.onLoad();
         this.bindEvent();

     },
     onLoad: function() {
         // 初始化左侧菜单
         navSide.init({
             name: 'user-pass-update'
         });
     },
     bindEvent: function() {
         var _this = this;
         // 事件冒泡
         $(document).on('click', '.btn-submit', function() {
             // 点击提交后的动作
             var userinfo = {
                 password: $.trim($('#password').val()),
                 passwordNew: $.trim($('#password-new').val()),
                 passwordConfirm: $.trim($('#password-confirm').val()),
             },
             validateResult = _this.validateForm(userinfo);

             if(validateResult.status) {
                 // 更改用户密码
                 _user.updatePassword({
                     passwordOld: userinfo.password,
                     passwordNew: userinfo.passwordNew
                 }, function(res, msg) {
                     _mm.successTips(msg);
                 }, function(errMsg) {
                     _mm.errorTips(errMsg);
                 });
             } else {
                 _mm.errorTips(validateResult.msg);
             }
         });
     },
     // 验证字段信息
     validateForm: function(formData) {
         var result = {
             status: false,
             msg: ''
         };
         // 验证原密码是否为空
         if(!_mm.validate(formData.password, 'require')) {
             result.msg = '原密码不能为空';
             return result;
         }
         // 验证新密码
         if(!formData.passwordNew || formData.passwordNew.length < 6) {
             result.msg = '密码长度不得小于6位';
             return result;
         }
         // 验证两次是否一致
         if(formData.passwordNew !== formData.passwordConfirm) {
             result.msg = '两次输入的密码不一致';
             return result;
         }

         // 通过验证，返回正确提示
         result.status = true;
         result.msg = '验证通过';

         return result;
     }
 };

 $(function(){
     page.init();
 });
