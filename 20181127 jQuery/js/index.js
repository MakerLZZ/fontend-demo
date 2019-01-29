// 全局变量
// 请求地址
var url = 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=深圳&start=0&count=100&client=somemessage&udid=dddddddddddddddddddddd';
// 收藏夹data { imgSrc: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537306831.jpg', name: '无名之辈', id: 27110296 }
var movieCollectionBoxData = [];

/**
 * 点击body侧边隐藏
 */
$('#body').on('click', function () {
    controlAside('#aside', 1000, false);
});

/**
 * 监听导航栏电影项点击事件
 */
$('#movieBtn').on('click', function () {
    $.ajax({
        dataType: 'jsonp',
        url: url,
        success: function (backData) {
            var html = template('template', backData);
            $('#mainBox').html(html);
        }
    });
});

/**
 * 点击我的收藏按钮 展开侧边
 */
$('#myCollectionBtn').on('click', function () {
    event.stopPropagation();
    //printCollectionDetail();
    controlAside('#aside', 1000, true);
});

/**
 * 点击收藏夹时阻止body点击事件的冒泡
 */
$('#aside').on('click', function () {
    event.stopPropagation();
});

/**
 * 处理收藏电影事件
 * @param {Number} id 需要收藏的电影id
 */
var flag = true;
function handleCollect(id) {
    if (!flag) {
        return;
    }
    flag = false;
    event.stopPropagation();
    if (isCollect(id)) {
        flag = true;
        alert('该影片已经被收藏！');
        return;
    }
    var movie = { imgSrc: '', name: '', id: -1 };
    $.ajax({
        dataType: 'jsonp',
        url: url,
        success: function (backData) {
            flag = true;
            if (backData) {
                backData.subjects.forEach(item => {
                    if (item.id == id) {
                        movie.id = id;
                        movie.name = item.title;
                        movie.imgSrc = item.images.small;
                    }
                });
                movieCollectionBoxData.push(movie);
                alert('收藏成功！');
                controlAside('#aside', 1000, true);
                printCollectionDetail();
            }
        },
    });
}

/**
 * 根据idStr控制某个DOM显示隐藏
 * @param {String} idStr 需要控制的DOM id字符串
 * @param {Number} time 控制的时间
 * @param {Boolean} condition 显示还是隐藏的状态
 */
function controlAside(idStr, time, condition) {
    if (condition) {
        $(idStr).show(time);
    } else {
        $(idStr).hide(time);
    }
}

/**
 * 是否已经收藏
 * @param {Number} id 电影id
 */
function isCollect(id) {
    var flag = false;
    movieCollectionBoxData.forEach(item => {
        if (item.id == id) {
            flag = true;
        }
    });
    return flag;
}

// 初始化打印收藏夹数据
printCollectionDetail();
/**
 * 展示收藏夹内容
 */
function printCollectionDetail() {
    var html = '';
    movieCollectionBoxData.forEach(item => {
        html += '<div class="aside-box-item"><div><img class="aside-box-item-img" src="'
            + item.imgSrc + '"></div><div class="aside-box-item-bottom"><p class="aside-item-bottom-p">'
            + item.name + '</p><a href="javascript:;" class="demo-a" onclick="handleDelete('
            + item.id + ')">删除</a></div></div>';
    });
    $('#asideBox').html(html);
}

//实例化一个电影id
var movieId = -1;
/**
 * 处理删除收藏电影按钮事件
 * @param {Number} id 需要删除的电影id
 */
function handleDelete(id) {
    event.stopPropagation();
    //初始化电影Id
    movieId = id;
    //弹出删除确认框
    controlAside('#confirmArticle', 1000, true);
    //显示mask
    controlAside('#maskArticle', 1000, true);
}

/**
 * 根据id获取该数组某对象等于该id的对象的下标（待优化）
 * @param {Number} id 需要比较的id
 * @param {Array} arr 待遍历的数组
 */
function getIndex(id, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) return i;
    }
    return -1;
}

/**
 * 删除待遍历数组对应下标的对象
 * @param {Number} index 对象的下标
 * @param {Array} arr 待遍历的数组
 */
function deleteMovieByIndex(index, arr) {
    arr.splice(index, 1);
}

/**
 * 处理删除确认事件
 */
function handleConfirm() {
    event.stopPropagation();
    var id = movieId;
    var index = getIndex(id, movieCollectionBoxData);
    if (index != -1) {
        deleteMovieByIndex(index, movieCollectionBoxData);
        alert('删除成功');
    } else {
        alert('发生未知的错误！');
    }
    printCollectionDetail();
    //关闭删除确认框
    controlAside('#confirmArticle', 1000, false);
    //隐藏mask
    controlAside('#maskArticle', 0, false);
}

/**
 * 处理删除取消事件
 */
function handleCancle() {
    event.stopPropagation();
    //关闭删除确认框
    controlAside('#confirmArticle', 1000, false);
    //隐藏mask
    controlAside('#maskArticle', 0, false);
}