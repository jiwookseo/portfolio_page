<template>
    <div>
        <HeaderSub />
        <div class="content">
            <h2>Post</h2>
        </div>
    </div>
</template>


<script>
import HeaderSub from '../components/HeaderSub';

export default {
    name: "PostPage",
    components: {
        HeaderSub
    }
}
</script>


<style lang="scss" scoped>
.content {
    margin-top: 50px;
    padding-top: 10px;
}
</style>