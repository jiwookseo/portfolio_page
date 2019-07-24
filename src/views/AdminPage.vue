<template>
<div class="wrap">
  <div class="btn-box">
    <router-link to="/">
      <button title="Back to HomePage"><i class="material-icons">arrow_back</i></button>
    </router-link>
  </div>
  <h2 class="section-title">Admin Page</h2>

  <v-container>
    <v-data-table
      :headers="headers"
      :items="userAll"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.email }}</td>
      <td class="text-xs-left">{{ props.item.authority }}</td>
      <td class="text-xs-left"><v-btn text small color="primary">수정</v-btn></td>
    </template>
    </v-data-table>
  </v-container>

  <div class="content-container">
    <div id="visits-chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
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
      times: [],
      headers: [
        {text: '이메일', value: 'email', sortable: false},
        {text: '권한', value: 'authority'},
        {text: '권한 변경', value: 'modify', sortable: false}
      ]
    }
  },
  mounted() {
    this.getLogs();
  },
  watch: {
    logs: function() {
      this.computedLogs();
    }
  },
  computed: {
    userAll() {
      return this.$store.state.userAll
    }
  },
  methods: {
    getUserAll() {
      firestore.getUserAll().then(res => (this.userAll = res));
    },
    async getLogs() {
      this.logs = await firestore.getLog();
    },
    computedLogs() {
      let dataset = [0, 0, 0, 0, 0, 0, 0];
      let percent = [0, 0, 0, 0, 0, 0, 0];
      if (this.logs.length != 0) {

        for (var i = 0; i < this.logs.length; i++) {
          this.times.push(this.logs[i].time);
        }
        for (i = 0; i < this.times.length; i++) {
          if (this.times[i] == 0) dataset[0] ++;
          else if (this.times[i] == 1) dataset[1] ++;
          else if (this.times[i] == 2) dataset[2] ++;
          else if (this.times[i] == 3) dataset[3] ++;
          else if (this.times[i] == 4) dataset[4] ++;
          else if (this.times[i] == 5) dataset[5] ++;
          else if (this.times[i] == 6) dataset[6] ++;
        }

        for (i = 0; i < 7; i++) {
          percent[i] = (dataset[i] / this.times.length) * 100;
        }

        // 차트 부분
        Vue.use(HighchartsVue);

        Highcharts.chart('visits-chart', {
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
                y: percent[0],
                color: "rgb(172, 248, 139)"
                // drilldown: "Chrome"
              },
              {
                name: "MON",
                y: percent[1],
                color: "rgb(0, 234, 185)"
                // drilldown: "Firefox"
              },
              {
                name: "TUE",
                y: percent[2],
                color: "#00D1CF"
                // drilldown: "Internet Explorer"
              },
              {
                name: "WED",
                y: percent[3],
                color: "rgb(0, 192, 255)"
                // drilldown: "Safari"
              },
              {
                name: "THU",
                y: percent[4],
                color: "#728BE7"
                // drilldown: "Edge"
              },
              {
                name: "FRI",
                y: percent[5],
                color: "rgb(147, 108, 201)"
                // drilldown: "Opera"
              },
              {
                name: "SAT",
                y: percent[6],
                color: "rgb(255, 123, 153)"
                // drilldown: null
              }
            ]
          }],
        });

        // 여기까지 차트

      }
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
