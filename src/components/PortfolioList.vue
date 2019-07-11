<template>
    <v-container>
        <v-layout row wrap>
            <v-flex class="portfolio" v-for="i in portfolios.length > limit ? limit : portfolios.length" :key="portfolios[i-1].id" xs12 sm6 md4 lg3>
                <div class="portfolio-content">
                    <div class="img" :style="{'background-image': 'url(' + portfolios[i-1].img + ')'}"></div>
                    <div class="content">
                        <h5 class="title">{{ portfolios[i-1].title }}</h5>
                        <div class="more">View More</div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <div>Title: <input type="text" v-model="title"><br>
            Content: <input type="text" v-model="content"><br>
            ImgURL: <input type="text" v-model="img"><br>
            <span @click="postPortfolio">Create</span>
            </div>
        </v-layout>
    </v-container>
</template>


<script>
import firestore from '../firebase/firestore';

export default {
    name: "PortfolioList",
    props: {
        limit: {type: Number, default: 4}
    },
    data() {
        return {
            title: '',
            content: '',
            img: '',
            portfolios: []
        }
    },
    mounted() {
      this.getPortfolios();
    },
    methods: {
      async getPortfolios() {
        this.portfolios = await firestore.getPortfolios();
      },
      postPortfolio() {
        firestore.postPortfolio(this.title, this.content, this.img);
        this.title = '',
        this.content = '',
        this.img = ''
      }
    }
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

.portfolio {
    // width: 250px;
    height: 200px;
    // border: 1px solid red;
    padding: 10px 5px;
    @include viewportMax(960) {
        padding: 10px 5%;
    }
    @include mobile {
        padding: 10px 10%;
    }
}
.portfolio-content {
    width: 100%; height: 100%;
    position: relative;
    // border: 1px solid blue;
    overflow: hidden;
    .img {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        background-size: cover;
        background-position: center;
        transition: all 0.3s;
    }
    .content {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        background: rgba(4, 5, 31, 0);
        transition: all 0.3s;
        .title {
            position: absolute;
            top: 10%;
            width: 100%;
            text-align: center;
            padding: 20px 20px;
            color: white;
            @include textTruncate;
            opacity: 0;
            transition: all 0.3s;
        }
        .more {
            width: 120px;
            height: 40px;
            line-height: 37px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 20%;
            text-align: center;
            color: white;
            border: 1.5px solid white;
            margin: 20px auto 0;
            opacity: 0;
            transition: all 0.3s;
            cursor: pointer;
        }
    }
    &:hover{
        .content {
            background: rgba(4, 5, 31, 1);
            .title, .more {opacity: 1}
        }
        .img {
            transform: scale(1.1);
        }
    }
}


</style>
