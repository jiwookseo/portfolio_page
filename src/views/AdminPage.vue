<template>
<div class="wrap">
  <div class="btn-box">
    <router-link to="/">
      <button title="Back to HomePage"><i class="material-icons">arrow_back</i></button>
    </router-link>
  </div>
  <h2 class="section-title">Admin Page</h2>
  <div class="content-container">
    <div class="mb-5">
      <select v-model="selectedPath">
        <option disabled value="">Please select one</option>
        <option value="/">"/"</option>
        <option value="/portfolio">"/portfolio"</option>
        <option value="/post">"/post"</option>
      </select>
      <br>
      <span>Path: {{ selectedPath }}</span>
    </div>
    <hr>

    <p v-for="log in computedLogs">{{log}}</p>
    </div>
  </div>
</div>
</template>


<script>
import firestore from "../firebase/firestore";

export default {
  name: "AdminPage",
  data() {
    return {
      logs: [],
      selectedPath: '',
      times: [],
      flag : false,
    }
  },
  mounted() {
    this.getLogs();
  },
  computed: {
    computedLogs() {
      if(this.logs.length != 0 && this.flag == false){
        for (var i = 0; i < this.logs.length; i++) {
          this.times.push(this.logs[i].time);
        }
      }
      return this.logs.reverse().filter(log => {
        return log.path == this.selectedPath;
      });
    },
  },
  methods: {
    async getLogs() {
      this.logs = await firestore.getLog();
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
