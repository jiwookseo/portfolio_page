<template>
    <div class="posts-container">

    </div>
</template>


<script>
import firestore from '../firebase/firestore';

export default {
    name: "PostList",
    props: {
        limit: {type: Number, default: 4}
    },
    data() {
        return {
            title: '',
            content: '',
            posts: []
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            this.posts = await firestore.getPosts();
        },
        postPost() {
            firestore.postPost(this.title, this.content);
            this.title = '';
            this.content = '';
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

</style>
