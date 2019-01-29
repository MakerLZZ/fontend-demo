// 封装暂时有问题

function MovieOpt() {
    // 全局变量
    // 请求地址
    this.url = 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=深圳&start=0&count=100&client=somemessage&udid=dddddddddddddddddddddd';
    // 收藏夹data 设了一个初始值
    this.movieCollectionBoxData = [{ imgSrc: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2539661066.jpg', name: '无名之辈', id: 27110296 }];

    this.init();
}

MovieOpt.prototype = {
    /**
     * 点击body侧边隐藏
     */
    listenBodyClick: function () {
        $('#body').on('click', function () {
            MovieOpt.prototype.controlAside('#aside', 1000, false);
        });
    },
    
    /**
     * 监听导航栏电影项点击事件
     */
    listenMoviBtnClick: function () {
        console.log();
        $('#movieBtn').on('click', function(){
            $.ajax({
                dataType: 'jsonp',
                url: MovieOpt.prototype.url,
                success: function (backData) {
                    console.log();
                    var html = template('template', backData);
                    $('#mainBox').html(html);
                }
            });
        });
    },

    /**
     * 根据idStr控制某个DOM显示隐藏
     * @param {String} idStr 需要控制的DOM id字符串
     * @param {Number} time 控制的时间
     * @param {Boolean} condition 显示还是隐藏的状态
     */
    controlAside: function (idStr, time, condition) {
        if (condition) {
            $(idStr).show(time);
        } else {
            $(idStr).hide(time);
        }
    },

    init: function () {
        this.listenMoviBtnClick();
        this.listenBodyClick();
    }
};

var test = new MovieOpt();