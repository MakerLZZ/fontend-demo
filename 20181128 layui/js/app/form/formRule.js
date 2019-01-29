layui.define(['form', 'jquery'], function (exports) {
    var form = layui.form;
    var $ = layui.jquery;
    /**
     * 表单验证
     */
    form.verify({
        username: function (value) { //value：表单的值、item：表单的DOM对象
            if (!/^[a-z0-9\_]{5,20}$/i.test(value)) {
                return '请输入5-20个由英文数字下划线组成的字符';
            }
        },
        pass: function (value) { //value：表单的值、item：表单的DOM对象
            if (!/^\S{6,16}$/.test(value)) {
                return '请输入不含空格回车的6-16个字符';
            }
        },
        repass: function (value) { //value：表单的值、item：表单的DOM对象
            var pwdValue = $('#pwdInput').val();
            if (pwdValue != value) {
                return '两次密码输入不一致';
            }
            if (!/^\S{6,16}$/.test(value)) {
                return '请输入不含空格回车的6-16个字符';
            }
        }
    });
    exports('formRule', {});
});