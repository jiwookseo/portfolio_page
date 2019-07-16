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
</template>


<script>
import firestore from "../firebase/firestore";

export default {
  name: "AdminPage",
  data() {
    return {
      logs: [],
      selectedPath: ''
    }
  },
  mounted() {
    this.getLogs();
  },
  computed: {
    computedLogs() {
      return this.logs.reverse().filter(log => {
        return log.path == this.selectedPath;
      })
    }
  },
  methods: {
    async getLogs() {
      this.logs = await firestore.getLog();
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

a, a:hover {
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
