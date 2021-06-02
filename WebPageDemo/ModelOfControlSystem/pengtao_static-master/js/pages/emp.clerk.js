/*
 * @Author: Chaos J 
 * @Date: 2017-12-12 14:48:48 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-12 15:43:20
 */

window.onload = function() {

    'use strict';

    // 打开新增员工窗口
    $(document).on('click', '#btn-add', function() {
        $('#add-name').val('');
        $('#add-phone').val('');
        $('#add-salary').val('-1');
        $('#modal-add').modal('show');
    });

    // 点击确认添加按钮
    $(document).on('click', '#add-save', function() {
        let pass = true;
        let $name = $('#add-name');
        let $phone = $('#add-phone');
        let $salary = $('#add-salary option:selected');

        $('.callout.callout-msg').remove();
        if(isEmpty($name.val())) {
           MessageAlert($name, 'DANGER', '此项不能为空');
           pass = false;
        }
        if(isEmpty($phone.val())) {
            MessageAlert($phone, 'DANGER', '此项不能为空');
            pass = false;
        } else if (!isPhone($phone.val())) {
            MessageAlert($phone, 'WARNING', '请输入正确的手机号');
            pass = false;
        }
        if($salary.val() === '-1') {
            MessageAlert($salary.parent(), 'DANGER', '此项不能为空');
            pass = false;
        }

        if(!pass) return;
        
        $('#modal-add form').submit();
    });

    // 点击修改按钮
    $(document).on('click', '.btn-edit', function() {
        let rows = $(this).parent().parent().find('td');
        console.log(rows);
        $('#edit-name').val(rows[2].textContent);
        $('#edit-phone').val(Number(rows[3].textContent));
        $("#edit-salary").val($(rows[4]).attr('data-id'));
        // 二次判断select是否被选中了
        if(isEmpty($('#edit-salary option:selected'))) {
            $("#edit-salary").val('-1');
        }
        $('#modal-edit').modal('show');
    });

    // 点击修改确定按钮
    $(document).on('click', '#edit-save', function() {
        let pass = true;
        let $name = $('#edit-name');
        let $phone = $('#edit-phone');
        let $salary = $('#edit-salary option:selected');

        $('.callout.callout-msg').remove();
        if(isEmpty($name.val())) {
           MessageAlert($name, 'DANGER', '此项不能为空');
           pass = false;
        }
        if(isEmpty($phone.val())) {
            MessageAlert($phone, 'DANGER', '此项不能为空');
            pass = false;
        } else if (!isPhone($phone.val())) {
            MessageAlert($phone, 'WARNING', '请输入正确的手机号');
            pass = false;
        }
        if($salary.val() === '-1') {
            MessageAlert($salary.parent(), 'DANGER', '此项不能为空');
            pass = false;
        }

        if(!pass) return;
        
        $('#modal-edit form').submit();
    });

    $(document).on('click', '.btn-del', function() {
        $('#modal-del').modal('show');
    });
}