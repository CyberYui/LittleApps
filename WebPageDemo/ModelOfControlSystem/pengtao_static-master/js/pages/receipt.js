/*
 * @Author: Chaos J 
 * @Date: 2017-12-07 21:59:20 
 * @Last Modified by:   Chaos J 
 * @Last Modified time: 2017-12-07 21:59:20 
 */
window.onload = function() {

    'use strict';
    
    let vTable = new Vue({
        el: '#v-table',
        data: {
            list: [
                { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', phone: '15388080642', dname: '鲍傳堰' },
                { id: '20171108255', pname: '天弘', uname: '常思捷', phone: '17673059220', dname: '贺华杰' },
                { id: '20171108256', pname: '高桥', uname: '吴嘉辉', phone: '18814386703', dname: '张琦' },
                { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', phone: '15388080642', dname: '鲍傳堰' },
                { id: '20171108255', pname: '天弘', uname: '常思捷', phone: '17673059220', dname: '贺华杰' },
                { id: '20171108256', pname: '高桥', uname: '吴嘉辉', phone: '18814386703', dname: '张琦' }
            ]
        }
    });
}