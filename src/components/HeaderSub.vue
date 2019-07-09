<template>
    <header>
        <nav>
            <div class="nav-logo">{{websiteTitle}}</div>
            <div>
                <div class="nav-item"><router-link to="/portfolio">Portfolio</router-link></div>
                <div class="nav-item"><router-link to="/post">Post</router-link></div>
                <div class="nav-item login-btn" @click.stop="dialog = true">Login</div>
            </div>
        </nav>
        <FavBtn class="nav-fav" />
        <v-dialog v-model="dialog" class="login-dialog" width="400">
            <LoginDialog />
        </v-dialog>
    </header>
</template>

<script>
import FavBtn from './FavBtn';
import LoginDialog from './LoginDialog';

export default {
    name: "HeaderSub",
    components: {
        FavBtn,
        LoginDialog
    },
    props: {
        websiteTitle: {type: String}
    },
    data() {
        return {
            dialog: false,
            showSidebar: false,
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    width: 100%;
}
</style>
