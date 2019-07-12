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
        <v-text-field v-model="password" :rules="passwordRules" label="Password" :type="'password'" required></v-text-field>
        <v-btn color="primary" :disabled="loading" :loading="loading" @click.prevent="login" class="text">Login</v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="loading" :loading="loading" @click.prevent="facebookLogin" class="text">Login with Facebook</v-btn>
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
        <v-text-field v-model="password" :rules="passwordRules" label="Password" :type="'password'" required></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="Password Confirm"
          :type="'password'"
          required
        ></v-text-field>
        <v-btn type="submit" color="success" :disabled="loading" :loading="loading" class="text">Sign up</v-btn>
        <v-spacer />
      </v-form>
    </div>
  </div>
</template>


<script>
//import firebase from "firebase";

/*
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("public_profile");
provider.setCustomParameters({
  display: "popup"
});
*/

export default {
  name: "LoginDialog",
  data() {
    return {
      dialog: false,
      valid: false,
      showLogin: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 ||'Password must be greater than 6 characters'
      ],
      password: "",
      passwordConfirm: ""
    };
  },
  computed: {
    passwordConfirmRules() {
      return [
        () => this.password === this.passwordConfirm || "password must match",
        v => !!v || "Confirmation password is required"
      ];
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    signUp() {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      this.email= ''
      this.password= ''
      this.passwordConfirm= ''
      this.showLogin= true
      this.closePopup()
    },
    login() {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      this.email= ''
      this.password= ''
      this.closePopup()
    },
    facebookLogin() {
      this.$store.dispatch('signUserInFacebook')
      this.closePopup()
    },
    closePopup() {
      return this.$emit("child", this.dialog)
    }
  }
};
</script>


<style lang="scss" scoped>
.login-dialog {
  z-index: 20;
}
.dialog-outer {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
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
</style>
