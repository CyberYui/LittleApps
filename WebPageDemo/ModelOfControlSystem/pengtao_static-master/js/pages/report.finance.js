/*
 * @Author: Chaos J 
 * @Date: 2017-12-07 11:14:34 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-07 14:02:41
 */
window.onload = function() {
    
    'use strict';

    // 时间选择器 
    $('#text-search').datetimepicker({
        format: 'yyyy-mm',
        autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
    });
    $('#text-search').datetimepicker().on('changeDate', function(ev){
        let time = ev.currentTarget.value;
        if(DEBUG) console.log('时间选择器选择了：' + time);
        $('#text-time').val(time);
    });
}