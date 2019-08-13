<template>

    <v-container class="vContainer">
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

</template>

<script>
import firestore from "@/firebase/firestore";
import { mapGetters } from "vuex";
import firebaseMessage from "@/firebase/firebaseMessage";

export default {
    data() {
        return {
            search: "",
            auth: ["팀원", "방문자"],
            isMobile: false,
            headers: [
                { text: "이메일", value: "email", sortable: false },
                { text: "권한", value: "authority" },
                { text: "권한 변경", value: "modify", sortable: false },
                { text: "정지", value: "delete", sortable: false }
            ],
            loading: false,
            selectedId: "",
            selectedDeleted: ""
        };
    },
    watch: {
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
        }
    }
}

</script>