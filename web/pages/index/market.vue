<template>
	<view class="market">
		<nav-bar></nav-bar>
		<view class="container">
			<view class="left">
				<left></left>
			</view>
			<view class="right">
				<uni-swiper-dot :info="bannerArray" :current="current" field="img" :mode="mode"
					:dotsStyles="{backgroundColor:'#6783E9',selectedBorder:'none',border:'none',color:'#fff'}">
					<swiper class="swiper-box" autoplay="true" interval="4000" @change="navigateTo">
						<swiper-item v-for="(item ,index) in bannerArray" :key="index">
							<view class="swiper-item" @click="goToUrl(item.redirect_url)">
								<view class="leftheight">
									<view class="info">
										<view class="title">
											<view class="border"></view>
											<view class="name">{{item.name}}</view>
										</view>
										<text class="desc">
											{{item.desc}}
										</text>
										<view ><button class="buy">buy</button></view>
										
									</view>
								</view>
								
								<view class="image">
									<image class="img" :src="item.img"></image>
								</view>
								
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanners
	} from '@/common/api.js';
	import common from '@/common/common.js';
	import navBar from '@/components/nav.vue'
	import left from '@/components/left.vue'
	export default {
		components: {
			navBar,
			left
		},
		data() {
			return {
				bannerArray: [{
						poster: '/static/book/banner.png',
					},
					{
						poster: '/static/book/banner.png'
					}
				],
				current: 0,
				mode: 'dot',
			};
		},
		onLoad(option) {
			let that = this;
			common.removeStorage('categories');
			that.getBanners();
		},
		methods: {
			/**
			 * 获取banner
			 */
			getBanners: function() {
				let that = this;
				common.showLoading();
				getBanners().then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.bannerArray = data.results;
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
			 * 跳转下一页
			 * 
			 */
			goToUrl: function(tourl) {
				let that = this;
				window.location.href = tourl;
				/* uni.navigateTo({
					url: '/pages/index/openWeb?url=' + encodeURIComponent(tourl)
				}) */
			},
			/**
			 * banner 点击跳转页面
			 * @param {Object} e
			 */
			navigateTo(e) {
				let that = this;
				that.current = e.detail.current;
			},
		}
	}
</script>

<style scoped lang="scss">
	.market {
		width: 100%;
		margin: 0 auto;
		min-width: 1440px;
		background-color: #F6F6F6;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		.container {
			.right {
				height: 7.7rem;
				background: #060219;
				border-radius: 0.25rem;
				.swiper-box {
					display: block;
					height: 7.5rem;
					position: relative;
				}
				.swiper-item{
					height: 7.5rem;
					display: flex;
					justify-content: space-around;
					.leftheight{
						display: flex;
						flex-direction: column;
						justify-content: center;
						flex: 1;
					}
					.info{
						margin-right: .5rem;
						text-align: left;
						flex: 1;
						height:90%;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						color: #FFFFFF;
						.title{
							font-size: 58rpx;
							line-height: .4rem;
							font-family: Alibaba PuHuiTi;
							font-weight: 800;
							padding-bottom: .5rem;
							display: flex;
							justify-content: flex-start;
							.border{
								width: .15rem;
								height: .2rem;
								background: #FFFFFF;
								margin-top: .1rem;
								margin-right: .3rem;
							}
							.name{
								flex: 1;
							}
						}
						.desc{
							margin-left: .45rem;
							color: #999999;
							font-size: 28rpx;
							line-height: .28rem;
							padding-bottom: .4rem;
						}
						.buy{
							width: 110px;
							margin-left: .45rem;
							border: 1px solid #6783E9;
							border-radius: .5rem;
							color: #FEFEFE;
							font-size: 32rpx;
							background: #6783E9;
						}
					}
				}
				
				.swiper-item .image {
					border-radius: .2rem;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.img{
						width: 96%;
						height: 90%;
						border-radius: .2rem;
					}
				}
			}
		}
	}
</style>
