layui.define(['layer', 'jquery'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    /**
     * 监听批量删除按钮
     */
    $('#batchDeleteBtn').click(function () {
        layer.msg('目前只有修改删除和数据展示功能');
    });

    exports('batchDelUser', {});
});