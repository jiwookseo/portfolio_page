<template>
<footer>
  <div id="weather">
    <div title="오늘의 날씨" v-on:close="exit">
      <div v-if="!!city">
        <div class="weather-city">
          <div class="city-name">{{ city }}</div><img :src='image'>
        </div>
        <div>기온 : {{tempMin}}&deg;C / {{tempMax}}&deg;C</div>
        <div>습도 : {{humidity}}%</div>
      </div>
    </div>



    <!-- <div title="Weather in your city" width="400" height="150" margined v-on:close="exit" >
      <div padded>
        <div horizontal padded>
          <Button :enabled="!!query" @onload ="showWeather">Search</Button>
        </div>
        <div horizontal />
        <div margined>
          <div padded>
            <div v-if="!!city">
              <div padded horizontal>
                <div><img :src='image'> {{city}}</div>
              </div>
              <div horizontal />
              <div padded horizontal>
                <div>기온 : {{tempMin}}&deg;C / {{tempMax}}&deg;C</div>
                <div stretchy>습도 : {{humidity}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->


  </div>
  <div id="copyrights">SSAFY Team Six ©2019</div>
  <div id="top-btn" @click="totop"><span><i class="material-icons">keyboard_arrow_up</i></span></div>
</footer>
</template>


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5'
const apiKey = process.env.API_KEY;

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
        image: 'http://openweathermap.org/img/w/'+ this.img +'.png',
      };
    },
    methods: {
      totop() {
        $('html, body').animate({
          scrollTop: 0,
        }, 700);
      },
      exit() {
      this.$exit();
      },
      showWeather() {
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
            this.image ='http://openweathermap.org/img/w/'+ response.data.weather[0].icon+ '.png';
            this.error = false;
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
    width: 120px;
    height: auto;
    bottom: 90px;
    left: 5%;
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

</style>
