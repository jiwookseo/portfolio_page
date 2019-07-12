<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2>Portfolio</h2>
            <PortfolioList :limit=8 :allowCreate=true />
            <div>
              <div class="more">Load More</div>
            </div>
        </div>
    </div>
</template>


<script>
import firestore from '../firebase/firestore';
import HeaderSub from '../components/HeaderSub';
import PortfolioList from '../components/PortfolioList';

export default {
    name: "PortfolioPage",
    components: {
        HeaderSub,
        PortfolioList
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
@import "../css/style.scss";
.content {
    margin-top: 50px;
    padding-top: 10px;
    height: auto;
    h2 {
        text-align: center;
        font-size: 2em;
    }
}
.more {
  width: 120px; height: 40px;
  line-height: 37px;
  border: 1.5px solid $nav-bg;
  text-align: center;
  margin: 0 auto 100px;
  cursor: pointer;
}
</style>
