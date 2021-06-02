window.onload = function() {
    
        'use strict';
        
        let vTable = new Vue({
            el: '#v-table',
            data: {
                list: [
                    { openId: '3a53b98ef2', name: '吴嘉辉', img: 'image/user1-128x128.jpg' },
                    { openId: '3a53b98ef2', name: '张倩青', img: 'image/user1-128x128.jpg' },
                    { openId: '3a53b98ef2', name: '鲍傳堰', img: 'image/user1-128x128.jpg' },
                    { openId: '3a53b98ef2', name: '沈鹏程', img: 'image/user1-128x128.jpg' },
                ]
            }
        });
    }