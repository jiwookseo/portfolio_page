<template>
  <div>
    <div class="dialog-outer" v-show="showLogin">
      <div class="d-title text">Login</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = false">create an account</span>
      </div>
      <v-form ref="formLogin" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :disabled="loading"
          :loading="loading"
          :autofocus="showLogin"
          v-if="showLogin"
          ref="focusLogin"
          label="Email"
          required
          class="mb-3"
          @keydown.enter="login"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :disabled="loading"
          :loading="loading"
          label="Password"
          :type="'password'"
          required
          @keydown.enter="login"
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

    <div class="dialog-outer" v-show="!showLogin">
      <div class="d-title text">Sign Up</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = true" class="text">login to your account</span>
      </div>
      <v-form ref="formSignup" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :disabled="loading"
          :loading="loading"
          :autofocus="!showLogin"
          v-if="!showLogin"
          label="Email"
          required
          class="mb-2"
          @keydown.enter="signUp"
        ></v-text-field>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :disabled="loading"
          :loading="loading"
          label="Name"
          required
          class="mb-2"
          @keydown.enter="signUp"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :disabled="loading"
          :loading="loading"
          label="Password"
          :type="'password'"
          class="mb-2"
          required
          @keydown.enter="signUp"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          :disabled="loading"
          :loading="loading"
          label="Password Confirm"
          :type="'password'"
          required
          @keydown.enter="signUp"
        ></v-text-field>
        <div class="btn-box">
          <button class="btn reset-btn text" :loading="loading" @click.prevent="reset">Reset</button>
          <button
            class="btn login-btn text"
            :disabled="!valid"
            :loading="loading"
            @click.prevent="signUp"
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
import { mapGetters } from "vuex";

export default {
  name: "LoginDialog",
  props: {
    dialog: { type: Boolean, default: false }
  },
  data() {
    return {
      valid: false,
      showLogin: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [v => !!v || "Name is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v => !v || v.length >= 6 || "Password must be greater than 6 characters"
      ],
      password: "",
      passwordConfirm: "",
      name: ""
    };
  },
  watch: {
    dialog: function() {
      this.reset();
      if (this.dialog) {
        this.$refs.focusLogin.focus();
      }
    },
    showLogin: function() {
      this.reset();
    }
  },
  computed: {
    ...mapGetters(["user", "error", "loading", "loginSuccess"]),
    passwordConfirmRules() {
      return [
        () => this.password === this.passwordConfirm || "Password must match",
        v => !!v || "Confirmation password is required"
      ];
    },
    checkDialog() {
      if (this.loginSuccess) {
        return this.$emit("child", false);
      }
      return null;
    }
  },
  methods: {
    reset() {
      this.$refs.formLogin.reset();
      this.$refs.formSignup.reset();
    },
    signUp() {
      if (
        typeof this.email === "undefined" ||
        typeof this.name === "undefined" ||
        typeof this.password === "undefined" ||
        typeof this.passwordConfirm === "undefined"
      ) {
        Vue.swal("Error", "Email and password is required", "error");
      } else if (this.password !== this.passwordConfirm) {
        Vue.swal("Error", "Password must match", "error");
        this.passwordConfirm = "";
      } else {
        this.$store.dispatch("signUserUp", {
          email: this.email,
          password: this.password,
          name: this.name
        });
        this.showLogin = true;
        this.closePopup();
      }
    },
    login() {
      if (
        typeof this.email === "undefined" ||
        typeof this.password === "undefined"
      ) {
        Vue.swal("Error", "Email and password is required", "error");
      } else {
        this.$store.dispatch("signUserIn", {
          email: this.email,
          password: this.password
        });
        this.reset();
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
@import "@/css/style.scss";

.dialog-outer {
  width: 100%;
  height: 450px;
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

.cancel-btn {  // Dialog Close Button (gray X)
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  i {
    color: gray;
    @include centerItem;
    font-size: 2.5em;
  }
}

</style>
