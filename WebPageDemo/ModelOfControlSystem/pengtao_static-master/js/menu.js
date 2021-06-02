/*
 * @Author: Chaos J 
 * @Date: 2017-11-27 20:22:47 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-11-30 11:34:10
 */

let Menu = { 
    
    creatNew: function() {
        
        'use strict';

        let menu = {};

        let staticMenu = [
            {
                title: '首页',
                url: 'index.html',
                icon: 'icon-file',
            },
            {
                title: '统计管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '电话订单',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '出水管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '回单管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '转账管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '订单管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '财务管理',
                url: '#',
                icon: 'icon-file',
                childItems: [
                    {
                        title: '月财务报告',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '月工资报告',
                        url: '',
                        icon: 'icon-file',
                    },
                ],
            },
            {
                title: '员工管理',
                url: '#',
                icon: 'icon-file',
                childItems: [
                    {
                        title: '业务员管理',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '配送员管理',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '管理员管理',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '工资级别设置',
                        url: '',
                        icon: 'icon-file',
                    },
                ],
            },
            {
                title: '商品管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '配送站管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '二维码管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '用户管理',
                url: '',
                icon: 'icon-file',
            },
            {
                title: '权限管理',
                url: '#',
                icon: 'icon-file',
                childItems: [
                    {
                        title: '后台账号管理',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '角色管理',
                        url: '',
                        icon: 'icon-file',
                    },
                ],
            },
            {
                title: '日志管理',
                url: '#',
                icon: 'icon-file',
                childItems: [
                    {
                        title: '用户付款日志',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '配送站付款日志',
                        url: '',
                        icon: 'icon-file',
                    },
                    {
                        title: '水厂转款日志',
                        url: '',
                        icon: 'icon-file',
                    },
                ],
            },
        ];

        menu.getMenu = function(permission) {
            let preparedMenu = [];
            // 暂定
            preparedMenu = staticMenu;
            if(DEBUG) {
                console.log('function getMenu(permission) 被调用\npermission: '+permission+'\nReturn menu: ',preparedMenu);
            }
            return preparedMenu;
        }

        return menu;
    }
};