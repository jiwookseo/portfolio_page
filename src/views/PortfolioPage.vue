<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2>Portfolio</h2>
            <PortfolioList :limit=8 :allowCreate=true />
            <div>
              <div>Load More</div>
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
.content {
    margin-top: 50px;
    padding-top: 10px;
    height: 2000px;
    h2 {
        text-align: center;
        font-size: 2em;
    }
}
</style>
