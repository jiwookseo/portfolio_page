<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2 class="section-title text">Portfolio</h2>
            <PortfolioList :limit=8 :allowCreate=true />
            <div class="section-btn-box">
              <div class="load-more-btn">Load More</div>
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
@import "../css/mixin.scss";
.content {
    margin: 80px 0 50px;
    height: auto;
}

</style>
