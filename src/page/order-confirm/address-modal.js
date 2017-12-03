/**
 * @Author: 王宇 <moke>
 * @Date:   2017-11-27T20:22:28+08:00
 * @Email:  edwardwang0302@me.com
 * @Last modified by:   moke
 * @Last modified time: 2017-11-27T21:57:58+08:00
 */
 'use strict';

 var _mm = require('util/mm.js');
 var _cities = require('util/cities/index.js');
 var _address = require('service/address-service.js');
 var templateAddressModal = require('./address-modal.string');

 var addressModal = {
     show: function(option) {
         // option的绑定
         this.option = option;
         this.option.data = option.data || {};

         this.$modalWrap = $('.modal-wrap');
         // 渲染页面
         this.loadModal();
         // 绑定事件
         this.bindEvent();
     },
     bindEvent: function() {
         var _this = this;
         // 省份和城市的二级联动
         this.$modalWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
         });
         // 提交收货地址
         this.$modalWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                // 传入的变量用于区分是添加还是编辑
                isUpdate = _this.option.isUpdate;
            // 使用新地址且验证通过
            if(!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 更新收件人并且验证通过
            else if(isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function(res) {
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
            }
         });
         // 为了保证点击modal内容区，不关闭弹窗
         this.$modalWrap.find('.modal-container').click(function(e) {
             e.stopPropagation();
         });
         // 关闭弹窗 点击关闭或者蒙版区域
         this.$modalWrap.find('.close').click(function() {
             _this.hide();
         });
     },
     loadModal: function() {
         var addressModalHtml = _mm.renderHtml(templateAddressModal, {
             isUpdate: this.option.isUpdate,
             data: this.option.data
         });
         this.$modalWrap.html(addressModalHtml);
         // 加载省份 城市
         this.loadProvince();
     },
     // 加载省份信息
     loadProvince: function() {
         var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址，并且有省份信息做省份的回填
        if(this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
     },
     // 加载城市信息
     loadCities: function(provinceName) {
         var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址，并且有城市信息做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
     },
     // 获取变淡收件人信息，并做表单的验证
     getReceiverInfo: function() {
         var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if(this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 表单验证
        if(!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if(!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if(!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if(!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else if(!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号码';
        }
        // 都通过了
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
     },
     // 获取select框的选项，输入：array 输出：html
     getSelectOption: function(optionArray) {
         var html = '<option value="">请选择</option>';
         for(var i=0, length=optionArray.length; i<length; i++) {
             html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>'
         }
         return html;
     },
     // 关闭弹窗
     hide: function() {
         this.$modalWrap.empty();
     }
 };
 module.exports = addressModal;
