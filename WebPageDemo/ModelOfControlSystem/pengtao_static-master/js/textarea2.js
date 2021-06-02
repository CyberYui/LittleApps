/*
 * @Author: Chaos J 
 * @Date: 2017-12-15 19:33:32 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-15 20:34:11
 */

let Textarea2 = { getNew: function() {

    'use strict'

    let o = {}
    let _maxLength = 255
    let $textarea = null
    let $root = null
    let $footer = null
    let $length = null

    o.init = (str) => {
        $textarea = $(str)
        $textarea.wrap('<div class="textarea2"></div>')
        $root = $textarea.parent()
        $textarea.after(`<div class="textarea2-footer"><span class="textarea2-footer-right">总字数：<span class="textarea2-length">0</span> / 255</span></div>`)
        $footer = $textarea.next()
        $length = $footer.find('.textarea2-length')

        $textarea.on('input propertychange', () => {
            let length = $textarea.val().length
            $length.html(length)
            if(length > _maxLength) {
                $length.addClass('text-red bold')
            } else {
                $length.removeClass('text-red bold')
            }
        })
    }

    o.getLength = () => {
        return $textarea.val().length
    }

    o.clear = () => {
        $textarea.val('')
        $length.html(0)
    }
    
    o.toString = () => {
        return $textarea.val()
    }

    o.setText = (val) => {
        $textarea.val(val)
        $length.html($textarea.val().length)
    }

    return o
}};