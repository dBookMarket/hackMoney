<template>
	<view>
		<view class="bootombg">
			<view class="bootom">
				<view class="left" @click="toIndex()">
					<image src="/static/img/dao.png" mode="" class="logo"></image>
				</view>
				<view class="center" @click="toDDID()">
					<text class="">DDID Created with</text>
					<image src="/static/img/love.png" mode="" class="love"></image>
				</view>
				<view class="right" @click="toTwitter()">
					<image src="/static/img/twitter.png" mode="" class="love"></image>
					<text class="text">Twitter</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"bottom",
		data() {
			return {
				
			};
		},
		methods:{
			toIndex(){
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toDDID(){
				window.location.href = 'https://ddid.io/'
			},
			toTwitter() {
				window.location.href = 'https://twitter.com/ddid_io'
			},
		}
	}
</script>

<style>

</style>
