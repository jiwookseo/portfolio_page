<template>
  <footer>
    <div class="footer-logo">
      <div>TS</div>
    </div>

    <div class="check-toggle">
      <div class="toggle toggle--daynight">
        <input
          type="checkbox"
          id="toggle--daynight"
          class="toggle--checkbox"
          v-model="checkWeather"
        />
        <label class="toggle--btn" for="toggle--daynight">
          <span class="toggle--feature"></span>
        </label>
      </div>
    </div>

    <transition name="weatherB">
      <div id="weather" v-show="checkWeather">
        <div title="Today's weather" v-on:close="exit">
          <div v-if="!!city">
            <div class="weather-city">
              <div class="city-name">{{ city }}</div>
              <skycon :condition="condition" width="40" height="40"></skycon>
            </div>
            <div>Temp : {{tempMin}}&deg;C / {{tempMax}}&deg;C</div>
            <div>Humidity : {{humidity}}%</div>
          </div>
        </div>
      </div>
    </transition>

    <div id="copyrights">SSAFY Team Six ©2019</div>
    <div id="top-btn" @click="totop">
      <span>
        <i class="material-icons">keyboard_arrow_up</i>
      </span>
    </div>
  </footer>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
import Vue from "vue";
import VueSkycons from "vue-skycon";

Vue.use(VueSkycons);

