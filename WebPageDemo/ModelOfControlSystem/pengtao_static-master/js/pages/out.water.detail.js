window.onload = function() {

    'use strict';

    let vBox = new Vue({
        el: '#v-box',
        data: {
            data: {
                id: '20171108255',
                pname: '天弘配送站',
                uname: '常思捷',
                phone: '17673059220',
                date: '2017年11月8日',
                status: 1,
                overdraft: 0,
                qrcode: 'image/qrcode.png',
                orderList: [
                    {
                        id: '00001',
                        name: '一号水',
                        num: 87,
                        price: 870,
                        receive: 0
                    },
                    {
                        id: '00002',
                        name: '二号水',
                        num: 70,
                        price: 35,
                        receive: 0
                    },
                ],
                bucketList: [
                    {
                        type: 0,
                        name: '一号桶',
                        num: 50
                    },
                    {
                        type: 0,
                        name: '二号桶',
                        num: 70
                    },
                    {
                        type: 1,
                        name: '三号桶',
                        num: 10
                    },
                ]
            },
            deliveryList: [
                { name: '贺华杰', value: '0' },
                { name: '鲍傳堰', value: '1' },
                { name: '张琦', value: '2' },
                { name: '吴嘉辉', value: '3' },
                { name: '贺华杰', value: '4' },
            ]
        },
        filters: {
            bucketType: function(data) {
                switch(data) {
                    case 0: return '欠桶';
                    case 1: return '存桶';
                    case 2: return '还桶';
                    case 3: return '买桶';
                    case 4: return '换桶';
                    case 5: return '杂桶';
                    default: return '意料之外桶';
                }
            }
        }
    });

    let id = $('#orderId').html();

    // barcode 要单独初始化
    $('#barcode').JsBarcode(id);

    $(document).on('click', '#btn-delivery', function() {
        $.ajax({
            url: '',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                dname: $('#sel-dman').val()
            },
            success: function(data) {
                if(data.code == 0) {
                    $('.box-body').html('');
                    MessageBox($('.box-body'), 'WARNING', '失败！', '配送申请发送不成功！请重试！');
                    $('.alert').after('<div class="pull-right"><button class="btn btn-primary" id="btn-not-pass">刷新页面</button></div>');
                    $(document).on('click', '#btn-not-pass', function() {
                        window.location.reload();
                    });
                } else if(data.code == 1) {
                    $('.box-body').html('');
                    MessageBox($('.box-body'), 'SUCCESS', '成功', '配送申请发送成功！');
                    $('.alert').after('<div class="pull-right"><button class="btn btn-primary" id="btn-pass">查看订单</button></div>');
                    $(document).on('click', '#btn-pass', function() {
                        window.location.href = '这是一个地址?id=' + id;
                    });
                }
            },
            error: function() {
                //TODO: 发送失败后做的事情
                if($('.alert-danger').length == 0) {
                    MessageBox($('.msg'), 'DANGER', '错误', '服务器未响应！');
                }
            }
        });
    });
};