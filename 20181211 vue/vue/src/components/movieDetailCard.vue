<template>
    <section>
        <div
            class="mock"
            @click="handleCloseClick"
        >
            <article
                class="detail-box"
                @click.stop
            >
                <div class="detail-box-head">
                    <h5 :title="`${movieDetail.title}（${movieDetail.year}）`">
                        <span class="detail-title">{{movieDetail.title}}</span><span class="detail-year">（{{movieDetail.year}}）</span>
                    </h5>
                    <button
                        @click="handleCloseClick"
                        type="button"
                    >X</button>
                </div>
                <div class="detail-box-body">
                    <div class="detail-box-row">
                        <div class="detail-box-col-4"><img :src="movieDetail.image"></div>
                        <div class="detail-box-col-8">
                            <div>
                                <label>导演：</label><span>{{movieDetail.directors}}</span>
                            </div>
                            <div v-if="movieDetail.scriptwriter">
                                <label>编剧：</label><span>{{movieDetail.scriptwriter}}</span>
                            </div>
                            <div>
                                <label>主演：</label><span>{{movieDetail.casts}}</span>
                            </div>
                            <div>
                                <label>类型：</label><span>{{movieDetail.genres}}</span>
                            </div>
                            <div v-if="movieDetail.region">
                                <label>制片国家/地区：</label><span>{{movieDetail.region}}</span>
                            </div>
                            <div v-if="movieDetail.language">
                                <label>语言：</label><span>{{movieDetail.language}}</span>
                            </div>
                            <div>
                                <label>上映日期：</label><span>{{movieDetail.pubdates}}</span>
                            </div>
                            <div>
                                <label>片长：</label><span>{{movieDetail.durations}}</span>
                            </div>
                            <div v-if="movieDetail.alias">
                                <label>又名：</label><span>{{movieDetail.alias}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'movieDetailCard',
        props: ['movieDetail'],
        methods:{
            /**
             * 处理关闭弹框点击事件
             */ 
            handleCloseClick() {
                this.$emit('handleIsShow');
            },
        }
    };
</script>

<style lang="scss" scoped>
.mock {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(221, 213, 213, 0.5);

    .detail-box {
        position: fixed;
        top: 20%;
        left: 50%;
        z-index: 1000;
        width: 520px;
        height: 310px;
        margin: 0 0 0 -260px;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        overflow: auto;
        background-color: #fff;

        .detail-box-head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding: 10px 15px;
            border-bottom: 1px solid #b5b5b5;

            h5 {
                margin: 0;
                overflow: hidden;
                font-size: 26px;
                font-weight: bold;
                line-height: 1.1;
                text-overflow: ellipsis;
                white-space: nowrap;

                .detail-title {
                    color: #494949;
                }

                .detail-year {
                    color: #888;
                }
            }

            button {
                width: 50px;
                height: 30px;
                margin: 0;
                padding: 0;
                outline: none;
                border: 0;
                font-size: 22px;
                color: #999;
                cursor: pointer;
                background-color: #fff;
            }
        }

        .detail-box-body {
            .detail-box-row {
                display: flex;
                justify-content: left;
                font-size: 14px;

                .detail-box-col-4 {
                    flex: 0.3;
                    padding-left: 15px;
                    text-align: left;

                    img {
                        max-width: 135px;
                        min-height: 200px;
                        max-height: 200px;
                    }
                }

                .detail-box-col-8 {
                    flex: 1;
                    padding: 0 15px;
                    text-align: left;

                    label {
                        color: #666;
                    }

                    span {
                        color: #000;
                    }
                }

                .detail-box-col-8 > div {
                    margin-bottom: 5px;
                }
            }
        }
    }
}
</style>