/*
 * @Author: Chaos J 
 * @Date: 2017-12-05 10:24:11 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-05 18:55:14
 */
window.onload = function() {

    'use strict';
    
    // 全选
    $(document).on('ifClicked', '#chb-all', function() {
        if($('#chb-all').get(0).checked) {
            $('.chb-row').iCheck('uncheck');
        } else {
            $('.chb-row').iCheck('check');
        }
    });

    // 点击行选择复选框
    $(document).on('click', '.chb-line', function() {
        $(this).find('.chb').iCheck('toggle')
    });

    // 数据
    let vTable = new Vue({
        el: '#v-table',
        data: {
            list: [
                { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', date: '2017年12月5日 10:28', money: 3125 },
                { id: '20171108255', pname: '天弘', uname: '常思捷', date: '2017年12月5日 10:28', money: 153 },
                { id: '20171108256', pname: '高桥', uname: '吴嘉辉', date: '2017年12月5日 10:28', money: 634 },
                { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', date: '2017年12月5日 10:28', money: 6478 },
                { id: '20171108255', pname: '天弘', uname: '常思捷', date: '2017年12月5日 10:28', money: 364 },
                { id: '20171108256', pname: '高桥', uname: '吴嘉辉', date: '2017年12月5日 10:28', money: 12365 }
            ]
        }
    });

    // 使用iCheck替换radio与checkbox
    $('.chb').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    $('.rdo').iCheck({
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });

    $('#btn-test').click(function() {
        $('.chb').each(function(i, e) {
            alert(e.checked);
        });
    });
}