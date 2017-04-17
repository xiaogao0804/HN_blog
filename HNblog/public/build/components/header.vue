<template>
	<div class="header">
	    <div id="header">
	        <div class="title">派科思诺-分享站</div>
	        <div class="login" v-if="login">{{login}}</div>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		methods:{
			
		},
		props:['login'],
	}
</script>

<style>
</style>