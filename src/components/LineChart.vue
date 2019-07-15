<script >
import axios from "axios";
import { Line } from "vue-chartjs";

const labURL = `https://lab.ssafy.com/api/v4/projects/6043/repository/commits/?private_token=mSzGEe1Ba9KXsNynKz-A&per_page=100`;
let ydate = [];
const pointBackgroundColor = [
  "rgb(172, 248, 139)",
  "rgb(0, 234, 185)",
  "rgb(0, 192, 255)",
  "rgb(147, 108, 201)",
  "rgb(255, 123, 153)"
];
const borderColor = [
  "rgb(172, 248, 139)",
  "rgb(0, 234, 185)",
  "rgb(0, 192, 255)",
  "rgb(147, 108, 201)",
  "rgb(255, 123, 153)"
];
const backgroundColor = [
  "rgba(172, 248, 139, 0.1)",
  "rgba(0, 234, 185, 0.1)",
  "rgba(0, 192, 255, 0.1)",
  "rgba(147, 108, 201, 0.1)",
  "rgba(255, 123, 153, 0.1)"
];
const email = [
  "gtkim4617@naver.com",
  "jiwookseo.dev@gmail.com",
  "kim6394@hanmail.net",
  "gaivn0928@naver.com",
  "jiwonjulietyoon@gmail.com"
];
const data = {};
email.forEach(e => (data[e] = {}));

const count = email.map(e => []);

export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ydate,

        datasets: ["Geuntae", "Jiwook", "Gyuseok", "Gibeom", "Jiwon"].map(
          (name, i) => ({
            label: name,
            pointBorderColor: "white",
            pointRadius: 4,
            pointHoverRadius: 5,
            borderWidth: 1.5,
            pointBackgroundColor: pointBackgroundColor[i],
            borderColor: borderColor[i],
            backgroundColor: backgroundColor[i],
            data: []
          })
        )
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            { ticks: { beginAtZero: true }, gridLines: { display: true } }
          ],
          xAxes: [{ gridLines: { display: false } }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    getData() {
      axios
        .get(labURL)
        .then(response => {
          response.data.forEach(e => {
            const email = e.author_email;
            const committed = e.committed_date.substring(0, 10);
            data[email][committed] = data[email][committed]
              ? data[email][committed] + 1
              : 1;
            if (ydate.indexOf(committed) === -1) {
              ydate.unshift(committed);
            }
          });
          email.forEach((e, i) => {
            ydate.forEach(date => {
              count[i].push(data[e][date] || 0);
            });
          });
          this.datacollection.datasets.forEach((dataset, i) => {
            dataset.data = count[i];
          });
          this.renderChart(this.datacollection, this.options);
        })
        .catch();
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>