layui.define(['element'], function (exports) {
    var element = layui.element;
    /**
     * 选项卡监听
     */
    element.on('tab(layuiTabSeven)', function (data) {
        layer.msg(data.index + 1);
    });
    exports('myElement', {});
});