<template>
  <div class="imgBannerOuter">
    <img :src="imgSrc" alt="Main Image Banner" class="imgBanner" />
    <div class="imgBannerContent">
      <div class="changeBgBtnBox">
        <transition name="bg-random">
          <div
            class="randomImg"
            @click="useRandomImg"
            v-show="showChangeBgMenu"
            title="Use Random Image"
          >
            <i class="material-icons">wallpaper</i>
          </div>
        </transition>
        <transition name="bg-select">
          <div class="selectImg" @click="pickFile" v-show="showChangeBgMenu" title="Select Image">
            <i class="material-icons">image_search</i>
          </div>
        </transition>
        <div class="changeBg" @click="toggleChangeBgMenu" :class="{btnActive: showChangeBgMenu}">
          <i class="material-icons">photo_library</i>
        </div>
      </div>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
      <div class="bannerTitle">Team Six !!!!!</div>
      <div class="scrollPrompt" @click="scrollTo()">
        SCROLL DOWN
        <i class="material-icons">arrow_drop_down</i>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ImgBanner",
  data() {
    return {
      showChangeBgMenu: false,
      defaultImage: "https://picsum.photos/1600/900"
    };
  },
  computed: {
    imgSrc() {
      if (this.user) {
        return this.user.photoURL || this.defaultImage;
      } else {
        return this.defaultImage;
      }
    },
    ...mapGetters({
      isAdmin: "checkIfAdmin",
      user: "user"
    })
  },
  watch: {},
  methods: {
    scrollTo() {
      this.$parent.scrollTo("#aboutme");
    },
    toggleChangeBgMenu() {
      this.showChangeBgMenu = !this.showChangeBgMenu;
    },
    useRandomImg() {
      if (this.imgSrc !== this.defaultImage) {
        this.$store.dispatch("setSpinner", {
          loading: true,
          message: "Changing..."
        });
        this.$store.dispatch("setUserPhoto", this.defaultImage);
        this.showChangeBgMenu = false;
        setTimeout(() => {
          this.$store.dispatch("setSpinner", { loading: false });
        }, 1500);
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked() {
      const formData = new FormData();
      const file = this.$refs.image.files[0];
      formData.append("image", file, file.name);
      this.$store.dispatch("setSpinner", {
        loading: true,
        message: "Changing..."
      });
      axios
        .post("https://api.imgur.com/3/image/", formData, {
          headers: {
            Authorization: "Client-ID 5d0f43f26473d77"
          }
        })
        .then(res => {
          this.$store.dispatch("setUserPhoto", res.data.data.link);
          setTimeout(() => {
            this.$store.dispatch("setSpinner", { loading: false });
          }, 1500);
        });
      this.showChangeBgMenu = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/style.scss";

.imgBannerOuter {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  // background-position: center;
  // background-attachment: fixed;
  // background-size: cover;
  .imgBanner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  .imgBannerContent {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(0, 0, 0, 0.2);
    .bannerTitle {
      text-align: center;
      font-family: $font-title;
      font-size: 5em;
      color: white;
      text-shadow: 1px 1px 0px #181818, 2px 2px 5px white, -2px -2px 5px white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.changeBgBtnBox {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 200px;
  color: white;
  .randomImg,
  .selectImg,
  .changeBg {
    position: absolute;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
  }
  .changeBg {
    bottom: 0;
    opacity: 0.1;
    transition: all 0.3s;
    i {
      @include centerItem;
    }
    &:hover {
      opacity: 0.5;
    }
  }
  .btnActive {
    opacity: 0.5 !important;
  }
  .randomImg,
  .selectImg {
    transition: all 0.5s;
    opacity: 0.5;
    i {
      @include centerItem;
    }
  }
  .selectImg {
    bottom: 60px;
  }
  .randomImg {
    bottom: 120px;
  }
}

.bg-random-enter-active,
.bg-random-leave-active,
.bg-select-enter-active,
.bg-select-leave-active {
  transition: all 0.5s ease;
}
.bg-select-enter,
.bg-select-leave-to {
  transform: translateY(60px);
  opacity: 0;
}
.bg-random-enter,
.bg-random-leave-to {
  transform: translateY(120px);
  opacity: 0;
}

.scrollPrompt {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  padding: 5px 20px 12px 25px;
  color: white;
  border: 1.5px solid white;
  cursor: pointer;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  i {
    transform: translateY(7px);
  }
  &::before,
  &::after {
    content: "";
    width: 95%;
    height: 135%;
    border: 0px solid white;
    transition: all 0.3s;
    @include centerItem;
  }
  &::before {
    border-top-width: 1.5px;
    border-bottom-width: 1.5px;
    transform: translate(-50%, -50%) scaleX(0);
    transform-origin: left;
  }
  &::after {
    border-left-width: 1.5px;
    border-right-width: 1.5px;
    transform: translate(-50%, -50%) scaleY(0);
    transform-origin: top;
  }
  &:hover::before {
    transform: translate(-50%, -50%) scaleX(1);
  }
  &:hover::after {
    transform: translate(-50%, -50%) scaleY(1);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>

