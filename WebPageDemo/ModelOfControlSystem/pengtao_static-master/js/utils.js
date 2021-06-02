/*
 * @Author: Chaos J
 * @Date: 2017-11-11 16:33:19
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-23 17:44:44
 */

// DEBUG模式
let DEBUG = true;

/**
 * 判断是否为整数
 * @param {any} n 
 * @returns {bool}
 */
function isInt(n) {
    return n.indexOf('.') === -1;
}

/**
 * 判断是否为负数
 * @param {any} n 
 * @returns {bool}
 */
function isNegative(n) {
    return Number(n) < 0;
}

/**
 * 判断是否为正数
 * @param {any} n 
 * @returns {bool}
 */
function isPositive(n) {
    return Number(n) > 0;
}

/**
 * 判断是否为空
 * @param {any} n 
 * @returns {bool}
 */
function isEmpty(n) {
    return n == undefined 
        || n == null 
        || n == '' 
        || n.length == 0;
}   

/**
 * 判断输入的数字是否过大
 * @param {any} n 
 * @returns {bool}
 */
function isTooBig(n) {
    return parseFloat(n) > 99999999;
}

/**
 * 判断输入的是否是手机号
 * @param {any} n 
 * @returns {bool}
 */
function isPhone(n) {
    return /^1[34578]\d{9}$/.test(n);
}

/**
 * 获取图片地址
 * @
 */
function getImgUrl(img) {
    let windowURL = window.URL || window.webkitURL || window.mozURL
    return windowURL.createObjectURL(img.files[0]);
}

/**
 * 获取tr上的ID，仅限于表格操作按钮使用
 * @param {Event} e 点击触发的event
 * @returns {string} 获得的<tr>上的id
 */
function getIdInTr(e) {
    if(e == null || e == undefined) {
        if(DEBUG) console.error('传入的event有误');
        return null;
    }
    let id = $(e.currentTarget).parent().parent().attr('id');
    if(DEBUG) console.log('ID: ', id);
    return id;
}

/**
 * 获取iCheck外面的值，仅限于iCheck的控件
 * @param {Element} e 触发的iCheck
 * @returns {string} 获得的<tr>上的id
 */
function getValOutChb(e) {
    if(e == null || e == undefined) {
        if(DEBUG) console.error('传入的event有误');
        return null;
    }
    let val = $(e).parent().parent().find('span').html();
    if(DEBUG) console.log('val: ', val);
    return val;
}

/**
 * 通过对象里的id属性来将对象的下标从数组中取出
 * @param {String} objId: 要得到的obj.id
 * @param {Array} arr: 源数组
 * @return {number} 下标
 */
function getObjInIndexArray(objId, arr) {
    let tarIndex = -1;
    for(let i = 0; i < arr.length; i++) {
        if(objId == arr[i].id) {
            tarIndex = i;
            break;
        }
    }
    return tarIndex;
}

/**
 * 通过对象里的id属性来将对象从数组中取出
 * @param {String} objId: 要得到的obj.id
 * @param {Array} arr: 源数组
 * @return {Object} 对象
 */
function getObjInArray(objId, arr) {
    let tarIndex = -1;
    for(let i = 0; i < arr.length; i++) {
        if(objId == arr[i].id) {
            tarIndex = i;
            break;
        }
    }
    if(tarIndex !== -1) {
        return arr[tarIndex];
    }
    return null;
}

/**
 * 通过对象里的id属性来将对象从数组中删除
 * @param {String} objId: 要删除的obj.id
 * @param {Array} arr: 源数组
 */
function removeObjInArray(objId, arr) {
    let tarIndex = -1;
    for(let i = 0; i < arr.length; i++) {
        if(objId == arr[i].id) {
            tarIndex = i;
            break;
        }
    }
    if(tarIndex !== -1) {
        arr.splice(tarIndex, 1);
        return true;
    }
    return false;
}

/**
 * 获得一种随机的颜色
 * @returns {string} #xxxxxx, 为颜色代码
 */
function getRandomColor() {    
    return  '#' + (function(color){    
        return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
            && (color.length == 6) ?  color : arguments.callee(color);    
    })('');    
} 

/**
 * 根据传入的数字获得一种蓝色
 * @returns #xxxxxx, 为颜色代码
 */
function getColorBlue(number) {
    let varBlue = [
        '#00639c','#10689b','#1d6c99','#2b7097',
        '#3c7494','#4a7994','#577c91','#688291',
        '#788892','#848c90','#909090','#4d4d4d',
    ];
    let n = number % 12 > 0? number % 12 : number;
    return varBlue[n];
}

/**
 * 根据传入的数字获得一种温和的色调
 * @returns {string} #xxxxxx, 为颜色代码
 */
function getColorBeauty(number) {
    let varBlue = [
        '#ee0026', // 红
        '#ff7f00', // 橙
        '#ffe600', // 黄
        '#66b82b', // 绿
        '#008678', // 青
        '#093f86', // 蓝
        '#af0065'  // 紫
    ];
    let n = number % 7;
    return varBlue[n];
}

/**
 * 对用户进行提醒或警告
 * @param {jQuery-Object} e: 跟在哪个jQuery元素的后面
 * @param {string} type: 消息框的类型[0]:DANGER [1]:INFO [2]:WARNING [3]:SUCCESS
 * @param {string} title: 消息框的标题
 * @param {string} msg: 消息框的内容
 */
function MessageBox($e, type, title, msg) {
    let _alert_type = ''
    let _icon       = ''
    switch(type) {
        case 'DANGER' : _alert_type = 'danger' ; _icon = 'ban'    ; break;
        case 'INFO'   : _alert_type = 'info'   ; _icon = 'info'   ; break;
        case 'WARNING': _alert_type = 'warning'; _icon = 'warning'; break;
        case 'SUCCESS': _alert_type = 'success'; _icon = 'check'  ; break;
    }
    $e.append(`
        <div class="alert alert-dismissible alert-${_alert_type}">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h4><i class="icon fa fa-${_icon}"></i>${title}</h4>
            <span class="content">${msg}</span>
        </div>
    `);
    return type === 'SUCCESS'
}

/**
 * 小型的提示框，用于提醒密码输入等问题
 * @param {jQuery-Object} e: 跟在哪个jQuery元素的后面
 * @param {string} type: SUCCESS, DANGER, WARNING, INFO
 * @param {string} msg: 要进行提示的文字
 */
function MessageAlert($e, type, msg) {
    let _alert_type = ''
    switch(type) {
        case 'SUCCESS': _alert_type = 'success'; break;
        case 'DANGER' : _alert_type = 'danger' ; break;
        case 'WARNING': _alert_type = 'warning'; break;
        case 'INFO'   : _alert_type = 'info'   ; break;
    }
    $e.after(`
        <div class="callout callout-${_alert_type} callout-msg">
            <span>${msg}</span>
        </div>
    `)
    return type === 'SUCCESS'
}