var navLis = document.getElementsByClassName('nav-li');
var sectionItems = document.getElementsByClassName('section');

//控制nav选项卡 切换选项卡内容
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

//监听滚动条 选项卡在滚动条大于等于700时 fixed
window.onscroll = function () {
    //滚动条
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.getElementById('nav');
    var mainPositionHeight = document.getElementsByClassName('main')[0].offsetTop;
    if (scrollHeight > mainPositionHeight) {
        nav.style.position = 'fixed';
        nav.style.margin = '56px 381px';
    } else {
        nav.style.position = 'absolute';
        nav.style.margin = '0 381px';
    }
};