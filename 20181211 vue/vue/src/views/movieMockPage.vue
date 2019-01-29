<template>
    <div
        class="movie-box"
        v-if="movieBoxData"
    >
        <div
            class="box-item"
            v-for="(item, index) in movieBoxData"
            :key="index"
        >
            <div>
                <img
                    class="box-item-img"
                    @click="handleCheckClick(item.id)"
                    :src="item.image"
                    :alt="item.title"
                >
            </div>
            <div>
                <p class="box-item-p">{{item.title}}</p>
            </div>
            <div class="box-item-bottom">
                <span>{{item.mainland_pubdate}}</span><a
                    href="javascript:void(0)"
                    @click="handleCheckClick(item.id)"
                >查看</a>
            </div>
        </div>
        <movie-detail-card v-if="isShow" @handleIsShow=handleIsShow :movieDetail="detailData"/>
        <article :class="loading">
            <img
                class="img"
                src="../assets/img/loading.png"
                alt="loading"
            >
        </article>
    </div>
    <div v-else>
        暂无信息
    </div>
</template>

<script>
import Mock from 'mockjs';
import movieDetailCard from '../components/movieDetailCard';
export default {
    name: 'movieMock',
    components:{
        movieDetailCard
    },
    data () {
        return {
            // 请求数据地址（自定义）
            url: '/vue/movie',
            // 电影盒子数据
            movieBoxData: [],
            // loding
            loading: 'loading-hidden',
            // 电影盒子开关
            isShow: false,
            // 电影详情数据(弹框)
            detailData: {
                // 标题
                title: '',
                // 年份
                year: '',
                // 图片
                image: '',
                // 导演
                directors: [],
                // 编剧
                scriptwriter: [],
                // 主演
                casts: [],
                // 类型
                genres: [],
                // 制片国家
                region: [],
                // 语言
                language: '',
                // 上映日期
                pubdates: [],
                // 片长
                durations: [],
                // 又名
                alias: [],
            },
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        /**
         * 加载数据
         */
        loadData() {
            this.loading = 'loading';
            // mock 拦截请求
            Mock.mock(this.url, 'get', function() {
                return Mock.mock({
                    'movie|5-50':[{
                        id: '@id',
                        // 标题
                        'title': '@ctitle(4, 15)',
                        // 大陆发布时间
                        'mainland_pubdate': '2018-12-07',
                        // 年份
                        'year': '@date("yyyy")',
                        // 图片
                        'image': Mock.Random.dataImage('200x100','vue'),
                        // 导演
                        'directors|1-2': [
                            '@cname',
                        ],
                        // 编剧
                        'scriptwriter|3-5': [
                            '@cname',
                        ],
                        // 主演
                        'casts|5-6': [
                            '@cname',
                        ],
                        // 类型
                        'genres': [
                            '动作',
                            '奇幻',
                            '冒险'
                        ],
                        // 制片国家
                        'region': [
                            '中国',
                            '英国',
                            '美国'
                        ],
                        // 语言
                        'language': '@province',
                        // 上映日期
                        'pubdates': [
                            '2018-12-07（中国大陆）',
                            '2018-12-21（美国）'
                        ],
                        // 片长
                        'durations': '143分钟',
                        // 又名
                        'alias|1-2': [
                            '@ctitle(3,4)'
                        ],
                    }]
                });
            });
            
            // 请求数据
            this.$axios.get(this.url).then((res) => {
                this.movieBoxData = res.data.movie;
                this.loading = 'loading-hidden';
            }).catch((err) => {
                alert(err.toString());
                this.loading = 'loading-hidden';
            });
        },
        /**
         * 处理查看电影详情点击事件
         * @param {Number} id 电影id
         */
        handleCheckClick(id) {
            let movie = this.movieBoxData.find((v) => {
                return v.id == id;
            });
            // 根据id请求到数据后 绑定数据
            this.detailData.title = movie.title;
            this.detailData.year = movie.year;
            this.detailData.image = movie.image;
            this.detailData.directors = this.jointStr(movie.directors);
            this.detailData.scriptwriter = this.jointStr(movie.scriptwriter);
            this.detailData.casts = this.jointStr(movie.casts);
            this.detailData.genres = this.jointStr(movie.genres);
            this.detailData.region = this.jointStr(movie.region);
            this.detailData.language = movie.language;
            this.detailData.pubdates = this.jointStr(movie.pubdates);
            this.detailData.durations = movie.durations;
            this.detailData.alias = this.jointStr(movie.alias);
            // 显示蒙版和弹框
            this.isShow = true;
        },
        /**
         * 拼接字符串
         * @param {Aarry} arr 需要操作的数组
         */
        jointStr(arr) {
            var str = '';
            let i = 0;
            arr.forEach(item => {
                if(i === 0){
                    str += item;
                } else {
                    str = str + ' / ' + item;
                }
                i++;
            });
            return str;
        },
        /**
         * 处理关闭弹框点击事件
         */
        handleIsShow() {
            this.isShow = false;
        },
    }
};
</script>

<style lang="scss" scoped>

</style>