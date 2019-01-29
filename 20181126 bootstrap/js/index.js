window.onload = function () {
    // 初始时的监听
    controlHeader();
    
    /**
     * 监听滚动条 导航在滚动大于等于本身高度时（被遮住时） fixed
     */
    window.onscroll = function () {
        controlHeader();
    };

    /**
     * 监听窗口大小时 导航大于等于本身高度时（被遮住时） fixed
     */
    window.onresize = function () {
        controlHeader();
    };
    
    /**
     * 控制Header样式
     */
    function controlHeader() {
        // header
        var headerIdStr = '#header';
        var headerFixed = 'header-fixed';
        // nav
        var navAClassnameStr = '.nav-a';
        var navAFixed = 'nav-fixed';
        // logo
        var attrName = 'src';
        var logoIdStr = '#headerLogo';
        var logoSrc = './img/jimilogo_white.png';
        var newLogoSrc = './img/jimilogo.png';
        // 滚动条高度
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        // 增加10是为了补齐实际效果的高度差
        var domHeight = getDomSelfHeight(headerIdStr) + 10;
        // 滚动条大于该元素高度时
        if (scrollHeight > domHeight) {
            // header
            addOrRemoveDomClassName(headerIdStr, headerFixed, true);
            // nav
            batchAddOrRemoveDomClassname(navAClassnameStr, navAFixed, true);
            // logo
            modifyImgSrc(logoIdStr, attrName, newLogoSrc);
        } else {
            // header
            addOrRemoveDomClassName(headerIdStr, headerFixed, false);
            // nav
            batchAddOrRemoveDomClassname(navAClassnameStr, navAFixed, false);
            // logo
            modifyImgSrc(logoIdStr, attrName, logoSrc);
        }
    }
    
    /**
     * 修改某个DOM属性的值
     * @param {String} idStr DOMIdStr
     * @param {String} attrName 属性名称
     * @param {String} newValue 新的属性值
     */
    function modifyImgSrc(idStr, attrName, newValue) {
        $(idStr).attr(attrName, newValue);
    }
    
    /**
     * 批量增加或者删除DOM的类名
     * @param {String} classnameStr DomClassStr
     * @param {String} classname 需要增删的类名
     * @param {Boolean} condition 增加还是删除
     */
    function batchAddOrRemoveDomClassname(classnameStr, classname, condition) {
        var dom = $(classnameStr);
        for (var i = 0; i < dom.length; i++) {
            if (condition) {
                $(dom[i]).addClass(classname);
            } else {
                $(dom[i]).removeClass(classname);
            }
        }
    }
    
    /**
     * 增加或者删除DOM的类名
     * @param {String} idStr DOMidStr
     * @param {String} classname 需要增删的类名
     * @param {Boolean} condition 增加还是删除
     */
    function addOrRemoveDomClassName(idStr, classname, condition) {
        // 增加
        if (condition) {
            $(idStr).addClass(classname);
        } else { // 移除
            $(idStr).removeClass(classname);
        }
    }
    
    /**
     * 获取DOM自身的高度
     * @param {String} idStr DOMidStr
     */
    function getDomSelfHeight(idStr) {
        return $(idStr).height() || 0;
    }
};