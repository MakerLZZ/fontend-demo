layui.define(['table', 'jquery', 'form'], function (exports) {
    var table = layui.table;
    // easy-mock datatableUrl
    // var datatableUrl = 'https://www.easy-mock.com/mock/5c03e6953b23d255f07eca61/eighthDemo/test/datatable';
    var datatableUrl = 'test/getTableData';

    /**
     * 请求拦截 mock
     */
    Mock.mock(datatableUrl, 'get', function () {
        return Mock.mock({
            'data': {
                'list|15-50': [{
                    'id|+1': 0,
                    'address': '@county(true)',
                    // 'address': /^(([\u4e00-\u9fa5]+省|[\u4e00-\u9fa5]+市)([\u4e00-\u9fa5]+市|[\u4e00-\u9fa5]+区|[\u4e00-\u9fa5]+区)([\u4e00-\u9fa5]+区|[\u4e00-\u9fa5]+区)?([a-zA-Z0-9\u4e00-\u9fa5]+))$/,
                    'email': '@email',
                    // 'phone': /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                    'phone': /^(1[3578])[0-9]{9}$/,
                    'name': '@cname(1,10)',
                    'sex': '@cword("男女")',
                    'date': '@datetime(yyyy-MM-dd hh:mm)'
                }]
            }
        });
    });

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
                return success(data);
            } else {
                // 失败，根据响应码判断失败原因:
                return fail(request.status);
            }
        }
    };
    // 发送请求:
    request.open('GET', datatableUrl);
    request.send();

    /**
     * 显示请求失败的状态码(根据不同码显示不同错误信息)
     * @param {String} code 状态码
     */
    function fail(code) {
        layer.msg('请求出现错误，状态码为：' + code);
        //layer.msg('发生未知的错误');
    }

    /**
     * 请求成功调用
     * @param {Object} result 请求成功的返回值对象
     */
    function success(result) {
        //数据表格
        table.render({
            elem: '#indexTable',//绑定容器
            height: 472,//设置高度  full-数字,这个要自己手动去配置调试合适的最大高度
            page: true, //开启分页
            data: result.data.list,
            cols: [[ //表头
                { checkbox: true, LAY_CHECKED: false },
                { field: 'id', title: '序号', width: 80, sort: true },
                { field: 'name', title: '姓名', width: 100 },
                { field: 'sex', title: '性别', width: 60 },
                { field: 'phone', title: '手机号码', width: 160 },
                { field: 'email', title: '邮箱' },
                { field: 'address', title: '地址' },
                { field: 'date', title: '日期', width: 150 },
                { field: 'wealth', title: '操作', toolbar: '#indexToolBar', width: 130, fixed: 'right' } //fixed固定在右侧,toolbar//指向自定义工具栏模板选择器
            ]]
        });
    }

    exports('getTableData', {});
});