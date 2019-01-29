layui.define(['form'], function (exports) {
    var form = layui.form;
    /**
     * 监听提交
     */
    form.on('submit(indexFormBtn)', function () {
        layer.msg('注册成功');
        return false;
    });
    exports('formSubmit', {});
});