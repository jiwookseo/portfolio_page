<template>
  <div id="wrap">
    <HeaderHome :websiteTitle="'Team Six'" />
    <div class="homeContent">
      <section id="aboutme">
        <h2 class="section-title text" data-aos="fade-right">About me</h2>
        <v-container>
          <v-layout row wrap>
            <v-flex xs8 offset-xs2 sm4 offset-sm0 class="content-container" data-aos="fade-right">
              <div class="inner">
                <img src="../assets/teamsix.png" alt="Team Six" />
              </div>
            </v-flex>
            <v-flex xs12 sm8 class="content-container" data-aos="fade-left">
              <div class="inner text">
                안녕하세요. SSAFY 서울 2반 6조입니다!
                <br />웹/모바일 프로젝트로 Vue.js와 파이어베이스를 통해 포트폴리오 블로그를 만들고 있습니다.
                <br />프로젝트 기간동안 좋은 결과물 만들 수 있도록 노력하겠습니다!
                <br />
                <br />프로젝트 진행 기간 : 2019.07.09. ~ 2019.07.19.
              </div>
              <p v-if="user">{{user}}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      <section id="portfolio">
        <h2 class="section-title text" data-aos="fade-left">Portfolio</h2>
        <PortfolioList :limit="4" />
        <div class="section-btn-box" data-aos="fade-up">
          <router-link :to="{name: 'PortfolioDetailPage', params: {id: this.portfolios[0].id}}">
            <div class="section-more-btn text">
              More Portfolios
              <i class="material-icons">arrow_forward</i>
            </div>
          </router-link>
        </div>
      </section>
      <section id="post">
        <h2 class="section-title text" data-aos="fade-right">Post</h2>
        <PostList :limit="4" />
        <div class="section-btn-box" data-aos="fade-up">
          <router-link :to="{name: 'PostDetailPage', params: {id: this.posts[0].id}}">
            <div class="section-more-btn text">
              More Posts
              <i class="material-icons">arrow_forward</i>
            </div>
          </router-link>
        </div>
      </section>
      <section id="project">
        <h2 class="section-title text" data-aos="fade-left">Project</h2>
        <LineChart class="linechart hideMobile" data-aos="fade-up" />
        <Radarchart class="radarchart hideMobile" data-aos="fade-up" />
        <div class="section-btn-box hideMobile" data-aos="fade-up">
          <a target="_blank" href="https://lab.ssafy.com/jiwonjulietyoon/webmobile-sub2">
            <div class="section-more-btn text">
              View GitLab
              <i class="material-icons">arrow_forward</i>
            </div>
          </a>
        </div>
        <div class="showMobile deviceRotateMsg" data-aos="fade-up">
          <div>
            <span>
              <i class="material-icons">screen_rotation</i>
            </span>
          </div>
          <p class="text">Please rotate your device to landscape mode.</p>
        </div>
      </section>
      <Footer />
    </div>
  </div>
</template>

<script>
import "../js/navbar.js";
import firestore from "../firebase/firestore";
import HeaderHome from "../components/HeaderHome";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import LineChart from "../components/LineChart";
import Footer from "../components/Footer";
import Radarchart from "../components/RadarChart";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  components: {
    HeaderHome,
    PortfolioList,
    PostList,
    LineChart,
    Footer,
    Radarchart
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["loginSuccess", "user", "currentUserAuthority", "portfolios", "posts"])
  },
  mounted() {
    this.addLog();
  },
  methods: {
    scrollTo(target) {
      let targetscrolltop = $(target).offset().top;
      setTimeout(function() {
        $("html, body").animate({ scrollTop: targetscrolltop + 10 }, 700);
      }, 200);
    },
    addLog() {
      let username = "";
      if (!this.user) {
        username = "Anonymous User";
      } else {
        username = this.user.email;
      }
      let time = new Date();
      firestore.addLog("/", username, time.getDay());
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

a,
a:hover {
  color: initial;
}
#wrap {
  width: 100%;
}
::-webkit-scrollbar {
  display: none;
}
.homeContent {
  width: 100%;
}
section {
  width: 100%;
  height: 100%;
  padding: 80px 0 50px;
  position: relative;
  &:nth-of-type(odd) {
    background: $bg-light;
  }
  &:nth-of-type(even) {
    background: white;
  }
}

#aboutme {
  .content-container {
    height: auto;
    padding: 10px;
    &:first-child {
      @include viewportMin(1264) {
        padding-right: 10px;
        padding-left: 10%;
      }
    }
    &:last-child {
      @include viewportMin(1264) {
        padding-left: 10px;
        padding-right: 10%;
      }
    }
  }
  .inner {
    height: auto;
    font-size: 16px;
    img {
      width: 100%;
      box-shadow: 0 0 0 6px $footer-bg;
    }
  }
}

#project {
  padding: 80px 30px 80px;
  .linechart .radarchart {
    @include mobile {
      display: none;
    }
  }
  .radarchart {
    margin-top: 100px;
  }
}

.section-more-btn {
  display: inline-block;
  padding: 10px 15px 17px 25px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: white;
  background: $blue-accent;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s;
  i {
    transform: translateY(7px);
    margin-left: 50px;
  }
  &::before {
    content: "";
    position: absolute;
    right: -20px;
    top: -45%;
    width: 70px;
    height: 100px;
    background: $blue-accent-light;
    transform: rotate(-20deg);
    transition: all 0.3s;
  }
  &:hover::before {
    width: 90px;
  }
  &:active {
    transform: translate(-50%, 2px);
  }
}

$slant_h: 30px;
$slant_m: 20px;
@mixin slanted {
  width: 100%;
  content: "";
  position: absolute;
  left: 0;
  border-style: solid;
  z-index: 8;
  bottom: $slant_h * -1;
}
#aboutme::after,
#post::after {
  @include slanted;
  border-width: 0 100vw $slant_h 0;
  border-color: transparent $bg-light transparent transparent;
  @include mobile {
    bottom: $slant_m * -1;
    border-width: 0 100vw $slant_m 0;
  }
}
#portfolio::after {
  @include slanted;
  border-width: 0 0 $slant_h 100vw;
  border-color: transparent transparent transparent white;
  @include mobile {
    bottom: $slant_m * -1;
    border-width: 0 0 $slant_m 100vw;
  }
}

.hideMobile {
  @include mobile {
    display: none;
  }
}
.showMobile {
  @include viewportMin(601) {
    display: none;
  }
}

.deviceRotateMsg {
  & > div {
    height: 100px;
    position: relative;
    span {
      @include centerItem;
      i {
        font-size: 4em;
        transform: rotate(45deg);
        animation: spin 2.5s linear infinite;
      }
    }
  }
  p {
    text-align: center;
  }
}
@keyframes spin {
  0% {
    transform: rotate(45deg);
  }
  10% {
    transform: rotate(45deg);
  }
  35% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}
</style>
