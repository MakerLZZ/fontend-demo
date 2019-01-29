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
                    :src="item.images.small"
                    :alt="item.title"
                    @click="handleCheckClick(item.id)"
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
import movieDetailCard from '../components/movieDetailCard';
export default {
    name: 'movieProxy',
    components:{
        movieDetailCard
    },
    data () {
        return {
            // 请求数据地址
            url: `/api/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=深圳
                &start=0&count=100&client=somemessage&udid=dddddddddddddddddddddd`,
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
                // 主演
                casts: [],
                // 类型
                genres: [],
                // 上映日期
                pubdates: [],
                // 片长
                durations: [],
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
            // 代理的方式解决跨域（config/index文件中）
            this.$axios.get(this.url).then((res) => {
                this.movieBoxData = res.data.subjects;
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
            this.detailData.image = movie.images.small;
            this.detailData.directors = this.jointStr(movie.directors,'name');
            this.detailData.casts = this.jointStr(movie.casts,'name');
            this.detailData.genres = this.jointStr(movie.genres);
            this.detailData.pubdates = this.jointStr(movie.pubdates);
            this.detailData.durations = this.jointStr(movie.durations);
            // 显示蒙版和弹框
            this.isShow = true;
        },
        /**
         * 拼接字符串
         * @param {Aarry} arr 需要操作的数组
         * @param {String} att 对象数组时需要的属性名称
         */
        jointStr(arr,att) {
            var str = '';
            let i = 0;
            arr.forEach(item => {
                let items = att?item[att]:item;
                if(i === 0){
                    str += items;
                } else {
                    str = str + ' / ' + items;
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

<style lang="scss">
</style>