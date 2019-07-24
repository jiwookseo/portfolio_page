<template>
  <div>
    <apexchart type="radar" height="350" :options="chartOptions" :series="series" />
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import Vue from "vue";
import axios from "axios";
Vue.use(VueApexCharts);
const labURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=`+process.env.VUE_APP_ACCESS_TOKKEN+'&per_page=100';
Vue.component("apexchart", VueApexCharts);

var gtcount = 0;
var jiwoncount = 0;
var jiwookcount = 0;
var gyuseokcount = 0;
var gibeomcount = 0;

const date = new Date();

export default {
  data: function() {
    return {
      datel: [],
      pname: [],
      chartOptions: {
        title: {
          text: "Today's Commits",
          align: "center",
          margin: 0,
          offsetX: 0,
          offsetY: 20,
          floating: false,
          style: {
            fontSize: "2.2em",
            fontFamily: '"Do Hyeon", sans-serif',
            color: "#263238"
          }
        },
        labels: ["Geuntae", "Gyuseok", "Jiwook", "Jiwon", "Gibeom"],
        fill: {
          opacity: 0.4,
          colors: ["rgba(0, 192, 255, 0.3)"]
        },
        stroke: {
          show: true,
          width: 3,
          colors: ["rgb(0, 192, 255)"]
        },
        markers: {
          colors: ["rgb(0, 192, 255)"],
          size: 3,
          strokeWidth: 1.5
        },
        chart: {
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            top: 7,
            left: 7,
            blur: 5,
            opacity: 0.1
          }
        }
      },
      data: []
    };
  },
  computed: {
    series: function() {
      return [
        {
          name: "commits",
          data: this.data
        }
      ];
    }
  },
  methods: {
    getData() {
      axios.defaults.baseURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=`+process.env.VUE_APP_ACCESS_TOKKEN+'&per_page=100';
      axios
        .get(labURL)
        .then(response => {
          gtcount = 0;
          jiwoncount = 0;
          jiwookcount = 0;
          gyuseokcount = 0;
          gibeomcount = 0;
          for (var i = 0; i < response.data.length; i++) {
            this.datel.push(response.data[i].committed_date.substring(8, 10));
            this.pname.push(response.data[i].author_email);
          }

          var dateString = date.getDate();
          for (i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "gtkim4617@naver.com") {
                if (dateString == this.datel[i]) {
                  gtcount++;
                }
              }
            }
          }

          for (i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "jiwonjulietyoon@gmail.com") {
                if (dateString == this.datel[i]) {
                  jiwoncount++;
                }
              }
            }
          }

          for (i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "jiwookseo.dev@gmail.com") {
                if (dateString == this.datel[i]) {
                  jiwookcount++;
                }
              }
            }
          }

          for (i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "kim6394@hanmail.net") {
                if (dateString == this.datel[i]) {
                  gyuseokcount++;
                }
              }
            }
          }

          for (i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "gaivn0928@naver.com") {
                if (dateString == this.datel[i]) {
                  gibeomcount++;
                }
              }
            }
          }

          this.data.push(gtcount);
          this.data.push(gyuseokcount);
          this.data.push(jiwookcount);
          this.data.push(jiwoncount);
          this.data.push(gibeomcount);
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
