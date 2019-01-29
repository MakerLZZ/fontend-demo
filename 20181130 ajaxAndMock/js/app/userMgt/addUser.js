layui.define(['form', 'layer', 'jquery'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var form = layui.form;

    /**
     * 获取模板内容
     * @param {Object} templateId 预设的元素id
     * @param {Object} data 需要传的数据可选
     */
    function getTemplate(templateId, data) {
        var getTpl = templateId.innerHTML;//获取模板内容
        return laytpl(getTpl).render(data);//把内容渲染出来,返回出去
    }

    /**
     * 监听新增新用户按钮
     */
    $('#addUserBtn').click(function () {
        var html = getTemplate(indexUserForm, {});
        layer.open({
            type: 1,
            title: '新增用户',
            area: ['450px', '405px'],
            shade: 0.8,
            id: (new Date()).valueOf(),
            btn: ['确定', '重置', '取消'],
            btnAlign: 'c',
            moveType: 1,
            content: html,
            success: function () {
                form.render();
            },
            yes: function () {
                layer.msg('目前只有修改删除和数据展示功能');
                return false;
            },
            btn2: function () {
                $('#userForm')[0].reset();
                return false;
            },
            btn3: function (idnex) {
                layer.close(idnex);
            }
        });
    });

    exports('addUser', {});
});