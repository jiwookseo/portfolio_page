<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2>Portfolio</h2>
            <p>{{portfolios}}</p>
            <div @click="postPortfolio">Create</div>
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
        let title = 'test'
        let content = 'test'
        let img = 'test'
        firestore.postPortfolio(title, content, img)
      }
    }
}
</script>


<style lang="scss" scoped>
.content {
    margin-top: 50px;
    padding-top: 10px;
    height: 1000px;
    h2 {
        text-align: center;
        font-size: 2em;
    }
}
</style>
