<template>
  <div class="wrap">
    <div class="btn-box">
      <router-link to="/">
        <button title="Back to HomePage">
          <i class="material-icons">arrow_back</i>
        </button>
      </router-link>
    </div>
    <h2 class="section-title">Admin Page</h2>
    <div class="admin-content">
      <ul class="ul-tabs">
        <li @click="mode = 'summary'" :class="{'active': mode==='summary'}">Summary</li>
        <li @click="mode = 'users'" :class="{'active': mode==='users'}">Users</li>
        <li @click="mode = 'articles'" :class="{'active': mode==='articles'}">Articles</li>
        <li @click="mode = 'log'" :class="{'active': mode==='log'}">Web Log</li>
      </ul>
      <div class="tab-content">
        <v-container v-show="mode==='summary'">
          <h2 class="section-subtitle">Count Data</h2>
          <template>
            <v-simple-table dark>
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">Total Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Users</td>
                  <td>{{ userAll.length }}명</td>
                </tr>
                <tr>
                  <td>Portfolios</td>
                  <td>{{ portfoliosAll.length }}개</td>
                </tr>
                <tr>
                  <td>Posts</td>
                  <td>{{ postsAll.length }}개</td>
                </tr>
              </tbody>
            </v-simple-table>
          </template>
        </v-container>

        <v-container v-show="mode==='users'">
          <h2 class="section-subtitle">User Information</h2>
          <v-card v-resize="onResize">
            <v-card-title>
              <h1>User</h1>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              class="elevation-1"
              :headers="headers"
              :items="userAll"
              :search="search"
              :sort-by="['authority', 'email']"
              :sort-desc="[false, false]"
              :loading="loading"
              :class="{mobile: isMobile}"
            >
              <!-- desktop -->
              <template v-slot:item.email="{ item }" v-if="!isMobile">
                <v-chip :color="getColor(item.authority)" dark>{{ item.email }}</v-chip>
              </template>
              <template v-slot:item.authority="{ item }" v-if="!isMobile">
                <td v-if="item.authority == '1'" class="text-xs-right">관리자</td>
                <td v-else-if="item.authority == '2'" class="text-xs-right">팀원</td>
                <td v-else-if="item.authority == '3'" class="text-xs-right">방문자</td>
              </template>
              <template v-slot:item.authority="{ item }" v-else-if="isMobile">
                <v-flex xs12 sm6 d-flex>
                  <v-chip
                    :color="getColor(item.authority)"
                    v-if="item.authority == '1'"
                    style="color:black; white-space:nowrap;"
                  >관리자</v-chip>
                  <v-chip
                    :color="getColor(item.authority)"
                    v-else-if="item.authority == '2'"
                    style="color:white; white-space:nowrap;"
                  >팀원</v-chip>
                  <v-chip
                    :color="getColor(item.authority)"
                    v-else-if="item.authority == '3'"
                    style="color:white; white-space:nowrap;"
                  >방문자</v-chip>
                </v-flex>
              </template>
              <template v-slot:item.modify="{ item }" v-if="!isMobile">
                <form
                  @submit.prevent="changeAuth(item.id, item.selected, item.email)"
                  v-if="item.authority != '1'"
                  class="text-xs-right"
                >
                  <td>
                    <v-select
                      :items="auth"
                      label="권한 선택"
                      v-model="item.selected"
                      style="width:110px;"
                      solo
                    ></v-select>
                  </td>
                  <td>
                    <v-btn color="primary" type="submit">수정</v-btn>
                  </td>
                </form>
              </template>
              <template v-slot:item.modify="{ item }" v-else-if="isMobile">
                <v-flex xs12 sm6 d-flex>
                  <form
                    @submit.prevent="changeAuth(item.id, item.selected, item.email)"
                    v-if="item.authority != '1'"
                    class="text-xs-right"
                  >
                    <td>
                      <v-select
                        :items="auth"
                        label="권한 선택"
                        v-model="item.selected"
                        style="width:110px;height:10px;"
                        solo
                      ></v-select>
                    </td>
                    <td>
                      <v-btn color="primary" type="submit">수정</v-btn>
                    </td>
                  </form>
                </v-flex>
              </template>
              <template v-slot:item.delete="{item}">
                <td>
                  <v-btn
                    color="error"
                    v-if="(item.authority != '1' && item.deleted == '1')"
                    @click="startConfirm(item.id, item.deleted)"
                  >활동정지</v-btn>
                  <v-btn
                    color="success"
                    v-if="(item.authority != '1' && item.deleted == '0')"
                    @click="stopConfirm(item.id, item.deleted)"
                  >활동 중</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-container>

        <AdminArticles v-show="mode==='articles'" />

        <v-container v-show="mode==='log'">
          <h2 class="section-subtitle">Log Data</h2>
          <div class="content-container">
            <div id="visits-chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import firestore from "../firebase/firestore";
