<template>
	<view class="left">
		<view class="first" @click="toRecommend()">
			<image class="svg" src="/static/book/recommend.svg"></image>
			<text :class="{'active':id==-2}">Recommend</text>
		</view>
		<view class="first" @click="openContent()">
			<image class="svg" src="/static/book/D-BOOK.svg"></image>
			<text>D-Books</text>
			<image class="img" v-if="down" src="/static/book/down.svg"></image>
			<image class="img" v-if="!down" src="/static/book/right.svg"></image>
		</view>
		<view class="second" v-if="down">
			<view class="text" @click="toList(-1)">
				<text :class="{'active':id==-1}">All</text>
			</view>
			<view class="text" v-for="(item,index) in categories" :key="index" @click="toList(item.id)">
				<text :class="{'active':item.id==id}">{{item.name}}</text>
			</view>
		</view>
		<view class="first">
			<image class="svg" src="/static/book/publisher.svg"></image>
			<text>Publisher & Author</text>
		</view>
		<view class="second">
			<view class="text" :class="{'active':id==-3}" @click="toUrl(4)">Publisher/Author apply</view>
			<view class="text" :class="{'active':id==-4}" @click="toUrl(4)">Copyright verification</view>
			<view class="text" :class="{'active':id==-5}" @click="toSettled()">Publish DBook</view>
		</view>
		<view class="first">
			<image class="svg" src="/static/book/community.svg"></image>
			<text>Community</text>
		</view>
		<view class="second">
			<view @click="toUrl(1)" :class="{'active':id==-6}" class="text">Twitter</view>
			<view @click="toUrl(2)" :class="{'active':id==-7}" class="text">Discord</view>
			<view @click="toUrl(3)" :class="{'active':id==-8}" class="text">Medium</view>
		</view>
	</view>
</template>

<script>
	import {
		getCategories,getPermissions
	} from '@/common/api.js';
	import common from '@/common/common.js';
	export default {
		name: "left",
		data() {
			return {
				curindex: -1, //当前索引
				categories: [], //分类
				down:true,
				id:0,
			};
		},
		mounted() {
			let that = this;
			let categories = common.getStorage('categories');
			let id = common.getStorage('currentId');
			if(id){
				that.id = id;
			}
			if (categories && categories.length > 0 ) {
				that.categories = categories;
			} else {
				that.initData();
			}
		},
		methods: {
			/**
			 * 
			 * 打开
			 * @param {Object} num
			 */
			openContent() {
				let that = this;
				if (that.down) {
					that.down = false
				} else {
					that.down = true
				}
			},
			/**
			 * 跳转地址
			 * @param {Object} type
			 */
			toUrl(type) {
				let url = "";
				common.removeStorage('currentId');
				if (type == 1) {
					url = 'https://www.youtube.com/channel/UC8T2Hv_OhEozP52_MSpRu2g';
					/*uni.navigateTo({
						url: '/pages/index/openWeb?url='+encodeURIComponent(url)
					}) */
				} else if (type == 2) {
					url = 'https://www.youtube.com/channel/UC8T2Hv_OhEozP52_MSpRu2g';
				} else if (type == 3) {
					url = 'https://medium.com/@ddid_io';
				} else if (type == 4) {
					url = 'https://docs.google.com/forms/d/e/1FAIpQLSdIWjyAFFCo2qNxoPOPUHeRN8w9zguD0_iEpt65FV5VqcdjuA/viewform?usp=sf_link';
				}
				window.location.href = url;
			},
			/**
			 * 推荐页
			 */
			toRecommend() {
				common.setStorage("currentId", -2);
				uni.navigateTo({
					url: '/pages/index/market'
				})
			},
			/**
			 * 初始化左边书籍分类的数据
			 */
			initData() {
				let that = this;
				common.showLoading();
				let params = {};
				getCategories(params).then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.categories = data;
						common.setStorage("categories", that.categories);
					} else {
						common.showModal(res);
					}
				}).catch(error => {
					common.showModal(error);
				}).finally(() => {
					common.hideLoading(0);
				})
			},
			/**
			 * 查询类别书籍
			 * @param {Object} id
			 * @param {Object} index
			 */
			toList(id) {
				let that = this;
				common.setStorage("currentId", id);
				if(id== -1){
					//全部的时候
					id = ""
				}
				uni.navigateTo({
					url: '/pages/index/list?id=' + id
				})
			},
			/**
			 * 发布dbook
			 */
			toSettled() {
				let that = this;
				common.setStorage("currentId", -5);
				let address = common.getStorage('address');
				let token = common.getStorage('token');
				if(address && token){
					common.showLoading();
					let params = {};
					getPermissions(params).then(res => {
						console.log(res);
						if (res && res.statusCode === 200) {
							let data = res.data;
							if(data.has_issue_perm){
								uni.navigateTo({
									url: '/pages/index/settled'
								})
							}else{
								common.showModal('You are not registered,Please apply');
								return;
							}
						} else {
							common.showModal(res);
						}
					}).catch(error => {
						common.showModal(error);
					}).finally(() => {
						common.hideLoading(0);
					})
				}else{
					//common.setStorage('currentPage','/pages/index/settled');
					common.showModal('please connect wallet');
				}
			},
			/**
			 * 入驻申请/版权验证
			 */
			toApply(id) {
				//common.setStorage("currentId", id);
				// uni.navigateTo({
				// 	url: '/pages/index/apply'
				// })
			},
		}
	}
</script>

<style scoped lang="scss">
	.left {
		width: 3rem;
		height: 7.5rem;
		background: #FFFFFF;
		border-radius: .12rem;
		padding-top: .2rem;
		font-size: 30rpx;
		font-family: Alibaba PuHuiTi;
		margin-bottom: 0.36rem;
		overflow-y: scroll;
		
		.first {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-weight: 400;
			color: #000000;
			line-height: .5rem;
			height: .5rem;
			cursor: pointer;
			.img {
				margin-left: 1.5rem;
				width: .16rem;
				height: .18rem;
				vertical-align: middle;
			}
			.svg {
				width: .25rem;
				height: .25rem;
				margin-left: .2rem;
				margin-right: .1rem;
			}
		}

		.second {
			line-height: .4rem;

			.text {
				cursor: pointer;
				margin-left: .6rem;
				font-weight: 400;
				color: #999999;
			}

			.active {
				color: #6783E9;
				text-decoration: underline;
			}
		}

		.active {
			color: #6783E9;
			text-decoration: underline;
		}
	}
</style>
