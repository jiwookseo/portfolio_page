<template>
  <div>
    <div class="dialog-outer" v-if="showLogin">
      <div class="d-title text">Login</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = false">create an account</span>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" :disabled="loading" :loading="loading" label="Email" required class="mb-3"></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :disabled="loading"
          :loading="loading"
          label="Password"
          :type="'password'"
          required
        ></v-text-field>
        <div class="btn-box">
          <div class="mb-1">
            <button
              class="btn reset-btn text"
              :disabled="loading"
              :loading="loading"
              @click.prevent="reset"
            >Reset</button>
            <button
              class="btn login-btn text"
              :disabled="!valid"
              :loading="loading"
              :checkDialog="checkDialog"
              @click.prevent="login"
            >Login</button>
          </div>
          <button
            class="btn login-btn text"
            :loading="loading"
            @click.prevent="facebookLogin"
          >Login with Facebook</button>
        </div>
      </v-form>
      <div class="cancel-btn" @click="closePopup">
        <i class="material-icons">close</i>
      </div>
    </div>

    <div class="dialog-outer" v-if="!showLogin">
      <div class="d-title text">Sign Up</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = true" class="text">login to your account</span>
      </div>
      <v-form ref="form" @submit.prevent="signUp" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
          class="mb-2"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :type="'password'"
          class="mb-2"
          required
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="Password Confirm"
          :type="'password'"
          required
        ></v-text-field>
        <div class="btn-box">
          <button
            class="btn reset-btn text"
            :loading="loading"
            @click.prevent="reset"
          >Reset</button>
          <button
            class="btn login-btn text"
            :disabled="!valid"
            :loading="loading"
            type="submit"
          >Sign up</button>
        </div>
      </v-form>
      <div class="cancel-btn" @click="closePopup">
        <i class="material-icons">close</i>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

export default {
  name: "LoginDialog",
  props: {
    dialog: { type: Boolean, default: false }
  },
  data() {
    return {
      valid: false,
      showLogin: true,
      loginSuccess: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => !v || v.length >= 6 || "Password must be greater than 6 characters"
      ],
      password: "",
      passwordConfirm: ""
    };
  },
  watch: {
    dialog: function() {
      this.reset();
    }
  },
  computed: {
    passwordConfirmRules() {
      return [
        () => this.password === this.passwordConfirm || "Password must match",
        v => !!v || "Confirmation password is required"
      ];
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    checkDialog() {
      this.loginSuccess = this.$store.getters.loginSuccess
      if(this.loginSuccess){
        this.showLogin = true;
        return this.$emit("child", false);
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    signUp() {
      if(
        typeof this.email === "undefined" ||
        typeof this.password === "undefined" ||
        typeof this.passwordConfirm === "undefined" ){
        Vue.swal("에러", "email and password is required", "error");
      }
      else if (this.password !== this.passwordConfirm) {
        Vue.swal("에러", "password must match", "error");
        this.passwordConfirm = "";
      } else {
        this.$store.dispatch("signUserUp", {
          email: this.email,
          password: this.password
        });
        this.showLogin = true;
        this.closePopup();
      }
    },
    login() {
      console.log(this.email)
      console.log(this.password)
      if (
        typeof this.email === "undefined" ||
        typeof this.password === "undefined"
      ) {
        Vue.swal("에러", "email and password is required", "error");
      } else {
        this.$store.dispatch("signUserIn", {
          email: this.email,
          password: this.password
        })
        this.reset()
      }
    },
    facebookLogin() {
      this.$store.dispatch("signUserInFacebook");
      this.closePopup();
    },
    closePopup() {
      this.reset();
      this.showLogin = true;
      return this.$emit("child", false);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

.dialog-outer {
  width: 100%;
  height: 400px;
  background: white;
  padding: 20px;
  position: relative;
  .d-title {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
  }
  .d-sub {
    text-align: center;
    span {
      color: dodgerblue;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.btn-box {
  position: absolute;
  bottom: 15px;
  left: 0;
  margin-left: 45px;
  height: auto;
  .btn {
    @include nudge-btn;
    margin: 5px 8px;
  }
  .reset-btn {
    margin-left: 15px;
    @include nudge-btn-gray;
  }
  .login-btn {
    @include nudge-btn-primary;
  }
}
</style>
