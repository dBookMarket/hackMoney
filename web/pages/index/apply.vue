<template>
	<view class="apply">
		<nav-bar></nav-bar>
		<view class="container">
			<view class="left">
				<left></left>
			</view>
			<view class="right">
				<view class="connectWallet" v-if="status==1">
					<image class="img" src="/static/book/connectWallet.svg"></image>
					<view class="empty">Please connect your wallet</view>
				</view>
				<view class="unqualified" v-if="status==2">
					<image class="img" src="/static/book/none.svg"></image>
					<view class="empty">You are not registered，Please apply</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				status: 3,
			};
		},
		onLoad(option) {
			let that = this;
			let address = common.getStorage('address');
			if (address) {
				that.status = 2;
			} else {
				that.status = 1;
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.apply {
		width: 100%;
		margin: 0 auto;
		min-width: 1440px;
		background-color: #F6F6F6;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;

		.container {

			.connectWallet,
			.unqualified {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				min-height: 5.0rem;
				height: auto;

				.img {
					width: .75rem;
					height: .85rem;
					margin-bottom: 0.27rem;
				}

				.empty {
					font-size: 28rpx;
					color: #999999;
				}
			}

			.unqualified {
				.img {
					width: .77rem;
					height: .80rem;
				}
			}
		}
	}
</style>
