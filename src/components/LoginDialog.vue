<template>
    <div>
        <div class="dialog-outer" v-if="showLogin">
            <div class="d-title">Login</div>
            <div class="d-sub">or <span @click="showLogin = false">create an account</span></div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    :type="'password'"
                    required
                ></v-text-field>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
                <v-spacer />
                <v-btn color="primary" v-on:click="facebookLogin">Login with Facebook</v-btn>
            </v-form>
        </div>
        <div class="dialog-outer" v-if="!showLogin">
            <div class="d-title">Sign Up</div>
            <div class="d-sub">or <span @click="showLogin = true">login to your account</span></div>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    :type="'password'"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="passwordConfirm"
                    label="Password Confirm"
                    :type="'password'"
                    required
                ></v-text-field>
                <v-btn color="success">Sign up</v-btn>
                <v-spacer />
                <v-btn color="primary">Sign up with Facebook</v-btn>
            </v-form>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase'

var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})

export default {
    name: "LoginDialog",
    data() {
        return {
            valid: true,
            showLogin: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordConfirm: '',
        }
    },
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        login() {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              alert(this.email + "님 환영합니다")
              this.$router.replace('home')
            },
            (err) => {
              alert('에러 : ' + err.message)
            }
          );
        },
        facebookLogin() {
          firebase.auth().signInWithPopup(provider).then((result) => {
            var token = result.credential.accessToken
            var user = result.user.displayName

            console.log("token : " + token)
            console.log("user : " + user)

            alert(user + "님 환영합니다")
            this.$router.replace('home')

          }).catch((err) => {
            alert('에러 : ' + err.message)
          })
        }
    }
}
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
