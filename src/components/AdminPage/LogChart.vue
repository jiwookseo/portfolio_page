<template>
  <div id="visits-chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</template>

<script>
import firestore from "../../firebase/firestore";
import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";

export default {
  data() {
    return {
      search: "",
      auth: ["팀원", "방문자"],
      logs: [],
      times: [],
      isMobile: false,
      headers: [
        { text: "이메일", value: "email", sortable: false },
        { text: "권한", value: "authority" },
        { text: "권한 변경", value: "modify", sortable: false },
        { text: "정지", value: "delete", sortable: false }
      ],
      loading: false,
      mode: "summary", //users, articles, log
      selectedId: "",
      selectedDeleted: ""
    };
  },
  mounted() {
    this.getLogs();
  },
  watch: {
    logs: function() {
      this.computedLogs();
    },
    askSnackbar() {
      if (this.askSnackbar.confirm === "deleted") {
        this.changeDelete(this.selectedId, this.selectedDeleted);
      }
    }
  },
  methods: {
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
          if (this.times[i] == 0) dataset[0]++;
          else if (this.times[i] == 1) dataset[1]++;
          else if (this.times[i] == 2) dataset[2]++;
          else if (this.times[i] == 3) dataset[3]++;
          else if (this.times[i] == 4) dataset[4]++;
          else if (this.times[i] == 5) dataset[5]++;
          else if (this.times[i] == 6) dataset[6]++;
        }

        for (i = 0; i < 7; i++) {
          percent[i] = (dataset[i] / this.times.length) * 100;
        }

        // 차트 부분
        Vue.use(HighchartsVue);

        Highcharts.chart("visits-chart", {
          chart: {
            type: "column"
          },
          title: {
            text: "Visits Per Day of the Week"
          },
          subtitle: {
            // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
          },
          xAxis: {
            type: "category"
          },
          yAxis: {
            title: {
              text: "Visits"
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
                format: "{point.y:.1f}%"
              }
            }
          },

          tooltip: {
            headerFormat:
              '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
              '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          },

          series: [
            {
              name: "Visit",
              colorByPoint: true,
              data: [
                {
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
            }
          ]
        });

        // 여기까지 차트
      }
    }
  }
};
</script>



