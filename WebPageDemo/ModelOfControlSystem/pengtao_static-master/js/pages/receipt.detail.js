window.onload = function() {

    'use strict';

    let vBucket = new Vue({
        el: '#v-bucket',
        data: {
            bucketList: []
        }
    });

    // 初始化iCheck
    $('.rdo').iCheck({
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });

    // barcode 要单独初始化
    $('#barcode').JsBarcode('201711161412135855294');

    // 添加桶
    $(document).on('click', '#btn-add', function() {
        // 清空数据
        $('#select-type').val(-1);
        $('#select-name').val(-1);
        $('#input-number').val('');
        $('#modal-add').modal('show');
    });

    // 确认添加桶
    $(document).on('click', '#btn-save', function() {
        let pass     = true;
        let $type    = $('#select-type');
        let $name    = $('#select-name');
        let $number  = $('#input-number');

        if(DEBUG) {
            console.log('添加新的桶：'
                + '\n类型: ' + $type.val()
                + '\n名称: ' + $name.val()
                + '\n数量: ' + $number.val()
            );
        }

        // 提醒信息
        $('.callout').remove();
        if(isEmpty($type.val()))   { MessageAlert($type, 'DANGER', '请选择桶类型')   ; pass = false; } 
        if(isEmpty($name.val()))   { MessageAlert($name, 'DANGER', '请选择商品名称') ; pass = false; }
        if(isEmpty($number.val())) { 
            MessageAlert($number, 'DANGER' , '请输入桶数量'); pass = false; 
        } else if(!isInt($number.val()) || isNegative($number.val())) { 
            MessageAlert($number, 'WARNING' , '请输入正整数') ; pass = false; 
        }
        if(!pass) return;

        $('#modal-add').modal('hide');

        // 操作类型是否在数组内
        let list = vBucket.bucketList;
        for(let i = 0; i < list.length; i++) {
            if($type.val() == list[i].typeId && $name.val() == list[i].nameId) {
                let sum = parseInt($number.val()) + parseInt(list[i].num);
                vBucket.bucketList[i].num = sum;
                return;
            }
        }

        vBucket.bucketList.push({ 
            id  : Date.parse(new Date()) / 1000,
            name: $name.find("option:selected").text(),
            nameId: $name.val(),
            type: $type.find("option:selected").text(),
            typeId: $type.val(),
            num : $number.val()
        });
    });

    // 删除桶
    $(document).on('click', '.btn-del', function(e) {
        let id = getIdInTr(e);
        removeObjInArray(id, vBucket.bucketList);
    });

    // 提交
    $(document).on('click', '#btn-submit', function() {
        let pass = true;
        let $pay = $('#text-pay');
        let $repay = $('#text-repay');
        let $debt = $('#text-debt');

        // 提醒信息
        $('.callout.callout-msg').remove();
        $('.item-num').each(function(index, element) {
            if(isEmpty($(element).val())) {
                MessageAlert($(element), 'DANGER', '请输入数量'); pass = false;
            } else if(!isInt($(element).val()) || isNegative($(element).val())) {
                MessageAlert($(element), 'WARNING', '请输入正整数'); pass = false;
            } else if($(element).parent().parent().find('.num').text() < $(element).val()) {
                MessageAlert($(element), 'WARNING', '实收数不能大于桶数量'); pass = false;
            }
        });
        if(isEmpty($pay.val())) { 
            MessageAlert($pay.parent(), 'DANGER', '请输入实付金额'); pass = false; 
        } else if(isNegative($pay.val())) {
            MessageAlert($pay.parent(), 'WARNING', '请输入正数'); pass = false; 
        }
        if(isEmpty($repay.val())) { 
            MessageAlert($repay.parent(), 'DANGER', '请输入还款金额'); pass = false; 
        } else if(isNegative($repay.val())) {
            MessageAlert($repay.parent(), 'WARNING', '请输入正数'); pass = false; 
        }
        if(isEmpty($debt.val())) { 
            MessageAlert($debt.parent(), 'DANGER', '请输入本次欠款金额'); pass = false; 
        } else if(isNegative($debt.val())) {
            MessageAlert($debt.parent(), 'WARNING', '请输入正数'); pass = false; 
        }

        if(!pass) return;

        // 将商品打包成Array
        let waterList = [];
        $('.item-num').each(function(index, element) {
            let o = {};
            o.waterId = $(element).parent().parent().attr('id');
            o.num = $(element).val();
            waterList.push(o);
        });

        // 将桶打包成Array
        let bucketList = [];
        for(let item of vBucket.bucketList) {
            let o = {}
            o.type = typeId;
            o.bucketId = item.nameId;
            o.num = item.num;
            bucketList.push(o);
        }

        // 提交
        $.ajax({
            type: 'POST',
            url: '/save.do',
            dataType: 'json',
            data: {
                orderID: $('#orderId').html(),
                waterItems: waterList,
                bucketItems: bucketList,
                pay: $pay.val(),
                repay: $repay.val(),
                debt: $debt.val()
            },
            success: function(data) {
                if(data.errorMsg == 0) {
                    $('.box-body').html('');
                    MessageBox($('.box-body'), 'SUCCESS', '成功！', '上传成功！');
                    $('.alert').after('<div class="pull-right"><button class="btn btn-primary" id="btn-return">返回出水管理</button></div>');
                    $(document).on('click', '#btn-return', function() {
                        window.location.href = 'receipt.html';
                    });
                } else if (data.errorMsg == 1) {
                    $('.box-body').html('');
                    MessageBox($('.box-body'), 'DANGER', '失败！', '上传信息有误，请检查！');
                    $('.alert').after('<div class="pull-right"><button class="btn btn-primary" id="btn-refresh">刷新页面</button></div>');
                    $(document).on('click', '#btn-refresh', function() {
                        window.location.reload();
                    });
                }
            },
            error: function() {
                if(DEBUG) console.error('提交数据失败');
                if($('.alert-danger').length == 0) {
                    MessageBox($('.msg'), 'DANGER', '错误！', '无法访问服务器！');
                }
            }
        })
    });
};