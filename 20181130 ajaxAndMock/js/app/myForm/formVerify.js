layui.define(['form'], function (exports) {
    var form = layui.form;
    /**
     * 表单验证
     */
    form.verify({
        //value：表单的值、item：表单的DOM对象
        username: function (value) {
            if (!/^[a-z0-9\_]{5,20}$/i.test(value)) {
                return '请输入5-20个由英文数字下划线组成的字符';
            }
        },
        pass: function (value) {
            if (!/^\S{6,16}$/.test(value)) {
                return '请输入不含空格回车的6-16个字符';
            }
        },
        name: function (value) {
            if (!/^[\u4e00-\u9fffa]{1,10}$/.test(value)) {
                return '请输入不超过1-10个中文字符';
            }
        },
        myPhone: function (value) {
            if (!/^(1[3578])[0-9]{9}$/.test(value)) {
                return '请输入正确的手机号码';
            }
        },
        address: function (value) {
            // if (!/^(([\u4e00-\u9fa5]+省|[\u4e00-\u9fa5]+市)([\u4e00-\u9fa5]+市|[\u4e00-\u9fa5]+区|[\u4e00-\u9fa5]+区)([\u4e00-\u9fa5]+区|[\u4e00-\u9fa5]+区)?([a-zA-Z0-9\u4e00-\u9fa5]+))$/.test(value)) {
            //     return '请输入包含省市区/县的地址';
            // }
            if (!value) {
                return '请输入包含省市区/县的地址';
            }
        }
    });

    exports('formVerify', {});
});