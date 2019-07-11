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
        <v-text-field v-model="password" label="Password" :type="'password'" required></v-text-field>
        <v-btn color="primary" v-on:click="login" class="text">Login</v-btn>
        <v-spacer />
        <v-btn color="primary" v-on:click="facebookLogin" class="text">Login with Facebook</v-btn>
      </v-form>
    </div>
    <div class="dialog-outer" v-if="!showLogin">
      <div class="d-title text">Sign Up</div>
      <div class="d-sub text">
        or
        <span @click="showLogin = true" class="text">login to your account</span>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" :type="'password'" required></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="Password Confirm"
          :type="'password'"
          required
        ></v-text-field>
        <v-btn color="success" v-on:click="signUp" class="text">Sign up</v-btn>
        <v-spacer />
      </v-form>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("public_profile");
provider.setCustomParameters({
  display: "popup"
});

export default {
  name: "LoginDialog",
  data() {
    return {
      dialog: false,
      valid: true,
      showLogin: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordConfirm: ""
    };
  },
  computed: {
    ...mapActions(["logout"]),
    ...mapGetters({ user: "getUser" }),
    passwordConfirmRules() {
      return [
        () => this.password === this.passwordConfirm || "password must match",
        v => !!v || "Confirmation password is required"
      ];
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("회원가입 완료");
            console.log("signup email : " + this.email);
            this.showLogin = true;
            this.$emit("child", this.dialog);
            this.email = "";
            this.password = "";
            this.passwordConfirm = "";
            this.logout();
            this.$router.replace("/");
          },
          function(err) {
            alert("에러 : " + err.message);
          }
        );
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(this.email + "님 환영합니다");
            this.$emit("child", this.dialog);
            this.email = "";
            this.password = "";
            this.$router.replace("/");
          },
          err => {
            alert("에러 : " + err.message);
          }
        );
    },
    facebookLogin() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          var user = result.user.displayName;

          console.log("token : " + token);
          console.log("user : " + user);

          alert(user + "님 환영합니다");
          this.$emit("child", this.dialog);
          this.email = "";
          this.password = "";
          this.$router.replace("/");
        })
        .catch(err => {
          alert("에러 : " + err.message);
        });
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
