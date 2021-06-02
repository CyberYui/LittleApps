/*
 * @Author: Chaos J 
 * @Date: 2017-12-14 10:21:52 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-14 12:37:22
 */

 window.onload = () => {
    
    'use strict'

    $('#btn-save').click(() => {
        let $sel1 = $('#sel1 option:selected'),
            $in1  = $('#in1'),
            $in2  = $('#in2'),
            $in3  = $('#in3'),
            $in4  = $('#in4'),
            pass  = false

        $('.callout').remove()
        if(isEmpty($sel1.val()) || $sel1.val() === '-1')
            pass = MessageAlert($sel1.parent(), 'DANGER', '此项不能为空')

        if(isEmpty($in1.val()))
            pass = MessageAlert($in1.parent(), 'DANGER', '此项不能为空')
        else if(isNegative($in1.val()))
            pass = MessageAlert($in1.parent(), 'WARNING', '请输入正确的数')
            
        if(isEmpty($in2.val()))
            pass = MessageAlert($in2.parent(), 'DANGER', '此项不能为空')
        else if(isNegative($in2.val()) || !isInt($in2.val()))
            pass = MessageAlert($in2.parent(), 'WARNING', '请输入正确的数')

        if(isEmpty($in3.val()))
            pass = MessageAlert($in3.parent(), 'DANGER', '此项不能为空')
        else if(isNegative($in3.val()) || !isInt($in3.val()))
            pass = MessageAlert($in3.parent(), 'WARNING', '请输入正确的数')
        else if($in3.val() < 1 || $in3.val() > 12)
        pass = MessageAlert($in3.parent(), 'WARNING', '请输入1-12')

        if(isEmpty($in4.val()))
            pass = MessageAlert($in4.parent(), 'DANGER', '此项不能为空')
        else if(isNegative($in4.val()))
            pass = MessageAlert($in4.parent(), 'WARNING', '请输入正确的数')
      

        $('#这是一个form的ID').submit()
    })
 }