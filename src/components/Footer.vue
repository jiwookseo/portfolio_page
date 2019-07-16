<template>
<footer>
  <div>
    <!-- <figure class="icons">
      <skycon condition="clear-night" width="40" height="40"></skycon>
      <skycon condition="partly-cloudy-day" width="40" height="40"></skycon>
      <skycon condition="partly-cloudy-night" width="40" height="40"></skycon>
      <skycon condition="cloudy" width="40" height="40"></skycon>
      <skycon condition="rain" width="40" height="40"></skycon>
      <skycon condition="sleet" width="40" height="40"></skycon>
      <skycon condition="snow" width="40" height="40"></skycon>
      <skycon condition="wind" width="40" height="40"></skycon>
      <skycon condition="fog" width="40" height="40"></skycon>
    </figure> -->
  </div>

  <div id="weather">
    <div title="오늘의 날씨" v-on:close="exit">
      <div v-if="!!city">
        <div class="weather-city">
          <div class="city-name">{{ city }}</div><skycon :condition='condition' width="40" height="40"></skycon>
        </div>
        <div>기온 : {{tempMin}}&deg;C / {{tempMax}}&deg;C</div>
        <div>습도 : {{humidity}}%</div>
      </div>
    </div>
  </div>

  <div id="copyrights">SSAFY Team Six ©2019</div>
  <div id="top-btn" @click="totop"><span><i class="material-icons">keyboard_arrow_up</i></span></div>
  <router-link to="/admin">
    <div id="toAdmin" title="Admin Page"><i class="material-icons">how_to_reg</i></div>
  </router-link>
</footer>
</template>

<script src="https://rawgithub.com/darkskyapp/skycons/master/skycons.js"></script>
<script>
import axios from 'axios';
import { setTimeout } from 'timers';
import Vue from 'vue'
import VueSkycons from 'vue-skycon'
const apiKey = process.env.API_KEY;

Vue.use(VueSkycons)

export default {
  name: "Footer",
  data() {
    return {
      query: 'Seoul',
      error: false,
      city: '',
      weatherDescription: '',
      temp: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
      image: '',
      condition: '',
    };
  },
  methods: {
    totop() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: 0,
        }, 1000);
      }, 200);
    },
    exit() {
    this.$exit();
    },
    showWeather() {
      axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'
      axios
        .get(
          `/weather?q=${this.query}&units=metric&&appid=${"122032a774c9f3b73131bfdf9e95c2b4"}`,
        )
        .then(response => {
          this.city = "서울";
          this.weatherDescription = response.data.weather[0].description;
          this.temp = response.data.main.temp;
          this.tempMin = response.data.main.temp_min;
          this.tempMax = response.data.main.temp_max;
          this.humidity = response.data.main.humidity;
          this.image = response.data.weather[0].id;
          this.error = false;
          if(this.image < 300) this.condition = 'cloudy';
          else if(this.image < 400) this.condition = 'sleet';
          else if(this.image < 600) this.condition = 'rain';
          else if(this.image < 700) this.condition = 'snow';
          else if(this.image < 800) this.condition = 'fog';
          else if(this.image == 800) this.condition = 'clear-day';

        })
        .catch(() => {
          this.error = true;
          this.city = '';
        });
    },

  },
  beforeMount(){
    this.showWeather();
  },
}

</script>

<style lang="scss" scoped>
@import '../css/style.scss';
@import '../css/mixin.scss';

footer {
  width: 100%;
  height: 200px;
  background: $footer-bg;
  color: white;
  text-transform: uppercase;
  position: relative;
  z-index: 9;
}
#weather {
  position: absolute;
  width: 150px;
  height: 110px;
  bottom: 40%;
  left: 5%;
  padding-left: 20px;
  padding-top: 10px;
  opacity: 0.8;
  border-radius: 5px;
  background: linear-gradient(#6190E8,  #A7BFE8);
  .weather-city {
    height: 50px;
    .city-name {
      font-size: 1.5em;
      width: 50px;
      height: 50px;
      line-height: 50px;
      float: left;
    }
  }
}
#weather:hover{
  opacity: 1.0;
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
  0% {transform: translateY(0);}
  100% {transform: translateY(-4px);}
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
    top: 0; left: 0;
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

#toAdmin {
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
  color: white;
  border: 2px solid white;
  bottom: 20px;
  left: 20px;
  opacity: 0.1;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
  i {
    @include centerItem;
  }
}
figure {
	margin: 5em auto;
	width: 350px;
	height: 150px;
}
</style>
