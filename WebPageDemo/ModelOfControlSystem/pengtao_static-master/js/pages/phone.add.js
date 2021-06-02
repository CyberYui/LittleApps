/*
 * @Author: Chaos J 
 * @Date: 2017-12-14 20:21:59 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-23 16:49:53
 */

 window.onload = function() {

    'use strict'

    let vTable = new Vue({
        el: '#v-table',
        data: {
            list: [
                { id: 14323, name: '破败王者之刃', num: 123 },
                { id: 12135, name: '海克斯饮魔刀', num: 558 },
                { id: 53431, name: '三相之力', num: 234 },
                { id: 14523, name: '死刑宣告', num: 85 },
                { id: 46451, name: '兰德里的折磨', num: 113 },
                { id: 14234, name: '虚空之杖', num: 964 }
            ]
        }
    });
    
    // textarea
    let tArea = Textarea2.getNew();
    tArea.init('#textarea2');

    $('#btn-add').click(function() {
        $('#type').val('-1');
        $('#num').val('');
        $('#modal-add').modal('show');
    });
    $('#btn-add-save').click(function() {
        let pass = true
        let $type = $('#type option:selected')
        let $num = $('#num')
        
        $('.callout').remove();
        if(isEmpty($type.val()) || $type.val() === '-1') {
            pass = MessageAlert($type.parent(), 'DANGER', '该项不能为空')
        }
        if(isEmpty($num.val())) {
            pass = MessageAlert($num, 'DANGER', '该项不能为空')
        } else if(isNegative($num.val()) || !isInt($num.val())) {
            pass = MessageAlert($num, 'WARNING', '请输入正整数')
        }

        if(!pass) return

        // 判断添加的商品是否在列表里面了
        let objIndex = getObjInIndexArray($type.val(), vTable.list);
        if(objIndex == -1) {
            vTable.list.push({
                id: $type.val(),
                name: $type.text(),
                num: $num.val()
            })
        } else {
            let oNum = vTable.list[objIndex].num;
            let sum = parseInt(oNum) + parseInt($num.val());
            vTable.list[objIndex].num = sum;
        }

        $('#modal-add').modal('hide')
    })
    $(document).on('click', '.btn-del', function(e) {
        let id = getIdInTr(e);
        removeObjInArray(id, vTable.list);
        $('#modal-alert').modal('hide');
    })

    $('#btn-save').click(function() {
        if(tArea.getLength() > 255) {
            $('.callout').remove();
            MessageAlert($('#textarea2').parent(), 'DANGER', '字数不能超过255个字')
            return;
        }
        let list = [];
        for(let item of vTable.list) {
            list.push({
                id: item.id,
                num: item.num
            })
        }
        $.ajax({
            type: 'POST',
            url: '湿哒哒我如果水电费手动阀我大声道',
            data: {
                id: $('#DSID').val(),
                remark: tArea.toString(),
                list: list
            },
            success: function() {
                $('.box-body').html('')
                $('.box-header').remove()
                MessageBox($('.box-body'), 'SUCCESS', '成功', '成功新增一条记录')
                $('.box-footer').append(`
                    <div class="form-group pull-right">
                        <button class="btn btn-primary" style="width: 200px">返回</button>
                    </div>`
                )
            },
            error: function() {
                $('.alert').remove()
                MessageBox($('.msg'), 'DANGER', '服务器错误', '暂时无法连接到服务器，请重新刷新页面')
                
            }
        })
    })
 }