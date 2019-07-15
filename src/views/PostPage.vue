<template>
<div>
  <HeaderSub />
  <div class="content">
    <h2 class="section-title text">Post</h2>
		<PostList :limit=4 :allowCreate=true />
		<div class="section-btn-box">
			<div class="load-more-btn">Load More</div>
		</div>
		
  </div>
</div>
</template>


<script>
import HeaderSub from '../components/HeaderSub';
import PostList from '../components/PostList'

export default {
  name: "PostPage",
  components: {
    HeaderSub,
    PostList,
	},
	data() {
		return {
			
		}
	}
}
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.content {
	margin: 80px 0 50px;
	height: auto;
}
</style>
