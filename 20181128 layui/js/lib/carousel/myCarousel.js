layui.define(['carousel'], function (exports) {
    var carousel = layui.carousel;
    /*
    * 建造轮播图实例
    */
    carousel.render({
        elem: '#myCarousel',
        width: '100%',
        arrow: 'always',
        height: '360px'
    });
    exports('myCarousel', {});
});