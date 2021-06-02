window.onload = function() {

    'use strict';

    // 时间选择器 
    $('#text-time').daterangepicker({
        autoApply: true,
        locale: { format: 'YYYY-MM-DD' }
    }, function(start, end) {
        let starttime = start.format('YYYY-MM-DD');
        let endtime   = end.format('YYYY-MM-DD');
        $('#hide-start-time').val(starttime);
        $('#hide-end-time').val(endtime);
        if(DEBUG) console.log('New date range selected: ' + starttime + ' to ' + endtime);
    });

    let vTable = new Vue({
        el: '#v-table',
        data: {
            list: [
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '300', cname: '鲍傳堰' },
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '400', cname: '贺华杰' },
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '634', cname: '张琦' },
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '745', cname: '鲍傳堰' },
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '342', cname: '贺华杰' },
                { orderId: '1353435', locId: 'adf79c920a', date: '2017年12月5日 10:28', money: '112', cname: '张琦' }
            ]
        }
    });
}