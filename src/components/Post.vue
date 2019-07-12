<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light headoverflow">{{title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading overflow">{{content}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
	name: 'Post',
	props: {
		date: {type: Date},
		title: {type: String},
		content: {type: String}
	},
  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
    }
  }
}
</script>
<style>
  .color-666 {
    color: #666;
  }
  .color-333 {
    color: #333;
  }
  .h-100 {
    height: 100%;
  }
  .headoverflow {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top: 1px;
    max-height: 80px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1
  }
  .overflow {
   display: -webkit-box;
   display: -ms-flexbox;
   display: box;
   margin-top: 1px;
   max-height: 80px;
   overflow: hidden;
   vertical-align: top;
   text-overflow: ellipsis;
   word-break: break-all;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3
  }
</style>
