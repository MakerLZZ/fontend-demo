layui.define(['laytpl', 'jquery'], function (exports) {
    var laytpl = layui.laytpl;
    var $ = layui.jquery;
    // 标签数据
    var data = {
        'title': 'markList',
        'list': [
            {
                'text': '海鲜',
            },
            {
                'text': '美食',
            },
            {
                'text': '知识',
            },
            {
                'text': '鱼',
            },
            {
                'text': '虾',
            },
            {
                'text': '新鲜',
            },
            {
                'text': '吃货',
            },
            {
                'text': '小龙虾',
            },
            {
                'text': '螃蟹',
            },
            {
                'text': '青蟹',
            },
            {
                'text': '资讯',
            },
            {
                'text': '贝壳',
            },
            {
                'text': '健康',
            },
            {
                'text': '百科',
            },
            {
                'text': '三文鱼',
            },
            {
                'text': '鱿鱼',
            },
            {
                'text': '生蚝',
            },
            {
                'text': '中山',
            },
            {
                'text': '黄花鱼',
            },
            {
                'text': '鱼类',
            }
        ]
    };
    var getTpl = $('#markItem').html();
    /**
     * 通过模板引擎 数据传入到模板中渲染
     */
    laytpl(getTpl).render(data, function (html) {
        $('#markListBox').html(html);
    });
    exports('markListTpl', {});
});