window.onload = function() {
    
        'use strict';
        
        let vTable = new Vue({
            el: '#v-table',
            data: {
                list: [
                    { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', phone: '15388080642', status: '微信支付' },
                    { id: '20171108255', pname: '天弘', uname: '常思捷', phone: '17673059220', status: '现金支付' },
                    { id: '20171108256', pname: '高桥', uname: '吴嘉辉', phone: '18814386703', status: '微信支付' },
                    { id: '20171108254', pname: '铁道学院', uname: '沈鹏程', phone: '15388080642', status: '微信支付' },
                    { id: '20171108255', pname: '天弘', uname: '常思捷', phone: '17673059220', status: '微信支付' },
                    { id: '20171108256', pname: '高桥', uname: '吴嘉辉', phone: '18814386703', status: '现金支付' }
                ]
            }
        });
    }