export default {
  name: "Footer",
  data() {
    return {
      query: "Seoul",
      error: false,
      city: "Seoul",
      weatherDescription: "",
      temp: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
      image: "",
      condition: "",
      checkWeather: "",
      chat: false
    };
  },
  methods: {
    totop() {
      setTimeout(function() {
        $("html, body").animate(
          {
            scrollTop: 0
          },
          1000
        );
      }, 200);
    },
    exit() {
      this.$exit();
    },
    showWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            this.query
          }&units=metric&&appid=${"122032a774c9f3b73131bfdf9e95c2b4"}`
        )
        .then(response => {
          this.city = "Seoul";
          this.weatherDescription = response.data.weather[0].description;
          this.temp = response.data.main.temp;
          this.tempMin = response.data.main.temp_min;
          this.tempMax = response.data.main.temp_max;
          this.humidity = response.data.main.humidity;
          this.image = response.data.weather[0].id;
          this.error = false;
          if (this.image < 300) this.condition = "cloudy";
          else if (this.image < 400) this.condition = "sleet";
          else if (this.image < 600) this.condition = "rain";
          else if (this.image < 700) this.condition = "snow";
          else if (this.image < 800) this.condition = "fog";
          else if (this.image == 800) this.condition = "clear-day";
        })
        .catch(() => {
          this.error = true;
          this.city = "";
        });
    },
    showChatbot() {
      if (!this.chat) this.chat = true;
      else this.chat = false;
    }
  },
  beforeMount() {
    this.showWeather();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/css/style.scss";
@import url(https://fonts.googleapis.com/css?family=Francois+One);
@import url(https://fonts.googleapis.com/css?family=PT+Sans);
@font-face {
  font-family: "Audiowide";
  font-style: normal;
  font-weight: 400;
  src: local("Audiowide"), local("Audiowide-Regular"),
    url("https://themes.googleusercontent.com/static/fonts/audiowide/v2/8XtYtNKEyyZh481XVWfVOj8E0i7KZn-EPnyo3HZu7kw.woff")
      format("woff");
}

footer {
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, $footer-bg 91%, $nav-bg 91%);
  color: white;
  text-transform: uppercase;
  position: relative;
  z-index: 9;
}

.footer-logo {
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translate(-50%) skewY(5deg);
  width: 90px;
  height: 80px;
  background: $nav-bg;
  line-height: 80px;
  text-align: center;
  opacity: 0.25;
  & > div {
    font-size: 3em;
    transform: skewY(-5deg);
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
  }
}

#weather {
  position: absolute;
  width: 145px;
  height: 110px;
  bottom: 75px;
  left: 130px;
  padding-left: 10px;
  padding-top: 5px;
  border-radius: 5px;
  background: rgb(130, 191, 213);
  border: 4.5px solid rgb(154, 221, 246);
  .weather-city {
    height: 50px;
    .city-name {
      font-size: 1.5em;
      width: 75px;
      height: 50px;
      line-height: 50px;
      float: left;
    }
  }
}

#copyrights {
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
  font-family: $font-content;
  font-weight: 100;
  letter-spacing: 2px;
}
@keyframes bobup {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
}
$top-btn-size: 35px;
#top-btn {
  width: $top-btn-size * 2;
  height: $top-btn-size;
  border-top-left-radius: $top-btn-size;
  border-top-right-radius: $top-btn-size;
  position: absolute;
  top: $top-btn-size * -1;
  left: 50%;
  transform: translate(-50%);
  background: $footer-bg;
  cursor: pointer;
  span {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    i {
      font-size: 2em;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%);
    }
  }
  &:hover span {
    animation: bobup 0.7s ease-in-out infinite alternate;
  }
}

figure {
  margin: 5em auto;
  width: 350px;
  height: 150px;
}
.toggle {
  position: absolute;
  display: block;
  text-align: center;
  margin-left: 15px;
  margin-top: 40px;
  user-select: none;
  opacity: 0.8;
  &:hover {
    opacity: 0.95;
  }
}
.toggle--checkbox {
  display: none;
}
.toggle--btn {
  display: block;
  margin: 0 auto;
  font-size: 1.4em;
  transition: all 350ms ease-in;
  &:hover {
    cursor: pointer;
  }
}
.toggle--btn,
.toggle--checkbox,
.toggle--feature {
  &,
  &:after,
  &:before {
    transition: all 250ms ease-in;
  }
  &:after,
  &:before {
    content: "";
    display: block;
  }
}
$toggleHeight: 55px;
$toggleWidth: 105px;
$borderWidth: 5px;
$toggleBtnRadius: $toggleHeight - 14px;

$bgColor--night: #3c4145;
$borderColor--night: #1c1c1c;
$toggleBtn-bgColor--night: #fff;
$toggleBtn-borderColor--night: #e3e3c7;

$bgColor--day: #9ee3fb;
$borderColor--day: #86c3d7;
$toggleBtn-bgColor--day: #ffdf6d;
$toggleBtn-borderColor--day: #e1c348;

$cloud-borderColor: #d3d3d3;
$cloud-bgColor: #fff;

.toggle--daynight,
.toggle--like {
  .toggle--btn {
    position: relative;
    height: $toggleHeight;
    width: $toggleWidth;
    border-radius: $toggleHeight;

    //toggle button
    &:before {
      position: absolute;
      top: 2px;
      left: 4px;
      width: $toggleBtnRadius;
      height: $toggleBtnRadius;
      border-radius: 50%;
    }
  }
}

.toggle--daynight {
  .toggle--btn {
    border: $borderWidth solid $borderColor--night;
    background-color: $bgColor--night;

    //toggle button
    &:before {
      background-color: $toggleBtn-bgColor--night;
      border: $borderWidth solid $toggleBtn-borderColor--night;
    }
    &:after {
      position: absolute;
      top: 62%;
      left: $toggleWidth - ($toggleBtnRadius) - ($borderWidth * 2) - 20px;
      z-index: 10;
      width: $toggleBtnRadius / 5;
      height: $toggleBtnRadius / 5;
      opacity: 0;
      background-color: $cloud-bgColor;
      border-radius: 50%;

      //crazy ass box-shadow to make the cloud
      box-shadow: $cloud-bgColor 0 0, $cloud-bgColor 3px 0, $cloud-bgColor 6px 0,
        $cloud-bgColor 9px 0, $cloud-bgColor 11px 0, $cloud-bgColor 14px 0,
        $cloud-bgColor 16px 0, $cloud-bgColor 21px -1px 0 1px,
        $cloud-bgColor 16px -7px 0 -2px, $cloud-bgColor 7px -7px 0 1px,
        $cloud-borderColor 0 0 0 4px, $cloud-borderColor 6px 0 0 4px,
        $cloud-borderColor 11px 0 0 4px, $cloud-borderColor 16px 0 0 4px,
        $cloud-borderColor 21px -1px 0 5px, $cloud-borderColor 16px -7px 0 1px,
        $cloud-borderColor 7px -7px 0 5px;

      transition: opacity 100ms ease-in;
    }
  }

  @keyframes starry_star {
    50% {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: #fff 30px -3px 0 0, #fff 12px 10px 0 -1px,
        rgba(255, 255, 255, 0.1) 38px 18px 0 1px, #fff 32px 34px 0 0,
        rgba(255, 255, 255, 0.1) 20px 24px 0 -1.5px, #fff 5px 38px 0 1px;
    }
  }
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 100;
      transform: scale(1.1);
    }
    55% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      opacity: 100;
      transform: scale(1);
    }
  }
  //stars
  .toggle--feature {
    display: block;
    position: absolute;
    top: 9px;
    left: 52.5%;
    z-index: 20;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fff;

    box-shadow: rgba(255, 255, 255, 0.1) 30px -3px 0 0,
      rgba(255, 255, 255, 0.1) 12px 10px 0 -1px, #fff 38px 18px 0 1px,
      rgba(255, 255, 255, 0.1) 32px 34px 0 0, #fff 20px 24px 0 -1.5px,
      rgba(255, 255, 255, 0.1) 5px 38px 0 1px;

    animation: starry_star 5s ease-in-out infinite;

    &:before {
      position: absolute;
      top: -2px;
      left: -25px;
      width: 18px;
      height: 18px;
      background-color: $toggleBtn-bgColor--night;
      border-radius: 50%;
      border: 5px solid $toggleBtn-borderColor--night;

      box-shadow: $toggleBtn-borderColor--night -28px 0 0 -3px,
        $toggleBtn-borderColor--night -8px 24px 0 -2px;

      transform-origin: -6px 130%;
    }
  }

  //what happens once checkbox is checked
  .toggle--checkbox:checked {
    & + .toggle--btn {
      background-color: $bgColor--day;
      border: $borderWidth solid $borderColor--day;

      &:before {
        left: $toggleWidth - ($toggleBtnRadius) - ($borderWidth * 2) - 4px;
        background-color: $toggleBtn-bgColor--day;
        border: $borderWidth solid $toggleBtn-borderColor--day;
      }
      &:after {
        opacity: 100;
        animation-name: bounceIn;
        animation-duration: 0.6s;
        animation-delay: 0.1s;
        animation-fill-mode: backwards;
        animation-timing-function: ease-in-out;
      }

      > .toggle--feature {
        opacity: 0;
        box-shadow: rgba(255, 255, 255, 0.1) 30px -3px 0 -4px,
          rgba(255, 255, 255, 0.1) 12px 10px 0 -5px, #fff 38px 18px 0 -3px,
          rgba(255, 255, 255, 0.1) 32px 34px 0 -4px, #fff 20px 24px 0 -5.5px,
          rgba(255, 255, 255, 0.1) 5px 38px 0 -3px;
        animation: none;

        &:before {
          left: 25px;
          transform: rotate(70deg);
        }
      }
    }
  }
}
.weatherB-enter-active {
  transition: all 0.6s ease;
}
.weatherB-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.weatherB-enter,
.weatherB-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
