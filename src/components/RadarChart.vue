<template>
<div>
  <apexchart type=radar height=350 :options="chartOptions" :series="series" />
</div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';
import axios from "axios";
Vue.use(VueApexCharts);
const labURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=mSzGEe1Ba9KXsNynKz-A&per_page=100`;
Vue.component('apexchart', VueApexCharts);

const data = [];
var gtcount = 0;
var jiwoncount = 0;
var jiwookcount = 0;
var gyuseokcount = 0;
var gibeomcount = 0;
var dd = [];
const date = new Date();



export default {
  data: function() {
    return {
      datel: [],
      pname: [],
      chartOptions: {
        title: {
          text: 'Oneday-Radarchart'
        },
        labels: ['Geuntae', 'Gyuseok', 'Jiwook', 'Jiwon', 'Gibeom'],
      },
      data: []
    }
  },
  computed: {
    series: function() {
      return [{
        name: 'commits',
        data: this.data
      }];
    }
  },
  methods: {
    getData() {
      axios.defaults.baseURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=mSzGEe1Ba9KXsNynKz-A&per_page=100`;
      axios
        .get(labURL)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.datel.push(response.data[i].committed_date.substring(8, 10));
            this.pname.push(response.data[i].author_email);
          }
          console.log(response.data.length);


          var dateString = date.getDate();
          for (var i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == "gtkim4617@naver.com") {
                if (dateString == this.datel[i]) {
                  gtcount++;
                }
              }
            }
          }

          for (var i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13) !== "Merge branch ") {
              if (this.pname[i] == 'jiwonjulietyoon@gmail.com') {
                if (dateString == this.datel[i]) {
                  jiwoncount++;
                }
              }
            }
          }

          for (var i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13)!== "Merge branch ") {
              if (this.pname[i] == 'jiwookseo.dev@gmail.com') {
                if (dateString == this.datel[i]) {
                  jiwookcount++;
                }
              }
            }
          }

          for (var i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13)!== "Merge branch ") {
              if (this.pname[i] == 'kim6394@hanmail.net') {
                if (dateString == this.datel[i]) {
                  gyuseokcount++;
                }
              }
            }
          }

          for (var i = 0; i < this.datel.length; i++) {
            if (response.data[i].title.slice(0, 13)!== "Merge branch ") {
              if (this.pname[i] == 'gaivn0928@naver.com') {
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
          console.log(this.data);

        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getData();

  }
};
</script>
