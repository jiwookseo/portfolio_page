<template>
<div class="wrap">
  <div class="btn-box">
    <router-link to="/">
      <button title="Back to HomePage"><i class="material-icons">arrow_back</i></button>
    </router-link>
  </div>
  <h2 class="section-title">Admin Page</h2>
  <div class="content-container">
    <div class="mb-5">
      <!-- <select v-model="selectedPath">
        <option disabled value="">Please select one</option>
        <option value="/">"/"</option>
        <option value="/portfolio">"/portfolio"</option>
        <option value="/post">"/post"</option>
      </select> -->
      <br>
      <!-- <span>Path: {{ selectedPath }}</span> -->
    </div>
    <hr>

    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>


    <p v-for="log in computedLogs">{{log}}</p>
  </div>
</div>
</div>
</template>


<script>
import firestore from "../firebase/firestore";
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'




export default {
  name: "AdminPage",
  data() {
    return {
      logs: [],
      selectedPath: '',
      times: [],
      flag: false,
      dataset: [],
      percent: [],
    }
  },
  mounted() {
    this.getLogs();
  },
  computed: {
    computedLogs() {
      if (this.logs.length != 0 && this.flag == false) {
        for (var i = 0; i < this.logs.length; i++) {
          this.times.push(this.logs[i].time);
        }

        for (var i = 0; i < 7; i++) {
          this.dataset.push(0);
          this.percent.push(0);
        }

        for (var i = 0; i < this.times.length; i++) {
          if (this.times[i] == 0) this.dataset[0]++;
          else if (this.times[i] == 1) this.dataset[1]++;
          else if (this.times[i] == 2) this.dataset[2]++;
          else if (this.times[i] == 3) this.dataset[3]++;
          else if (this.times[i] == 4) this.dataset[4]++;
          else if (this.times[i] == 5) this.dataset[5]++;
          else if (this.times[i] == 6) this.dataset[6]++;
        }

        for (var i = 0; i < 7; i++) {
          this.percent[i] = (this.dataset[i] / this.times.length) * 100;
        }

        // 차트 부분
        Vue.use(HighchartsVue);

        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Visits Per Day of the Week'
          },
          subtitle: {
            // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Visits'
            }

          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
              }
            }
          },

          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          },

          series: [{
            name: "Visit",
            colorByPoint: true,
            data: [{
                name: "SUN",
                y: this.percent[0],
                color: "rgb(172, 248, 139)"
                // drilldown: "Chrome"
              },
              {
                name: "MON",
                y: this.percent[1],
                color: "rgb(0, 234, 185)"
                // drilldown: "Firefox"
              },
              {
                name: "TUE",
                y: this. percent[2],
                color: "#00D1CF"
                // drilldown: "Internet Explorer"
              },
              {
                name: "WED",
                y: this.percent[3],
                color: "rgb(0, 192, 255)"
                // drilldown: "Safari"
              },
              {
                name: "THU",
                y: this.percent[4],
                color: "#728BE7"
                // drilldown: "Edge"
              },
              {
                name: "FRI",
                y: this.percent[5],
                color: "rgb(147, 108, 201)"
                // drilldown: "Opera"
              },
              {
                name: "SAT",
                y: this.percent[6],
                color: "rgb(255, 123, 153)"
                // drilldown: null
              }
            ]
          }],
        });

        // 여기까지 차트
      }
      return this.logs.reverse().filter(log => {
        return log.path == this.selectedPath;
      });
    },
  },
  methods: {
    async getLogs() {
      this.logs = await firestore.getLog();
    },
  },
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
.wrap {
    height: 100vh;
    overflow-y: auto;
}
.wrap::-webkit-scrollbar {
    display: initial;
    width: 7px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 50px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
}
.wrap::-webkit-scrollbar-thumb:vertical {
    -webkit-border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0);
    min-height: 10px;
    &:active {
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50px;
        -webkit-border-radius: 50px;
    }
}

a,
a:hover {
    color: initial;
    text-decoration: none;
}

.btn-box {
    height: 50px;
    button {
        height: 100%;
        width: 50px;
        position: relative;
        background: rgba(0, 0, 0, 0.05);
        &:focus {
            outline: none;
        }
        i {
            @include centerItem;
            font-size: 2em;
        }
    }
}

.content-container {
    padding: 0 50px 50px;
}
</style>
