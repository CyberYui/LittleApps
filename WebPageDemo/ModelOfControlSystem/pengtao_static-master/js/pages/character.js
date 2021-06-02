window.onload = function() {
    
    'use strict';
    
    let vApp = new Vue({
        el: '#v-app',
        data: {
            chara: [
                { id: '5434234', name: '财务管理员', permission: [ { id: 'p1', name: '财务管理' }, { id: 'p2', name: '用户管理'} ] },
                { id: '1223534', name: '进单管理员', permission: [ { id: 'p3', name: '订单管理' }, { id: 'p4', name: '出水管理'} ] }
            ],
            admin: [
                { id: '1231325', name: '张倩青', cid: '2fa2e6b', cname: '财务管理员' },
                { id: '2335589', name: '吴家辉', cid: '2fa2e6b', cname: '进单管理员' },
            ]
        }
    });

    // 从后台获得权限列表
    let staticPermissionList = [
        { id: 'p1', name: '财务管理' }, { id: 'p2', name: '用户管理'},
        { id: 'p3', name: '订单管理' }, { id: 'p4', name: '出水管理'},
        { id: 'p5', name: '二维码管理' }, { id: 'p6', name: '日志管理'},
        { id: 'p7', name: '权限管理' }, { id: 'p8', name: '商品管理'}
    ];

    // 将权限列表赋值给角色添加与修改模态框
    for(let item of staticPermissionList) {
        let tmp = '<div class="col-sm-3 col-xs-6 chbbox">'
                +   '<label><input type="checkbox" name="' + item.id + '" value="' + item.id + '"><span>' + item.name + '</span></label>'
                + '</div>';
        $('#modal-add-chara .permission').append(tmp);
        $('#modal-edit-chara .permission').append(tmp);
    }

    // 添加角色
    $(document).on('click', '#btn-add-chara', function() {
        $('#modal-add-chara').modal('show');
    });

    // 保存添加的角色
    $(document).on('click', '#modal-add-chara .btn-save', function() {
        let $name = $($('#modal-add-chara .form-control').get(0));
        let oPerList = [];
        let pass = true;
        // 整理oPerList
        $('#modal-add-chara .chbbox input').each(function(index, element) {
            if(element.checked) oPerList.push({ 
                id: $(element).val(), 
                name: getValOutChb(element) 
            });
        });
        if(DEBUG) console.log('oPerList', oPerList);

        // 显示提示信息
        $('.callout.callout-msg').remove();
        if(isEmpty($name.val())) { 
            MessageAlert($name, 'DANGER', '请输入角色名'); pass = false; 
        }
        if(oPerList.length <= 0) { 
            MessageAlert($('#modal-add-chara .msg'), 'DANGER', '请至少选择一个权限'); pass = false; 
        }

        if(!pass) return;

        // 保存到服务器上
        $.ajax({
            type: 'POST',
            url: '/newChara',
            dataType: 'json',
            data: {
                name: $name.val(),
                permission: oPerList
            },
            success: function(data) {
                if(data.errorCode == 0) {
                    $('#modal-add-chara').modal('hide');
                    updateChara();
                } else if (data.errorCode == 1) {
                    $('.callout.callout-msg').remove();
                    MessageAlert($name, 'DANGER', '角色名已存在');
                }
            },
            error: function() {
                if($('#modal-add-chara .alert').length === 0) {
                    MessageBox($('#modal-add-chara .modal-footer'), 'DANGER', '错误', '服务器错误！');
                }
            }
        });
    });

    // 修改角色
    $(document).on('click', '.btn-edit-chara', function(e) {
        let id = getIdInTr(e);
        let oChara = getObjInArray(id, vApp.chara);
        if(oChara == null) return;
        // 将内容填充
        let $name = $($('#modal-edit-chara .form-control').get(0));
        $name.val(oChara.name);
        $('#modal-edit-chara .chbbox input').each(function(index, element) {
            $(element).iCheck('uncheck');
        });
        $('#modal-edit-chara .chbbox input').each(function(index, element) {
            for(let item of oChara.permission) {
                if($(element).val() == item.id) {
                    $(element).iCheck('check');
                }
            }
        });
        $('#modal-edit-chara .btn-save').attr('data-id', id);
        $('#modal-edit-chara').modal('show');
    });

    // 修改角色保存
    $(document).on('click', '#modal-edit-chara .btn-save', function(e) {
        let $name = $($('#modal-edit-chara .form-control').get(0));
        let oPerList = [];
        let pass = true;
        // 整理oPerList
        $('#modal-edit-chara .chbbox input').each(function(index, element) {
            if(element.checked) oPerList.push({ 
                id: $(element).val(), 
                name: getValOutChb(element) 
            });
        });
        if(DEBUG) console.log('oPerList', oPerList);

        // 显示提示信息
        $('.callout.callout-msg').remove();
        if(isEmpty($name.val())) { 
            MessageAlert($name, 'DANGER', '请输入角色名'); pass = false; 
        }
        if(oPerList.length <= 0) { 
            MessageAlert($('#modal-edit-chara .msg'), 'DANGER', '请至少选择一个权限'); pass = false; 
        }

        if(!pass) return;

        // 保存到服务器上
        $.ajax({
            type: 'POST',
            url: '/editChara',
            dataType: 'json',
            data: {
                id: $(e.currentTarget).attr('data-id'),
                name: $name.val(),
                permission: oPerList
            },
            success: function(data) {
                $('#modal-add-chara').modal('hide');
                updateChara();
            },
            error: function() {
                if($('#modal-add-chara .alert').length === 0) {
                    MessageBox($('#modal-add-chara .modal-footer'), 'DANGER', '错误', '服务器错误！');
                }
            }
        });
    });

    // 删除角色
    $(document).on('click', '.btn-del-chara', function(e) {
        // 获得页面上的数据
        let id = getIdInTr(e);
        let name = $(e.currentTarget).parent().parent().find('td')[1].innerHTML;
        // 填充提醒框
        $('#modal-alert .title').html(name);
        $('#btn-alert-confirm').attr('data-id', id);
        // 显示模态框
        $('#modal-alert').modal('show');
    });

    // 确认删除
    $(document).on('click', '#btn-alert-confirm', function(e) {
        $.ajax({
            type: 'POST',
            url: 'delChara',
            dataType: 'json',
            data: {
                id: $(e.currentTarget).attr('data-id')
            },
            success: function() {
                removeObjInArray(id, vApp.chara);
                $('#modal-alert').modal('hide');
            },
            error: function() {
                if($('#modal-alert').find('.alert').length === 0) {
                    MessageBox($('#modal-alert .modal-footer'), 'DANGER', '错误', '无法访问服务器');
                }
            }
        });
    });

    // 修改管理员
    $(document).on('click', '.btn-edit-admin', function(e) {
        let id = getIdInTr(e);
        $('#modal-edit-admin select').html('<option value="-1" disabled selected>请选择管理员角色</option>');
        for(let item of vApp.chara) {
            if(DEBUG) console.log('option添加' + item.name + '(' + item.id + ')');
            $('#modal-edit-admin select').append('<option value="' + item.id + '">' + item.name + '</option>')
        }
        $('#modal-edit-admin .btn-save').attr('data-id', id);
        $('#modal-edit-admin').modal('show');
    });

    // 修改管理员保存
    $(document).on('click', '#modal-edit-admin .btn-save', function(e) {
        let $name = $('#modal-edit-admin select option:selected');
        let pass = true;

        // 显示提示信息
        $('.callout.callout-msg').remove();
        if($name.val() == -1) {
            MessageAlert($('#modal-edit-admin .msg'), 'DANGER', '请至少选择一个权限'); pass = false; 
        }

        if(!pass) return;

        // 保存到服务器上
        $.ajax({
            type: 'POST',
            url: '/editAdmin',
            dataType: 'json',
            data: {
                id: $(e.currentTarget).attr('data-id'),
                name: $name.val(),
            },
            success: function(data) {
                $('#modal-edit-admin').modal('hide');
                updateAdmin();
            },
            error: function() {
                if($('#modal-edit-admin .alert').length === 0) {
                    MessageBox($('#modal-edit-admin .modal-footer'), 'DANGER', '错误', '服务器错误！');
                }
            }
        });
    });

    // 使用iCheck替换radio与checkbox
    $('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    $('input[type="radio"]').iCheck({
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });

    // 刷新页面
    function updateChara() {
        $.ajax({
            type: 'POST',
            url: 'getCharaList',
            dataType: 'json',
            success: function(data) {
                vApp.chara = data;
            },
            error: function() {
                if($('#table-chara').parent().find('.alert').length === 0) {
                    MessageBox($('#table-chara'), 'DANGER', '错误', '无法从服务器上无法获取到数据');
                }
            }
        });
    } updateChara();
    function updateAdmin() {
        $.ajax({
            type: 'POST',
            url: 'getAdminList',
            dataType: 'json',
            success: function(data) {
                vApp.admin = data;
            },
            error: function() {
                if($('#table-admin').parent().find('.alert').length === 0) {
                    MessageBox($('#table-admin'), 'DANGER', '错误', '无法从服务器上无法获取到数据');
                }
            }
        });
    } updateAdmin();
};