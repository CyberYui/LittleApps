/*
 * @Author: Chaos J 
 * @Date: 2017-12-13 19:44:23 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-14 14:20:50
 */
window.onload = function() {
    
        'use strict';

        let tInput = TagsInput.getNew();
        tInput.init('#tags-input');

        $('#btn-save').click(function() {
            $('#tags').val(tInput.toString());

            let pass = false;
            let $name = $('#name')
            let $type = $('#type option:selected')
            let $price = $('#price')
    
            $('.callout').remove()
            if(isEmpty($name.val()))
                pass = MessageAlert($name, 'DANGER', '此项不能为空');
            if(isEmpty($type) || $type.val() === '-1')
                pass = MessageAlert($type.parent(), 'DANGER', '此项不能为空');
            if(isEmpty($price.val()))
                pass = MessageAlert($price, 'DANGER', '此项不能为空');
            else if(isNegative($price.val()))
                pass = MessageAlert($price, 'WARNING', '请输入正数');
        })
        
        // 初始化标签框
        $.ajax({
            type: 'POST',
            url: '/getTags.do',
            dataType: 'json',
            success: function(data) {
                tInput.setTags(data);
            },
            error: function() {
                MessageAlert($('#tags-input').parent(), 'DANGER', '标签多选框初始化错误，请刷新页面');
            }
        });
        
        CKEDITOR.replace('ckeditor');
        
        $('.a-upload').on('change', 'input[type="file"]', function() {
            let filePath = $(this).val();
            if(filePath !== ''){
                let arr = filePath.split('\\');
                let fileName = arr[arr.length-1];
                $(this).parent().find('.title').html(fileName);
                $(this).parent().parent().find('img').attr('src', getImgUrl($(this).get(0)));
            } else {
                $(this).parent().find('.title').html('上传图片');
                $(this).parent().parent().find('img').attr('src', 'image/bucket.jpg');
                return false;
            }
        });
    };