import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import { mapGetters } from "vuex";
import AdminArticles from "@/components/AdminPage/Articles";
import firebaseMessage from "../firebase/firebaseMessage";

export default {
  name: "AdminPage",
  components: {
    AdminArticles
  },
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
  computed: {
    ...mapGetters(["askSnackbar", "user"]),
    userAll() {
      return this.$store.getters.userAll.map(user => ({
        selected: "default",
        ...user
      }));
    },
    portfoliosAll() {
      return this.$store.getters.portfolios;
    },
    postsAll() {
      return this.$store.getters.posts;
    }
  },
  methods: {
    stopConfirm(selectedId, selectedDeleted) {
      this.selectedId = selectedId;
      this.selectedDeleted = selectedDeleted;
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: "해당 사용자 계정을 정지하겠습니까?",
        button: "Suspend",
        type: "deleted"
      });
    },
    startConfirm(selectedId, selectedDeleted) {
      this.selectedId = selectedId;
      this.selectedDeleted = selectedDeleted;
      console.log("id : " + this.selectedId);
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: "해당 사용자 계정을 활성화 하겠습니까?",
        button: "Activate",
        type: "deleted"
      });
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    getColor(authority) {
      if (authority == "1") return "dark";
      else if (authority == "2") return "blue";
      else return "green";
    },
    changeAuth(id, selected, email) {
      firestore.getUserToken(email).then(token => {
        if (token) {
          console.log(token);
          firebaseMessage.pushMessage(
            token,
            "권한 변경",
            "당신의 권한이 변경 되었습니다."
          );
        }
      });

      firestore.getUserToken(id);

      this.loading = true;
      let num = "";
      if (selected === "방문자") num = "3";
      else if (selected === "팀원") num = "2";
      if (num === "3" || num === "2") {
        firestore.updateUserById(id, { authority: num }).then(() => {
          // console.log("update Success")
          this.loading = false;
          this.$store.dispatch("getUserAll");
        });
      } else {
        // console.log("선택해주세요")
        this.loading = false;
      }
    },
    changeDelete(id, del) {
      this.loading = true;
      let num = "";
      if (del === "1") num = "0";
      else if (del === "0") num = "1";

      firestore.updateUserById(id, { deleted: num }).then(() => {
        // console.log("update Success")
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: "Complete"
        });
        this.loading = false;
        this.$store.dispatch("getUserAll");
      });
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


<style lang="scss" scoped>
@import "@/css/style.scss";

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

.admin-content {
  height: auto;
  padding: 0 20px;
  margin-bottom: 80px;
}
.ul-tabs {
  padding: 0;
  margin: 0;
  width: 40px;
  display: inline-block;
  vertical-align: top;
  li {
    writing-mode: tb-rl;
    direction: rtl;
    transform: rotate(-180deg);
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 1px;
    padding: 15px 8px;
    color: $gray;
    border: 2px solid $gray;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    cursor: pointer;
    &.active {
      color: white;
      border-color: $blue-accent;
      background: $blue-accent;
    }
  }
}
.tab-content {
  display: inline-block;
  vertical-align: top;
  width: calc(99% - 40px);
  height: auto;
  min-height: 400px;
  box-shadow: 0 0 3px $gray;
}

.content-container {
  padding: 0 50px 50px;
}

.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}
</style>
