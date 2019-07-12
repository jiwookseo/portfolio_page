<template>
<div>
  <HeaderSub />
  <div class="content">
    <h2>Post</h2>
		<PostList :limit=4 :allowCreate=true />
		<div>
			<div class="more">Load More</div>
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
	margin-top: 50px;
	padding-top: 10px;
	height: auto;
	h2 {
			text-align: center;
			font-size: 2em;
	}
}
.more {
	@include loadMoreBtn;
}
</style>
