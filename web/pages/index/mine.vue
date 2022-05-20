<template>
	<view class="mine">
		<nav-bar></nav-bar>
		<view class="container">
			<view class="left">
				<left></left>
			</view>
			<view class="right">
				<view class="right-top">
					<view v-if="ismultiavatar" v-html="avatar" class="photo"></view>
					<image v-if="!ismultiavatar" class="photo" :src="avatar"></image>
					<text class="name">{{address}}</text>
				</view>
				<view class="right-button">
					<button class="_btn" :class="{'active':active==1}" @click="myBook()">My Books</button>
					<button class="_btn" :class="{'active':active==2}" @click="onSell()">On Sale</button>
					<button class="_btn" :class="{'active':active==3}" @click="activeLog()">Activity History</button>
				</view>
				<view class="right-con" v-if="active == 1">
					<view class="booklist" v-if="bookList.length>0">
						<view class="item" v-for="(item,index) in bookList" :key="index" @click="toDetail(item.issue.id)">
							<image class="img" :src="item.issue.cover_url"></image>
							<view class="info">{{item.issue.name}}</view>
							<text class="author">{{item.issue.author_name}}</text>
						</view>
					</view>
					<view class="none" v-if="bookList.length==0">
						<image class="img" src="/static/book/empty.svg"></image>
						<view class="empty">Books is empty</view>
					</view>
				</view>
				<view class="right-con" v-if="active == 2">
					<view class="booklist" v-if="sellBookList.length>0">
						<view class="item" v-for="(item,index) in sellBookList" :key="index" @click="toDetail(item.issue_detail.id)">
							<image class="img" :src="item.issue_detail.cover_url"></image>
							<view class="info">{{item.issue_detail.name}}</view>
							<text class="author">{{item.issue_detail.author_name}}</text>
						</view>
					</view>
					<view class="none" v-if="sellBookList.length==0">
						<image class="img" src="/static/book/empty.svg"></image>
						<view class="empty">Books on sale are empty</view>
					</view>
				</view>
				<view class="right-con" v-if="active == 3">
					<view class="none" v-if="transactionList.length==0">
						<image class="img" src="/static/book/empty.svg"></image>
						<view class="empty">The active history is empty</view>
					</view>
					<view v-else>
						<view class="right-title">
							<text class="text">name</text>
							<text class="text other1">transaction type</text>
							<text class="text other3">trading hours</text>
							<text class="text other2">amount</text>
							<text class="text other2">buyer</text>
							<text class="text other2">seller</text>
						</view>
						<view v-for="(item,index) in transactionList" :key="index">
							<view class="right-list">
								<view class="text">
									{{item.issue.name}}
								</view>
								<text class="text other1">{{item.type}}</text>
								<text class="text other3">{{item.created_at}}</text>
								<text class="text other2">{{item.price * item.amount}} USDC</text>
								<view class="text other2">
									{{item.buyer.account_addr | strAddress}}
								</view>
								<view class="text other2">
									{{item.seller.account_addr | strAddress}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAssets,getUserTrades,getUserTransactions
	} from '@/common/api.js';
	import common from '@/common/common.js';
	import multiavatar from '@/uni_modules/multiavatar'
	import navBar from '@/components/nav.vue'
	import left from '@/components/left.vue'
	export default {
		components: {
			navBar,
			left
		},
		data() {
			return {
				active: 1,
				avatar: '/static/book/photo.png',//默认头像
				address:'',
				ismultiavatar:false,
				bookList: [],
				sellBookList:[],//售卖中
				transactionList:[],//交易记录
			};
		},
		filters: {
			strAddress:function(val){
				return common.getAddress(val);//从0下标开始的8个字符
			},
		},
		onLoad(option) {
			let that = this;
			that.address = common.getStorage('address');
			let token = common.getStorage('token');
			if(that.address && token){
				that.avatar = multiavatar(that.address);
				that.ismultiavatar = true;
				that.getBookList();//书籍列表
				that.getMySellList();//出售中的书籍列表
				that.getActiveLogList();//交易活动记录
			}else{
				common.setStorage('currentPage','/pages/index/mine');
				common.showModal('please connect wallet');
			}
		},
		methods: {
			/**
			 * 我的书籍列表接口
			 */
			getBookList() {
				let that = this;
				common.showLoading();
				getAssets().then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.bookList = data.results;
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
			 * 我的出售中的书籍列表接口
			 */
			getMySellList() {
				let that = this;
				common.showLoading();
				getUserTrades().then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.sellBookList = data.results;
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
			 * 我的交易活动记录
			 */
			getActiveLogList() {
				let that = this;
				common.showLoading();
				getUserTransactions().then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.transactionList = data.results;
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
			 * 我的书籍
			 */
			myBook() {
				let that = this;
				that.active = 1;
				//that.getBookList();
			},
			/**
			 * 出售中
			 */
			onSell() {
				let that = this;
				that.active = 2;
				//that.getMySellList();
			},
			/**
			 * 活动记录
			 */
			activeLog() {
				let that = this;
				that.active = 3;
				//that.getActiveLogList();
			},
			/**
			 * 跳转书详情
			 * @param {Object} id
			 */
			toDetail: function(id) {
				let that = this;
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.mine {
		width: 100%;
		margin: 0 auto;
		min-width: 1440px;
		background-color: #F6F6F6;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;

		.container {
			.right {
				.right-top {
					height: 1.2rem;
					background: #FFFFFF;
					border-radius: .15rem;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.photo {
						vertical-align: middle;
						width: .78rem;
						height: .78rem;
						border-radius: 50%;
						margin-right: .2rem;
						margin-left: .2rem;
					}

					.name {
						font-size: 36rpx;
						color: #000000;
					}
				}

				.right-button {
					margin-top: .2rem;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					._btn {
						width: 32%;
						height: .35rem;
						background: #FFFFFF;
						border-radius: .15rem;
						margin-right: 1.3%;
						color: #999999;
						font-size: 28rpx;
						border: none;
					}

					._btn:last-child {
						margin-right: 0;
					}

					uni-button:after {
						border: none;
					}

					.active {
						color: #FFFFFF;
						background: #6783E9;
					}
				}

				.right-con {
					margin-top: .2rem;
					min-height: 3.5rem;
					height: auto;
					background: #FFFFFF;
					border-radius: 15px;

					.none {
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						min-height: 4.5rem;
						height: auto;

						.img {
							width: .75rem;
							height: .65rem;
							margin-bottom: 0.15rem;
						}

						.empty {
							font-size: 28rpx;
							color: #999999;
						}
					}

					.booklist {
						text-align: left;
						width: 100%;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						font-size: 24rpx;
						padding: .2rem 0;

						.item {
							width: 20%;
							min-height: 3rem;
							height: auto;
							min-width: 0;
							cursor: pointer;
							margin: 0 0 0.2rem 4%;

							.img {
								width: 440rpx;
								height: 500rpx;
								margin-bottom: .06rem;
								border-radius: .2rem;
							}

							.info {
								line-height: .18rem;
								height: 0.36rem;
								margin-bottom: .03rem;
								color: #000000;
							}
						}
					}

					.right-title,
					.right-list {
						height: .4rem;
						background: #ECECEC;
						border-radius: .15rem .15rem 0 0;
						line-height: .4rem;
						display: flex;
						justify-content: space-around;
						padding: 0 .15rem;

						.text {
							flex: 1.8;
							color: #999999;
						}

						.other1 {
							flex: .8;
						}

						.other2 {
							flex: .6;
						}

						.other3 {
							flex: 1;
						}
					}

					.right-list {
						color: #000000;
						background: #FFFFFF;
						font-size: 28rpx;
						margin-top: .15rem;

						.text {
							line-height: .2rem;
							color: #000000;
						}
					}
				}
			}
		}
	}
</style>
