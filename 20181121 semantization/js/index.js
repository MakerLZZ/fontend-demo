window.onload = function () {
    var navLis = document.getElementsByClassName('nav-li');
    var sectionItems = document.getElementsByClassName('section');
    /**
     * 控制nav选项卡 切换选项卡内容
     */
    for (var i = 0; i < navLis.length; i++) {
        (function (n) {
            navLis[n].onclick = function () {
                //全部classname修改为nal-li section-hidden 选中的加上 nal-li-select section
                for (var j = 0; j < navLis.length; j++) {
                    navLis[j].className = 'nav-li';
                    sectionItems[j].className = 'section section-hidden';
                }
                navLis[n].className = 'nav-li nav-li-select';
                sectionItems[n].className = 'section';
            };
        })(i);
    }
    /**
     * 监听窗口大小 nav选项卡在滚动条大于main且小于article时 fixed
     */
    window.onresize = function () {
        controlNav();
    };
    /**
     * 监听滚动条 nav选项卡在滚动条大于main且小于article时 fixed
     */
    window.onscroll = function () {
        controlNav();
    };
    function controlNav() {
        // 需要控制的navDOM
        var nav = document.getElementById('nav');
        // 滚动条相对顶部的高度
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        // 上界的高度
        var adPositionHeight = getDomSelfHeight('myAd');
        // 下界的高度 减少108是为了补齐恰巧到article设置的高度差
        var articlePositionHeight = document.getElementById('myArticle').offsetTop - 108;
        if (scrollHeight > adPositionHeight && scrollHeight < articlePositionHeight) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
        } else {
            nav.style.position = 'absolute';
            // 减少55是为了nav嵌入（超过）上界一段高度
            nav.style.top = adPositionHeight - 55 + 'px';
        }
    }
    /**
     * 获取DOM自身实际高度
     * @param {String} idStr DOMidStr
     */
    function getDomSelfHeight(idStr) {
        return document.getElementById(idStr).offsetHeight || 0;
    }
};