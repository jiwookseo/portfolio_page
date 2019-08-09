<template>
  <v-container class="vContainer">
    <v-layout row wrap>
      <v-flex
        class="portfolio"
        v-for="i in portfolios.length > portfolioLimit ? portfolioLimit : portfolios.length"
        :key="portfolios[i-1].id"
        xs12
        sm6
        md4
        lg3
      >
        <div class="portfolio-content" data-aos="fade-up">
          <img
            class="img"
            :src="portfolios[i-1].img"
            :alt="portfolios[i-1].title + ' (portfolio image)'"
          />
          <div class="content">
            <h3 class="title text">{{ portfolios[i-1].title }}</h3>
            <router-link :to="{name: 'PortfolioDetailPage', params: {id: portfolios[i-1].id}}">
              <div class="more text">Read More</div>
            </router-link>
            <div
              class="btn-box"
              v-if="user && (user.authority==='1' || user.id === portfolios[i-1].userID)"
            >
              <div class="update" @click="updateArticle(portfolios[i-1].id)">
                <i class="material-icons">edit</i>
              </div>
              <div class="delete" @click="deleteConfirm(i)">
                <i class="material-icons">delete</i>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex v-if="allowCreate && isAdmin" class="portfolio" xs12 sm6 md4 lg3>
        <div class="portfolio-content new" @click="writeNewArticle" data-aos="fade-up">
          <span>+ New Portfolio</span>
        </div>
      </v-flex>
      <div class="section-btn-box" v-if="allowCreate && portfolioLimit < portfolios.length">
        <div class="load-more-btn" @click="loadMore">Load More</div>
      </div>
      
    </v-layout>
  </v-container>
</template>


<script>
import firestore from "@/firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: "PortfolioList",
  props: {
    limit: { type: Number, default: 6 },
    allowCreate: { type: Boolean, default: false }
  },
  watch: {
    limit: function() {
      this.portfolioLimit = this.limit;
    },
    askSnackbar() {
      if (this.askSnackbar.confirm === "portfolio") {
        this.deletePortfolio();
      }
    }
  },
  computed: {
    ...mapGetters(["askSnackbar", "user", "portfolios"]),
    ...mapGetters({ isAdmin: "checkIfAdmin" })
  },
  data() {
    return {
      selectedID: -1,
      created_at: 0,
      dialogWrite: false,
      deleteID: "",
      portfolioLimit: 6
    };
  },
  methods: {
    writeNewArticle() {
      this.$router.replace({name: 'NewPortfolio'})
    },
    updateArticle(id) {
      this.$router.replace({name: 'PortfolioUpdate', params: {id: id}})
    },
    openPortfolioWriter(index = -1) {
      this.selectedID = index === -1 ? "" : this.portfolios[index - 1].id;
      this.dialogWrite = true;
    },
    deleteConfirm(index) {
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: "Delete this portfolio?",
        button: "Delete",
        type: "portfolio"
      });
      this.deleteID = this.portfolios[index - 1].id;
    },
    deletePortfolio() {
      firestore.deleteArticle("portfolios", this.deleteID).then(() => {
        this.$store.dispatch("getArticles", "portfolios");
        this.deleteID = "";
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: "Portfolio deleted"
        });
      });
    },
    parents() {
      this.dialogWrite = false;
    },
    loadMore() {
      this.portfolioLimit += 6;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";

a,
a:hover {
  color: initial;
}
.portfolio {
  height: 200px;
  padding: 10px 5px;
  @include viewportMax(960) {
    padding: 10px 5%;
  }
  @include mobile {
    padding: 10px 10%;
  }
}
.portfolio-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  .img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    transition: all 0.3s;
  }
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #3d4756;
    transition: all 0.5s;
    opacity: 0;
    color: white;
    .title {
      position: absolute;
      top: 15%;
      width: 100%;
      text-align: center;
      padding: 20px 20px;
      @include textTruncate;
    }
    .more {
      padding: 5px 15px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 20%;
      border: 1.5px solid white;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
      color: white;
      white-space: nowrap;
      background-image: linear-gradient(to right, white 50%, transparent 50%);
      background-size: 200% 100%;
      background-position: right;
      &:hover {
        background-position: left;
        color: #3d4756;
      }
    }
    .btn-box {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .delete,
    .update {
      display: inline-block;
      margin-right: 5px;
      cursor: pointer;
      transform-origin: bottom;
      i {
        font-size: 1.5em;
      }
      &:hover {
        animation: jiggle 0.15s linear 0.2s 4 forwards;
      }
    }
  }
  &:hover {
    .content {
      opacity: 1;
    }
    .img {
      transform: scale(1.1);
    }
  }
}
@keyframes jiggle {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0);
  }
}
.portfolio-content.new {
  box-shadow: inset 0 0 0 4px $light-gray;
  color: $light-gray;
  transition: color 0.25s 0.09s;
  position: relative;
  cursor: pointer;
  span {
    font-size: 1.5em;
    @include centerItem;
    white-space: nowrap;
  }
  &::before,
  &::after {
    border: 0 solid transparent;
    content: "";
    box-sizing: border-box;
    pointer-events: none;
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0;
    right: 0;
    border-radius: 5px;
  }
  &::before {
    border-bottom-width: 4px;
    border-left-width: 4px;
  }
  &::after {
    border-top-width: 4px;
    border-right-width: 4px;
  }
  &:hover {
    color: $blue-accent;
  }
  &:hover::before,
  &:hover::after {
    border-color: $blue-accent;
    transition: border-color 0s, width 0.25s, height 0.25s;
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    transition-delay: 0s, 0s, 0.25s;
  }
  &:hover::after {
    transition-delay: 0s, 0.25s, 0s;
  }
}

</style>
