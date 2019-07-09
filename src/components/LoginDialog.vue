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
                <v-btn color="primary">Login</v-btn>
                <v-spacer />
                <v-btn color="primary">Login with Facebook</v-btn>
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
