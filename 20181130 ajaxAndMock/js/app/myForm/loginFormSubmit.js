layui.define(['form', 'layer'], function (exports) {
    var form = layui.form;
    var layer = layui.layer;
    // easy-mock datatableUrl
    // var loginUrl = 'https://www.easy-mock.com/mock/5c03e6953b23d255f07eca61/eighthDemo/test/login';
    var loginUrl = 'test/login';

    /**
     * 请求拦截
     */
    Mock.mock(loginUrl, 'get', function () {
        return Mock.mock({
            'data': {
                'condition': 1,
                'msg': '登录成功'
            }
        });
    });

    /**
     * 显示请求失败的状态码
     * @param {String} code 状态码
     */
    function fail(code) {
        layer.msg('请求出现错误，状态码为：' + code);
    }

    /**
     * 监听登录表单提交
     */
    form.on('submit(loginSubmitBtn)', function (data) {
        /**
         * 请求
         */
        // 新建XMLHttpRequest对象
        var request = new XMLHttpRequest();
        // 状态发生变化时，函数被回调
        request.onreadystatechange = function () {
            if (request.readyState === 4) { // 成功完成
                // 判断响应结果:
                if (request.status === 200) {
                    // 成功，responseText是拿到的响应的文本，再通过JSON.parse解析为JSON对象
                    var data = JSON.parse(request.responseText);
                    if (data.data.condition === 1) {
                        window.open('./index.html', '_self');
                    } else {
                        //返回错误信息
                        layer.msg(data.data.msg);
                    }
                } else {
                    // 失败，根据响应码判断失败原因:
                    return fail(request.status);
                }
            }
        };
        // 假设有登录验证
        if (data.field.username !== '123123') {
            event.stopPropagation();
            layer.msg('用户名输入有误！');
            return false;
        }
        if (data.field.password !== '123123') {
            layer.msg('密码输入有误！');
            return false;
        }

        // easy mock
        // 模拟数据类型为formdata
        // 构造formdata数据
        // var postData = new FormData(data.form);
        // request.open('POST', loginUrl, true);
        // 设置POST请求的请求头
        // request.setRequestHeader('Content-Type', 'multipart/form-data');
        // request.send(postData);

        // 发送请求:
        request.open('GET', loginUrl);
        request.send();

        return false;
    });



    exports('loginFormSubmit', {});
});