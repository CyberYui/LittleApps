/*
 * @Author: Chaos J 
 * @Date: 2017-12-13 21:28:06 
 * @Last Modified by: Chaos J
 * @Last Modified time: 2017-12-14 18:50:19
 */
let TagsInput = {
    getNew: function() {
        let o      = {},
            $input = null,
            $root  = null,
            m_flag = false
        
        o.init = str => {
            $(str).wrap('<div class="tags-input"></div>')
            $input = $(str)
            $root  = $input.parent()
            m_flag = false

            $input.keydown(e => {
                e.keyCode == 13 
                    && $.trim($input.val()) !== '' 
                    && $input.before(`<span class="label label-primary">${$input.val()}<i class="label-close fa fa-times"></i></span>`)
                    && $input.val('')

                e.keyCode == 8
                    && $input.val() === ''
                    && $input.prev().remove()
            })

            $root.on('click', '.label', e => {
                e.stopPropagation()
                $(e.currentTarget).remove()
            })

            $root.click(() => {
                $input.css('display', 'inline-block')
                $input.focus()
            })

            $root.mouseleave(() => m_flag = false)
                
            $root.mouseenter(() => m_flag = true)

            $('body').click(() => {
                if(!m_flag)
                    $(".tags-input input").css('display', 'none')
                    $input.val() !== '' && o.setTags($input.val())
                    $input.val('')
            })
        }

        o.setTags = list => {
            typeof list === 'string' 
                && (list = list.split(','))
            $(list).each((i, e) => $input.before(`<span class="label label-primary">${e}<i class="label-close fa fa-times"></i></span>`));
        }

        o.getTags = () => {
            let li = []
            $root.find('.label').each((i, e) => li.push($(e).text()))
            return li
        }
        
        o.toString = () => {
            return o.getTags().join(',')
        }

        return o;
    }
};