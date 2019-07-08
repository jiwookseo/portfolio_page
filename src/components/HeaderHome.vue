<template>
    <header class="homeHeader">
        
        <nav class="navbar">
            <div class="nav-logo">{{websiteTitle}}</div>
            <FavBtn class="nav-fav" />
            <ul class="nav-menus">
                <li v-for="menu in menus" :key="menu.name" @click="scrollTo(menu.target)">{{ menu.name }}</li>
            </ul>
        </nav>
        <transition name="slide-fade">
            <nav class="sidebar" v-if="showSidebar">
                <div class="sb-nav-logo">{{websiteTitle}}</div>
                <ul>
                    <li v-for="menu in menus" class="sb-nav-menu" :key="menu.name" @click="sb_scrollTo(menu.target)">{{ menu.name }}</li>
                </ul>
            </nav>
        </transition>
        <div class="menu-btn" @click="showSidebar = !showSidebar">
            <span v-if="showSidebar"><i class="material-icons">clear</i></span>
            <span v-if="!showSidebar"><i class="material-icons">dehaze</i></span>
        </div>
        <FavBtn class="sb-fav"/>
    </header>
</template>

<script>
import FavBtn from './FavBtn';

export default {
    name: "HeaderHome",
    components: {
        FavBtn
    },
    props: {
        websiteTitle: {type: String}
    },
    data() {
        return {
            showSidebar: false,
            menus: [
                {name: 'About Me', target: '#aboutme'},
                {name: 'Portfolio', target: '#portfolio'},
                {name: 'Post', target: '#post'},
                {name: 'Project', target: '#project'}
            ]
        }
    },
    methods: {
        scrollTo(target) {
            this.$parent.scrollTo(target);
        },
        sb_scrollTo(target) {
            this.$parent.scrollTo(target);
            this.showSidebar = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/mixin.scss';
.homeHeader {
    width: 100%;
    height: calc(100vh + 50px);
    background: #EEEEEE;
    position: relative;
    @include mobile {
        height: 100vh;
    }
}
.navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #CCCCCC;
    z-index: 999;
    @include mobile {
        display: none;
    }
}
.nav-logo {
    float: left;
    padding: 0 20px;
    cursor: pointer;
        &:hover {
            background: #BBBBBB;
        }
}
.nav-menus {
    float: right;
    li {
        float: left;
        padding: 0 20px;
        cursor: pointer;
        &:hover {
            background: #BBBBBB;
        }
    }
}

.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-180px);
    opacity: 0;
}


.sidebar {
    width: 180px;
    height: 100vh;
    position: fixed;
    top: 0; left: 0;
    background: #EEEEEE;
    box-shadow: 2px 0 10px gray;
    z-index: 999;
    @include viewportMin(601) {
        display: none;
    }
}
.sb-nav-logo, .sb-nav-menu {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
}
.sb-nav-logo {
    text-align: right;
}
.sb-nav-menu:hover {
    background: #BBBBBB;
}
.menu-btn {
    position: fixed;
    top: 0; left: 0;
    width: 50px; height: 50px;
    z-index: 1000;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5);
    display: none;
    @include mobile {
        display: initial;
    }
    span i {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
}

.nav-fav {
    float: right;
}
.sb-fav {
    background: rgba(255, 255, 255, 0.5);
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    @include mobile {
        display: initial;
    }
}
</style>
