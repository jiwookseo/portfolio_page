<template>
  <div>
    <div class="dialog-outer" v-if="showLogin">
      <div class="d-title text">Login</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = false">create an account</span>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :type="'password'"
          required
        ></v-text-field>
        <div class="btn-box">
          <div>
            <button
              class="btn reset-btn text"
              :disabled="loading"
              :loading="loading"
              @click.prevent="reset"
            >Reset</button>
            <button
              class="btn login-btn text"
              :disabled="loading"
              :loading="loading"
              @click.prevent="login"
            >Login</button>
          </div>
          <button
            class="btn login-btn text"
            :disabled="loading"
            :loading="loading"
            @click.prevent="facebookLogin"
          >Login with Facebook</button>
        </div>

        <!-- <v-btn color="primary" :disabled="loading" :loading="loading" @click.prevent="login" class="text">Login</v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="loading" :loading="loading" @click.prevent="facebookLogin" class="text">Login with Facebook</v-btn>-->
      </v-form>
    </div>

    <div class="dialog-outer" v-if="!showLogin">
      <div class="d-title text">Sign Up</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = true" class="text">login to your account</span>
      </div>
      <v-form ref="form" @submit.prevent="signUp" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :type="'password'"
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
            :disabled="loading"
            :loading="loading"
            @click.prevent="reset"
          >Reset</button>
          <button
            class="btn login-btn text"
            :disabled="loading"
            :loading="loading"
            type="submit"
          >Sign up</button>
        </div>
        <!-- <v-btn type="submit" color="success" :disabled="loading" :loading="loading" class="text">Sign up</v-btn>
        <v-spacer />-->
      </v-form>
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
        () => this.password === this.passwordConfirm || "password must match",
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
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    signUp() {
      if (this.password !== this.passwordConfirm) {
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
      if (
        typeof this.email === "undefined" ||
        typeof this.password === "undefined"
      ) {
        Vue.swal("에러", "email and password is required", "error");
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
  height: 370px;
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
