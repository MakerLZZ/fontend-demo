window.onload = function () {
    new Index({
        mapboxId: 'allMap',
        point: {
            lng: '106.530635013',
            lat: '29.5446061089'
        }
    });
};

function Index(obj) {
    // 创建Map实例
    this.map = new BMap.Map(obj.mapboxId);
    // 创建一个中心点
    this.point = new BMap.Point(obj.point.lng, obj.point.lat);
    // 控件参数容器
    this.addControlArgs = [];
    // 标注参数容器
    this.addOverlayArgs = [];
    // 自定义窗口初始化
    this.infoBox = null;
    this.init();
}

Index.prototype = {
    /**
     * 初始化
     */
    init: function () {
        this.createMap();
        this.addTypeAndOverView();
        this.addCircle();
        this.myInfoBox();
        this.drawPolyline();
        this.addStCtrl();
        this.addControl();
        this.addOverlay();
    },
    /**
     * 添加控件
     */
    addControl: function () {
        for (var i = 0; i < this.addControlArgs.length; i++) {
            this.map.addControl(this.addControlArgs[i]);
        }
    },
    /**
     * 添加标注 
     */
    addOverlay: function () {
        for (var i = 0; i < this.addOverlayArgs.length; i++) {
            this.map.addOverlay(this.addOverlayArgs[i]);
        }
    },
    /**
     * 创建地图
     */
    createMap: function () {
        // 初始化地图 设置中心点坐标(重庆) 地图级别(6)
        this.map.centerAndZoom(this.point, 6);
        // 设置地图显示的城市 此项是必须设置的
        this.map.setCurrentCity('重庆');
        // 开启鼠标滚轮缩放
        this.map.enableScrollWheelZoom(true);
    },
    /**
     * 添加地图类型和缩略图控件
     */
    addTypeAndOverView: function () {
        // 添加地图类型控件
        var mapType = new BMap.MapTypeControl({
            mapTypes: [
                // 普通图
                BMAP_NORMAL_MAP,
                // 三维图
                // BMAP_PERSPECTIVE_MAP,
                // 卫星图
                BMAP_SATELLITE_MAP,
                // 卫星加路网混合图
                BMAP_HYBRID_MAP
            ]
        });
        this.addControlArgs.push(mapType);
        // 添加缩略图控件
        var overView = new BMap.OverviewMapControl();
        this.addControlArgs.push(overView);
        //右下角，打开 
        var overViewOpen = new BMap.OverviewMapControl({
            isOpen: true,
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT
        });
        this.addControlArgs.push(overViewOpen);
    },
    /**
     * 添加一个围栏（半径5000米,自定义标注图标）
     */
    addCircle: function () {
        // 创建围栏
        var myCircleStyle = {
            strokeColor: '#fcc33e',
            fillColor: '#ffd66a',
            strokeWeight: 2,
            fillOpacity: 0.5
        };
        // 围栏范围增大到225000 配合地图级别为6的效果
        var circle = new BMap.Circle(this.point, 225000, myCircleStyle);
        this.addOverlayArgs.push(circle);
        // 创建自定义标注图标
        var iconUrl = './img/automobile_gray.png';
        // 可视区域的大小
        var viewSize = new BMap.Size(29, 28);
        // 图标大小
        var iconSize = new BMap.Size(29, 28);
        var myIcon = new BMap.Icon(iconUrl, viewSize, { imageSize: iconSize });
        // 创建标注
        var marker = new BMap.Marker(this.point, { icon: myIcon });
        // 将标注添加到地图中
        this.addOverlayArgs.push(marker);
        // 添加标注动画
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        // 给标注绑定点击事件
        this.addClickHandler('重庆-重庆市', marker);
    },
    /**
     * 自定义弹窗（点击围栏里的标注使用信息窗口显示当前的地址和坐标，多个标注点击显示信息框）
     */
    myInfoBox: function () {
        // 初始化点阵(中国所有主要城市) cityPoints来自/lib/chinaCityPoints.js
        var dataInfo = cityPoints;
        // 自定义标注
        var cityIconUrl = './img/home_icon_locat@2x.png';
        var cityIconViewSize = new BMap.Size(20, 20);
        var cityIconSize = new BMap.Size(20, 20);
        var cityIcon = new BMap.Icon(cityIconUrl, cityIconViewSize, { imageSize: cityIconSize });
        // 循环显示标注 并绑定点击事件
        for (var i = 0; i < dataInfo.length; i++) {
            var markers = new BMap.Marker(new BMap.Point(dataInfo[i][0], dataInfo[i][1]), { icon: cityIcon });  // 创建标注
            var content = dataInfo[i][2];
            // 将标注添加到地图中
            this.addOverlayArgs.push(markers);
            // 绑定每个标注的点击事件
            this.addClickHandler(content, markers);
        }
        //信息窗口HTML
        var infoBoxHtml = [
            '<div class="info-box">',
            '<div class="box-head">',
            '<h5>位置信息</h5>',
            '<a id="closeInfoBtn">x</a>',
            '</div>',
            '<div class="box-body">',
            '<div class="box-content">',
            '<div><label class="label-point">坐标</label><span>：</span><span id="pointLng"></span><span>, </span><span id="pointLat"></span></div>',
            '<div><label>位置名称</label><span>：</span><span id="pointLocation"></span></div>',
            '</div>',
            '</div>',
            '<div class="box-angle"></div>',
            '</div>'
        ];
        // 创建自定义信息窗口对象
        this.infoBox = new BMapLib.InfoBox(this.map, infoBoxHtml.join(''), {
            enableAutoPan: true,
            align: INFOBOX_AT_TOP,
            offset: new BMap.Size(20, 150)
        });

    },
    /**
     * 添加标注的点击事件监听器
     * @param {String} content 需要显示的内容信息
     * @param {Object} markers 该标注对象
     */
    addClickHandler: function (content, markers) {
        markers.addEventListener('click', function (e) {
            // 开启信息窗口 以标注形式绑定
            this.infoBox.open(markers);
            // 注册信息窗口内容
            var p = e.target;
            this.$('pointLng').innerHTML = p.getPosition().lng;
            this.$('pointLat').innerHTML = p.getPosition().lat;
            this.$('pointLocation').innerHTML = content;
            this.$('closeInfoBtn').addEventListener('click', function () {
                this.infoBox.hide();
            }.bind(this));

            //this.registerInfo(infoBox,content, e);
        }.bind(this));
    },
    /**
     * 返回根据id获取的DOM元素
     * @param {String} id 需要所选元素的id
     */
    $: function (id) {
        return document.getElementById(id);
    },
    /**
     * 画折线（使用折线表示当前的起点和终点 ，json.js是坐标）
     */
    drawPolyline: function () {
        // 初始化点坐标 jsonData来自/lib/jsonData.js
        var pointsData = chinaPoints;
        var points = [];
        pointsData.forEach((item) => {
            var pointer = new BMap.Point(item.latLng.lng, item.latLng.lat);
            points.push(pointer);
        });
        // 创建折线
        var polyline = new BMap.Polyline(points, { strokeColor: 'red', strokeWeight: 10 });
        // 增加折线
        this.addOverlayArgs.push(polyline);
        // 起点终点
        var startIconUrl = './img/start.png';
        var endIconUrl = './img/end.png';
        // 可视区域的大小
        var endViewSize = new BMap.Size(30, 30);
        // 图标大小
        var endIconSize = new BMap.Size(30, 30);
        var startIcon = new BMap.Icon(startIconUrl, endViewSize, { imageSize: endIconSize });
        var endIcon = new BMap.Icon(endIconUrl, endViewSize, { imageSize: endIconSize });
        // 创建标注
        var startPoint = new BMap.Point(pointsData[0].latLng.lng, pointsData[0].latLng.lat);
        var endPoint = new BMap.Point(pointsData[pointsData.length - 1].latLng.lng, pointsData[pointsData.length - 1].latLng.lat);
        var startMarker = new BMap.Marker(startPoint, { icon: startIcon });
        var endMarker = new BMap.Marker(endPoint, { icon: endIcon });
        // 将标注添加到地图中
        this.addOverlayArgs.push(startMarker);
        this.addOverlayArgs.push(endMarker);
    },
    /**
     * 添加全景叠层
     */
    addStCtrl: function () {
        // 覆盖区域图层测试
        this.map.addTileLayer(new BMap.PanoramaCoverageLayer());
        // 构造全景控件
        var stCtrl = new BMap.PanoramaControl({
            anchor: BMAP_ANCHOR_TOP_LEFT
        });
        stCtrl.setOffset(new BMap.Size(20, 20));
        // 添加全景控件
        this.addControlArgs.push(stCtrl);
    }
};