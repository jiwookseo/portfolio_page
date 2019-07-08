<template>
    <header class="homeHeader">
        
        <nav class="navbar">

        </nav>
    </header>
</template>

<script>
export default {
    name: "HeaderHome"
}
</script>

<style lang="scss" scoped>
.homeHeader {
    width: 100%;
    height: calc(100vh + 50px);
    background: #EEEEEE;
    position: relative;
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
    
}
</style>
