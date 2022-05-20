<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data(){
			return {
				url: '',
			}
		},
		onLoad:function(option){
			let _this = this;
			_this.url = decodeURIComponent(option.url);
			console.log(_this.url);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
