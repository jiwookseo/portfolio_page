<template>
    <footer>
        <div id="weather">weather</div>
        <div id="copyrights">SSAFY Team Six ©2019</div>
        <div id="top-btn" @click="totop"><span><i class="material-icons">keyboard_arrow_up</i></span></div>
    </footer>    
</template>


<script>
export default {
    name: "Footer",
    methods: {
        totop() {
            $('html, body').animate({
                scrollTop: 0,
            }, 700);
        }
    }
}
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    height: 250px;
    background: #181818;
    color: white;
    text-transform: uppercase;
    position: relative;
    z-index: 99;
}
#weather {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid royalblue;
    bottom: 100px;
    right: 5%;
}
#copyrights {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
}
@keyframes bobup {
    0% {transform: translateY(0);}
    100% {transform: translateY(-4px);}
}
$top-btn-size: 40px;
#top-btn {
    width: $top-btn-size * 2;
    height: $top-btn-size;
    border-top-left-radius: $top-btn-size;
    border-top-right-radius: $top-btn-size;
    position: absolute;
    top: $top-btn-size * -1;
    left: 50%;
    transform: translate(-50%);
    background: #181818;
    cursor: pointer;
    span {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0; left: 0;
        i {
            font-size: 2em;
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%);
        }
    }
    &:hover span {
        animation: bobup 0.7s ease-in-out infinite alternate;
    } 
}
</style>

