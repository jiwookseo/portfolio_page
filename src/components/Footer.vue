<template>
<footer>
  <div id="weather">

    <div title="Weather in your city" width="400" height="150" margined v-on:close="exit" >
      <div padded>
        <!-- <div horizontal padded>
          <Button :enabled="!!query" @onload ="showWeather">Search</Button>
        </div> -->
        <div horizontal />
        <div margined>
          <div padded>
            <div v-if="error">There is no such city in the database</div>
            <div v-if="!!city">
              <div padded horizontal>
                <div stretchy>{{city}}</div>
              </div>
              <div horizontal />
              <div padded horizontal>
                <div>최소기온 : {{tempMin}}&deg;C</div>
                <div stretchy>최대기온: {{tempMax}}&deg;C</div>
                <div stretchy>습도 : {{humidity}}%</div>
                <div stretchy><img :src=image></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  <div id="copyrights">SSAFY Team Six ©2019</div>
  <div id="top-btn" @click="totop"></div>
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
footer {
    width: 100%;
    height: 250px;
    background: #181818;
    color: white;
    text-transform: uppercase;
    position: relative;
    z-index: 99;
}
#weather {
    position: absolute;
    width: 120px;
    height: 120px;
    // border: 1px solid royalblue;
    bottom: 100px;
    right: 5%;
}
#copyrights {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
}
$top-btn-size: 40px;
#top-btn {
    width: $top-btn-size * 2;
    height: $top-btn-size;
    border-top-left-radius: $top-btn-size;
    border-top-right-radius: $top-btn-size;
    position: absolute;
    top: $top-btn-size * -1;
    left: 50%;
    transform: translate(-50%);
    background: #181818;
}
</style>
