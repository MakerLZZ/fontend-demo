layui.define(['table', 'jquery'], function (exports) {
    var $ = layui.jquery;
    var table = layui.table;
    var laytpl = layui.laytpl;
    var url = 'https://www.easy-mock.com/mock/5bf7c8812caeed673a1af516/layui/cardList';
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
     * 选项卡2数据渲染
     */
    $.ajax({
        type: 'get',
        url: url,
        async: true,
        success: function (result) {
            let data = [];
            result.data.array.forEach(item => {
                data.push({ ...item, sex: item.sex === '1' ? '男' : '女' });
            });
            //数据表格
            table.render({
                elem: '#indexTable',//绑定容器
                height: 487,//设置高度  full-数字,这个要自己手动去配置调试合适的最大高度
                page: true, //开启分页
                data: data,
                cols: [[ //表头
                    { checkbox: true, LAY_CHECKED: false },
                    { field: 'id', title: 'ID', width: 80, sort: true },
                    { field: 'userName', title: '用户名' },
                    { field: 'sex', title: '性别', sort: true },
                    { field: 'city', title: '城市' },
                    { field: 'sign', title: '签名' },
                    { field: 'experience', title: '积分', sort: true },
                    { field: 'wealth', title: '操作', toolbar: '#indexToolBar', width: 130, fixed: 'right' }//fixed固定在右侧,toolbar//指向自定义工具栏模板选择器
                ]],
                // done: function (res) {
                //     //我是渲染完成回调事件哦
                // }
            });
        }
    });

    /**
     * 工具条的监听tool,'tableListen'是我一个预设元素属性名
     */
    table.on('tool(tableListen)', function (obj) {
        var html = getTemplate(modifyBox, {});
        //var data = obj.data; // 获得当前行数据
        var layEvent = obj.event; // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        //var tr = obj.tr; // 获得当前行 tr 的DOM对象
        if (layEvent === 'del') { // 删除
            event.stopPropagation();
            layer.open({
                content: '确认删除吗？',
                btn: ['确定', '取消'],
                yes: function () {
                    event.stopPropagation();
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
                id: 'weiyi',
                title: '签名',
                content: html,
                area: ['400px', '200px'],
                btn: ['确定', '取消'],
                yes: function (index) {
                    obj.update({
                        sign: $('#modifyBoxInput').val()
                    });
                    layer.msg('修改成功!');
                    layer.close(index);
                },
                btn2: function (index) {
                    layer.close(index);
                }
            });
        }
        $('#modifyBoxInput').val(obj.data.sign);
    });
    exports('datatableTpl', {});
});