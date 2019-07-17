<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2 class="section-title text">Portfolio</h2>
            <PortfolioList :limit=6 :allowCreate=true />
        </div>
        <Footer />
    </div>
</template>


<script>
import firestore from '../firebase/firestore';
import HeaderSub from '../components/HeaderSub';
import PortfolioList from '../components/PortfolioList';
import Footer from "../components/Footer";

export default {
    name: "PortfolioPage",
    components: {
        HeaderSub,
        PortfolioList,
        Footer
    },
    data() {
      return {
        
      }
    },
    mounted() {
      this.addLog();
    },
    methods: {
      addLog() {
        let username = '';
        if (!this.$store.getters.user) {
          username = "Anonymous User";
        }
        else {
          username = this.$store.getters.user.email;
        }
        let time = new Date();
        firestore.addLog("/portfolio", username, time.getTime());
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
