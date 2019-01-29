layui.define(['table', 'jquery', 'form', 'laytpl'], function (exports) {
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var laytpl = layui.laytpl;

    /**
     * 获取模板内容
     * @param {Object} templateId 预设的元素id
     * @param {Object} data 需要传的数据可选
     */
    function getTemplate(templateId, data) {
        // 获取模板内容
        var getTpl = templateId.innerHTML;
        // 把内容渲染出来,返回出去
        return laytpl(getTpl).render(data);
    }

    /**
     * 设置Input元素的值
     * @param {String} idStr input的idStr
     * @param {String} val 需要设置的值
     */
    function setInputVal(idStr, val) {
        $(idStr).val(val);
    }

    /**
     * 工具条的监听tool,'tableListen'是一个预设元素属性名
     */
    table.on('tool(tableListen)', function (obj) {
        var html = getTemplate(indexUserForm, {});
        // var data = obj.data; // 获得当前行数据
        // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var layEvent = obj.event;
        // var tr = obj.tr; // 获得当前行 tr 的DOM对象
        // 删除
        if (layEvent === 'del') {
            event.stopPropagation();
            layer.open({
                content: '确认删除吗？',
                btn: ['确定', '取消'],
                yes: function () {
                    // 物理删除
                    obj.del();
                    layer.msg('已删除!');
                },
                btn2: function (index) {
                    layer.close(index);
                }
            });
        } else if (layEvent === 'edit') {
            layer.open({
                type: 1,
                title: '修改信息',
                area: ['450px', '405px'],
                shade: 0.8,
                id: (new Date()).valueOf(),
                btn: ['确定', '重置', '取消'],
                btnAlign: 'c',
                moveType: 1,
                content: html,
                // 弹出层弹出成功的回调
                success: function (layero) {
                    form.render();
                    // 弹出层提交按钮绑定到该层form表单中
                    layero.addClass('layui-form');
                    layero.find('.layui-layer-btn0').attr('lay-filter', 'userSubmitBtn').attr('lay-submit', '');
                    // 设置name
                    setInputVal('#usernameInput', obj.data.name);
                    // 设置sex
                    var trSex = obj.data.sex;
                    if (trSex === '男') {
                        $('#boyInput').attr('checked', true);
                        form.render();
                    }
                    if (trSex === '女') {
                        $('#girlInput').attr('checked', true);
                        form.render();
                    }
                    // 设置phone
                    setInputVal('#phoneInput', obj.data.phone);
                    // 设置email
                    setInputVal('#emailInput', obj.data.email);
                    // 设置email
                    setInputVal('#addressInput', obj.data.address);
                },
                yes: function (index) {
                    form.render();
                    form.on('submit(userSubmitBtn)', function () {
                        var isMan = $('#boyInput').prop('checked');
                        var sexValue = isMan ? '男' : '女';
                        obj.update({
                            name: $('#usernameInput').val(),
                            sex: sexValue,
                            phone: $('#phoneInput').val(),
                            email: $('#emailInput').val(),
                            address: $('#addressInput').val()
                        });
                        layer.msg('修改成功');
                        layer.close(index);
                    });
                },
                btn2: function () {
                    $('#userForm')[0].reset();
                    return false;
                },
                btn3: function (index) {
                    layer.close(index);
                }
            });
        }
    });

    exports('listenTableTool', {});
});