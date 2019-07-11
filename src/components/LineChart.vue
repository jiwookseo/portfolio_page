<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
  import axios from 'axios';
  axios.defaults.baseURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits?private_token=mSzGEe1Ba9KXsNynKz-A&`
  const apiKey = process.env.API_KEY;
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    data () {
      return {
        date : [],
        label1 : ["1","2"],
        label2 : [1, 2],
        datacollection: {
          //Data to be represented on x-axis
          labels : [],
          datasets: [
            {

              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [],
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
    showWeather() {
      axios
        .get(

        )
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.date.push(response.data[i].committed_date.substring(0, 10));
          }

          var count = 1;
          var dateString = this.date[0];
          this.datacollection.labels.push(dateString);

          for (var i = 1; i < this.date.length; i++) {

            if (dateString == this.date[i]) {
              count++;

              if(i == this.date.length - 1){
                this.datacollection.datasets[0].data.push(count);
              }
            } else {
              this.datacollection.datasets[0].data.push(count);
              count = 1;
              dateString = this.date[i];
              this.datacollection.labels.push(dateString);
            }
          }


        })
        .catch(() => {
        });
    },
  },
  beforeMount() {
    this.showWeather();
  },
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      console.log(this.datacollection.labels);
      console.log(this.datacollection.datasets[0].data);
      this.renderChart(this.datacollection, this.options);
    }
  }
</script>
