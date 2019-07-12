<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
  import axios from 'axios';
  axios.defaults.baseURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=mSzGEe1Ba9KXsNynKz-A&per_page=100`
  const apiKey = process.env.API_KEY;
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components

  var ydate = [];
  var geuntae = [];
  var jiwon = [];
  var jiwook = [];
  var gyuseok = [];
  var gibeom = [];
  // var label1 = ['1','2'];
  // var label2 = [1,2];
  export default {
    extends: Line,
    data () {
      return {
        date : [],
        pname : [],

        datacollection: {
          //Data to be represented on x-axis
          labels: ydate,

          datasets: [
            {

              label: 'geuntae',

              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: geuntae
            },
            {

              label: 'jiwon',

              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: jiwon
            },
            {

              label: 'jiwook',

              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: jiwook
            },
            {

              label: 'gyuseok',

              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: gyuseok
            },
            {

              label: 'gibeom',

              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: gibeom
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
            xAxes: [ {
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
            console.log(this.pname[i]);
          }

          var gtcount = 1;
          var jiwoncount = 1;
          var jiwookcount = 12;
          var gyuseokcount = 1;
          var gibeomcount =1;
          var dateString = this.date[0];
          ydate.push(dateString);

          for (var i = 1; i < this.date.length-1; i++) {
            console.log(1111111111);
            console.log(this.pname[0]);
            if (this.pname[i]=="gtkim4617@naver.com") {
              if (dateString == this.date[i]) {
                gtcount++;
                console.log(gtcount);
                if(i == 1){
                  geuntae.push(gtcount);
                }
              } else {
                geuntae.push(gtcount);
                count = 1;
                dateString = this.date[i];
                ydate.push(dateString);
              }
            }if (this.pname[i]=='jiwonjulietyoon@gmail.com') {
              console.log(dateString);
              console.log(this.date[i]);
              if (dateString == this.date[i]) {
                jiwoncount++;
                console.log(jiwoncount);
                if(i == 1){
                  jiwon.push(jiwoncount);
                }
              } else {
                jiwon.push(jiwoncount);
                count = 1;
                console.log(jiwoncount);
                dateString = this.date[i];
                console.log(dateString);
                ydate.push(dateString);
              }if (this.pname[i]=='jiwookseo.dev@gmail.com') {
                if (dateString == this.date[i]) {
                  jiwookcount++;

                  if(i == 1){
                    jiwook.push(jiwookcount);
                  }
                } else {
                  jiwook.push(jiwookcount);
                  count = 1;
                  dateString = this.date[i];
                  ydate.push(dateString);
                }
              }if (this.pname[i]=='kim6394@hanmail.net') {
                if (dateString == this.date[i]) {
                  gyuseokcount++;
                  console.log(gyuseokcount);
                  if(i == 1){
                    gyuseok.push(gyuseokcount);
                  }
                } else {
                  gyuseok.push(gyuseokcount);
                  count = 1;
                  dateString = this.date[i];
                  ydate.push(dateString);
                }
              }if (this.pname[i]=='gaivn0928@naver.com') {
                if (dateString == this.date[i]) {
                  gibeomcount++;

                  if(i == 1){
                    gibeom.push(gibeomcount);
                  }
                } else {
                  gibeom.push(gibeomcount);
                  count = 1;
                  dateString = this.date[i];
                  ydate.push(dateString);
                }
              }
            }

          }


        })
        .catch(() => {
        });
    },
  },
  beforeMount() {
    this.getData();
  },
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.

      this.renderChart(this.datacollection, this.options);
    }
  }
</script>
