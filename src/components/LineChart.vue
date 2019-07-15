<script >
import axios from 'axios';
axios.defaults.baseURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=mSzGEe1Ba9KXsNynKz-A&per_page=100`
const apiKey = process.env.API_KEY;
//Importing Line class from the vue-chartjs wrapper
import {
  Line
} from 'vue-chartjs'
//Exporting this so it can be used in other components

var ydate = [];
var geuntae = [];
var jiwon = [];
var jiwook = [];
var gyuseok = [];
var gibeom = [];
var gtcount = 0;
var jiwoncount = 0;
var jiwookcount = 0;
var gyuseokcount = 0;
var gibeomcount = 0;
// var label1 = ['1','2'];
// var label2 = [1,2];
export default {
  extends: Line,
  data() {
    return {
      date: [],
      pname: [],

      datacollection: {
        //Data to be represented on x-axis
        labels: ydate,

        datasets: [{

            label: 'Gibeom',

            pointBackgroundColor: 'rgb(172, 248, 139)',
            pointBorderColor: 'white',
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            borderColor: 'rgb(172, 248, 139)',
            backgroundColor: 'rgba(172, 248, 139, 0.1)',

            //Data to be represented on y-axis
            data: gibeom
          },
          {

            label: 'Geuntae',

            pointBackgroundColor: 'rgb(0, 234, 185)',
            pointBorderColor: 'white',
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            borderColor: 'rgb(0, 234, 185)',
            backgroundColor: 'rgba(0, 234, 185, 0.1)',

            //Data to be represented on y-axis
            data: geuntae
          },
          {

            label: 'Jiwook',

            pointBackgroundColor: 'rgb(0, 192, 255)',
            pointBorderColor: 'white',
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            borderColor: 'rgb(0, 192, 255)',
            backgroundColor: 'rgba(0, 192, 255, 0.1)',

            //Data to be represented on y-axis
            data: jiwook
          },
          {

            label: 'Gyuseok',

            pointBackgroundColor: 'rgb(147, 108, 201)',
            pointBorderColor: 'white',
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            borderColor: 'rgb(147, 108, 201)',
            backgroundColor: 'rgba(147, 108, 201, 0.1)',

            //Data to be represented on y-axis
            data: gyuseok
          },
          {

            label: 'Jiwon',

            pointBackgroundColor: 'rgb(255, 123, 153)',
            pointBorderColor: 'white',
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            borderColor: 'rgb(255, 123, 153)',
            backgroundColor: 'rgba(255, 123, 153, 0.1)',

            //Data to be represented on y-axis
            data: jiwon
          }

        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    getData() {
      axios
        .get(

        )
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.date.push(response.data[i].committed_date.substring(0, 10));
            this.pname.push(response.data[i].author_email);
            // console.log(this.pname[i]);
          }
          // console.log(this.pname.length);




          var dateString = this.date[99];
          // console.log(this.date);
          ydate.push(dateString);

          for (var i = this.date.length-1; i >=0; i--) {

            // console.log(dateString + " " + this.date[0]);
            // console.log(1111111111);
            // console.log(this.pname[i]);
            if (this.pname[i] == "gtkim4617@naver.com") {
              if (dateString == this.date[i]) {
                gtcount++;

                if (i == 0) {
                  geuntae.push(gtcount);
                }
              } else {
                // console.log(gtcount);
                geuntae.push(gtcount);
                gtcount = 1;
                dateString = this.date[i];
                if (i == 0) {
                  geuntae.push(gtcount);
                }
              }
            }else {
              if (i == 0) {
                geuntae.push(gtcount);
              }
            }
          }
          dateString = this.date[99];
          for (var i = this.date.length-1; i >=0; i--) {

            if (this.pname[i] == 'jiwonjulietyoon@gmail.com') {
              // console.log(this.date[i]);
              // console.log(this.date[i]);
              if (dateString == this.date[i]) {
                jiwoncount++;
                // console.log(jiwoncount);
                if(i == 0){
                  jiwon.push(jiwoncount);
                }
              } else {
                jiwon.push(jiwoncount);
                jiwoncount = 1;
                // console.log(jiwoncount);
                dateString = this.date[i];
                ydate.push(dateString);
                // console.log(ydate[0]);

                if(i == 0){
                  jiwon.push(jiwoncount);
                }
                // console.log(ydate);

                // console.log(dateString);

              }
            }
            else{
              if(i == 0){
                jiwon.push(jiwoncount);
              }
            }
          }
          dateString = this.date[99];
          for (var i = this.date.length-1; i >=0; i--) {
            if (this.pname[i] == 'jiwookseo.dev@gmail.com') {
              if (dateString == this.date[i]) {
                jiwookcount++;

                if (i == 0) {
                  jiwook.push(jiwookcount);
                }
              } else {
                jiwook.push(jiwookcount);
                jiwookcount = 1;
                dateString = this.date[i];
                if (i == 0) {
                  jiwook.push(jiwookcount);
                }
              }
            }else {
              if (i == 0) {
                jiwook.push(jiwookcount);
              }
            }
          }
          dateString = this.date[99];
          for (var i = this.date.length-1; i >=0; i--) {
            if (this.pname[i] == 'kim6394@hanmail.net') {
              if (dateString == this.date[i]) {
                gyuseokcount++;
                // console.log(gyuseokcount);
                if (i == 0) {
                  gyuseok.push(gyuseokcount);
                }
              } else {
                gyuseok.push(gyuseokcount);
                gyuseokcount = 1;
                dateString = this.date[i];
                if (i == 0) {
                  gyuseok.push(gyuseokcount);
                }
              }
            }else {
              if (i == 0) {
                gyuseok.push(gyuseokcount);
              }
            }
          }
          dateString = this.date[99];
          for (var i = this.date.length-1; i >=0; i--) {
            if (this.pname[i] == 'gaivn0928@naver.com') {
              if (i == 0) {
                gibeom.push(gibeomcount);
              }
              if (dateString == this.date[i]) {
                gibeomcount++;


              } else {
                gibeom.push(gibeomcount);
                gibeomcount = 1;
                dateString = this.date[i];
                if (i == 0) {
                  gibeom.push(gibeomcount);
                }
              }
            }else {
              if (i ==  0) {
                gibeom.push(gibeomcount);
              }
            }
          }



        })
        .catch(() => {});
    },
  },
  beforeMount() {
    this.getData();
    // console.log(gyuseok);
    // console.log(jiwon);
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.

    this.renderChart(this.datacollection, this.options);
  }
}
</script>
