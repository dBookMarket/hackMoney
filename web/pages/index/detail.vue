<template>
	<view class="detail">
		<nav-bar></nav-bar>
		<view class="container">
			<view class="left">
				<left></left>
			</view>
			<view class="right">
				<view class="r-top">
					<view class="itemleft">
						<image class="img" :src="book.cover_url"></image>
					</view>
					<view class="itemright">
						<view class="name">{{book.name}}</view>
						<view>
							<text class="author">{{book.author_name}}</text>
							<text class="publisher">publisher:{{book.publisher.name}}</text>
						</view>
						
						<view class="desc">{{book.desc}}</view>
						<view class="info">
							<view class="_item">
								<image class="itemimg" src="/static/book/user.svg"></image>
								<text class="itemtext">owner:{{book.n_owners}}</text>
							</view>
							<view class="_item">
								<image class="itemimg" src="/static/book/all.svg"></image>
								<text class="itemtext">all:{{book.amount}}</text>
							</view>
							<view class="_item">
								<image class="itemimg" src="/static/book/circulation.svg"></image>
								<text class="itemtext">in circulation:{{book.n_circulations}}</text>
							</view>
						</view>
						<view class="button">
							<button class="_btn" @click="tryRead()">Try reading</button>
							<!-- v-if="book.is_owned" -->
							<button class="_btn sell" v-if="book.is_owned" @click="sellOut()">Sell</button>
						</view>
					</view>
				</view>
				<view class="r-bottom">
					<view class="itemleft">
						<view class="itemtitle" @click="openContent(2)">
							<text class="text">Author’s Bio</text>
							<image class="img" v-if="down2" src="/static/book/down.svg"></image>
							<image class="img" v-if="!down2" src="/static/book/right.svg"></image>
						</view>
						<view v-if="down2" class="iteminfo">{{book.author_desc}}</view>
						<view class="itemtitle" @click="openContent(3)">
							<text class="text">Publisher description</text>
							<image class="img" v-if="down3" src="/static/book/down.svg"></image>
							<image class="img" v-if="!down3" src="/static/book/right.svg"></image>
						</view>
						<view v-if="down3" class="iteminfo">{{book.publisher.desc}}</view>
						<view class="itemtitle" @click="openContent(4)">
							<text class="text">Details on the chain</text>
							<image class="img" v-if="down4" src="/static/book/down.svg"></image>
							<image class="img" v-if="!down4" src="/static/book/right.svg"></image>
						</view>
						<view v-if="down4 && book.contract" class="iteminfo border-style">
							<view class="flex">
								<text class="text">Contract address</text>
								<text class="text maincolor" @click="toPolygon(book.contract.address)">{{book.contract.address | strAddress }}</text>
							</view>
							<view class="flex">
								<text class="text">Quantity of tokens</text>
								<text class="text">{{book.contract.token_amount}}</text>
							</view>
							<view class="flex">
								<text class="text">Tokens standard</text>
								<text class="text">{{book.contract.token_criteria}}</text>
							</view>
							<view class="flex">
								<text class="text">Block chain</text>
								<text class="text">{{book.contract.block_chain}}</text>
							</view>
						</view>
					</view>
					<view class="itemright" id="closeDiv">
						<view class="itemtitle">
							<text class="text">Transaction details</text>
							<view @click="openContent(5)">
								<text class="textall">All the list</text>
								<image class="img" v-if="down5" src="/static/book/down.svg"></image>
								<image class="img" v-if="!down5" src="/static/book/right.svg"></image>
							</view>
						</view>
						<block v-if="down5">
							<view class="listtitle">
								<text class="text">price</text>
								<text class="text other1">quantity</text>
								<text class="text other2">time</text>
								<text class="text other2">address</text>
								<text class="text other3"></text>
							</view>
							<view class="list" v-for="(item,index) in tradeList" :key="index">
								<view class="text">
									<image src="/static/book/USDT.svg" class="radio"></image>
									<text class="mid">{{item.price}}USDC</text>
								</view>
								<text class="text other1">{{item.amount}}</text>
								<text class="text other2">{{item.created_at}}</text>
								<view class="text other2">
									<text class="maincolor" @click="toPolygon(item.user.account_addr)">{{item.user.account_addr | strAddress}}</text>
									<text class="once" v-if="item.first_release">first</text>
								</view>
								<view class="text other3">
									<image class="img" v-if="!item.is_owned" @click="buyIn(item)"
										src="/static/book/cart.svg"></image>
									<image class="img" v-if="item.is_owned && !item.first_release"
										@click="returnTrade(item.id)" src="/static/book/return.svg"></image>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="r-list">
					<view class="itemtitle">
						<text class="text">Activity History</text>
					</view>
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
								<view class="text other2 maincolor" @click="toPolygon(item.buyer.account_addr)">
									{{item.buyer.account_addr | strAddress}}
								</view>
								<view class="text other2 maincolor" @click="toPolygon(item.seller.account_addr)">
									{{item.seller.account_addr | strAddress}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="read">
				<view class="title">
					{{book.name}}
				</view>
				<image class="closeimg" @click="close('read')" src="/static/book/close.svg"></image>
				<view class="con">
					<!-- <image class="oimg" src="/static/book/previous.svg"></image> -->
					<div class="word" id="pdfViewer">
						<embed :src="previewUrl" width="100%" height="100%" type="application/pdf"
							allowfullscreen></embed>
					</div>
					<!-- <image class="oimg" src="/static/book/next.svg"></image> -->
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="sellPopup" type="center" :mask-click="false">
			<view class="seller">
				<view class="title">
					Sell
				</view>
				<image class="closeimg" @click="close('sell')" src="/static/book/close.svg"></image>
				<view class="con">
					<text class="price">Price</text>
					<text class="range">Suggested price:{{book.price_range.min_price}} ~ {{book.price_range.max_price}} USDC</text>
				</view>
				<view class="con border">
					<view class="left">
						<image class="icon" src="/static/book/USDT.svg"></image>
						<text class="title">USDC</text>
						<view class="rightb"></view>
					</view>
					<input class="input" v-model="price" type="text" placeholder="Enter price" />
				</view>
				<view class="con">
					<text class="price">Quantity</text>
					<text class="range">Available:{{book.n_remains}}</text>
				</view>
				<view class="con border">
					<input class="input" v-model="amount" type="text" placeholder="Enter quantity" />
				</view>
				<view class="con">
					<view class="taxview">
						<text class="tax">Transaction Fee: 2.5%</text>
						<text class="tax">Royalty: 20%</text>
					</view>
					<button class="_btn" @click="hangOrder()">Pending order</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="buyPopup" type="center" :mask-click="false">
			<view class="buyer">
				<view class="title">
					Buy
				</view>
				<image class="closeimg" @click="close('buy')" src="/static/book/close.svg"></image>
				<view class="con">
					<text class="price">price</text>
				</view>
				<view class="con border">
					<view class="left">
						<image class="icon" src="/static/book/USDT.svg"></image>
						<text class="title">{{currentItem.price}} USDC</text>
					</view>
				</view>
				<view class="con">
					<text class="price">Quantity</text>
					<text class="range">Available:{{currentItem.amount}}</text>
				</view>
				<view class="con border">
					<input class="input" v-model="amount" type="text" placeholder="Enter quantity" />
				</view>
				<view class="con">
					<view class="taxview">

					</view>
					<button class="_btn" @click="buyOrder()">Pay</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="dealPopup" type="center" :mask-click="false">
			<view class="deal">
				<image class="img" src="/static/book/deal.svg"></image>
				<view>Trading</view>
			</view>
		</uni-popup>
		<uni-popup ref="succussPopup" type="center" :mask-click="true">
			<view class="deal">
				<image class="img" src="/static/book/succuss.svg"></image>
				<view>Trade successfully</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getIssue,
		delTrades,
		getTrades,
		postTrades,
		postTransactions,
		getTransactions
	} from '@/common/api.js';
	import common from '@/common/common.js';
	import navBar from '@/components/nav.vue';
	import left from '@/components/left.vue';
	import wallet from '@/common/wallet.js';
	import web from '@/common/web.js';
	export default {
		components: {
			navBar,
			left,
		},
		data() {
			return {
				book: {
					preview: {},
					publisher: {},
					contract: {},
					price_range:{}
				}, //书籍详情
				tradeList: [], //交易详情列表
				transactionList:[],//活动日志
				amount: "", //卖出的数量
				price: "", //卖出的价格
				currentItem: {}, //当前选择的交易记录去买入
				down1: true,
				down2: true,
				down3: true,
				down4: true,
				down5: true,
				id: "", //书籍id
				previewUrl: "/static/test.pdf",
			};
		},
		onLoad(option) {
			let that = this;
			if (option.id) {
				that.id = option.id;
				that.getBookDetail(); //书籍详情
				that.getTradeList(); //交易详情列表
				that.getActiveLogList();//活动日志
			} else {

			}
		},
		mounted() {

		},
		filters: {
			strAddress: function(val) {
				if (val) {
					return common.getAddress(val); //从0下标开始的8个字符
				} else {
					return "";
				}
			},
		},
		methods: {
			/**
			 * 跳转到Polygon网址
			 * @param {Object} address
			 */
			toPolygon(address){
				if(address){
					window.location.href = 'https://polygonscan.com/address/'+address;
				}
			},
			/**
			 * 获取书籍详情
			 */
			getBookDetail() {
				let that = this;
				common.showLoading();
				getIssue(that.id).then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.book = data;
						that.previewUrl = that.book.preview.file_url; //hidde toolbar with appending '#toolbar=0';
						console.log(that.previewUrl)
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
				getTransactions({'issue':that.id}).then(res => {
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
			 * 交易详情的列表接口
			 */
			getTradeList() {
				let that = this;
				common.showLoading();
				let params = {
					issue: that.id,
				}
				getTrades(params).then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.tradeList = data.results;
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
			 * 挂单
			 */
			async hangOrder() {
				let that = this;
				if (that.price) {
					if (parseFloat(that.price) < 20) {
						/* common.showModal('price range is between lowest price and highest price and not lower than first published price.');
						return false; */
					}
				} else {
					common.showModal('please key in price');
					return false;
				}
				if (that.amount) {
					if (parseInt(that.amount) > parseInt(that.book.amount)) {
						common.showModal('quantity cannot be higher than available');
						return false;
					}
				} else {
					common.showModal('please key in quantity');
					return false;
				}
				common.showLoading();
				// 添加授权操作
				let provider = await wallet.connect();
				let signer = await wallet.getSigner(provider);
				let txn = await wallet.approveIssue(signer, true);
				if(txn==null||txn.status!=1){
					common.showModal("Set approval failed, please try again.");
					common.hideLoading(0);
					return;
				}
				// end
				let params = {
					issue: that.id,
					amount: parseInt(that.amount),
					price: parseFloat(that.price)
				}
				postTrades(params).then(res => {
					console.log(res);
					if (res && res.statusCode === 201) {
						let data = res.data;
						that.$refs.sellPopup.close();
						that.getTradeList(); //卖出挂单成功 重新查询交易列表
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
			 * 支付
			 */
			async buyOrder() {
				let that = this;
				if (that.amount) {
					if (parseInt(that.amount) > parseInt(that.currentItem.amount)) {
						common.showModal('quantity cannot be higher than available');
						return false;
					}
				} else {
					common.showModal('please key in quantity');
					return false;
				}
				common.showLoading();
				//购买需要先调用合约
				//获取判断是否连接
				let provider = await wallet.connect();
				if (provider) {
					let signer = await wallet.getSigner(provider);
					if (signer) {
						let seller = that.currentItem.user.account_addr; //卖家地址
						let nftId = that.currentItem.issue; //the issue id
						let amount = parseInt(that.amount); //买入的数量
						//hex,metainfo 原数据，一个json数据可以存nft的相关数据，需要转成十六进制 
						let metadata = common.strToHexCharCode(JSON.stringify(that.currentItem));
						let price = parseFloat(that.currentItem.price); //买入的价格
						//授权平台获取代币USDC
						let res = await wallet.approveTrade(signer, amount, price);
						if (res == null || res.status != 1) {
							common.showModal('submission error, please try again');
							common.hideLoading(0);
							return;
						}
						//合约执行会返回一个结果
						let transaction = await wallet.trade(signer, seller, nftId, amount, metadata, price);
						console.log(transaction);
						if (transaction == null || transaction.status != 1) {
							common.showModal('transaction error, please try again');
							common.hideLoading(0);
						} else {
							let params = {
								trade: parseInt(that.currentItem.id),
								amount: parseInt(that.amount),
								price: parseFloat(price),
								hash: transaction.transactionHash
							}
							that.$refs.dealPopup.open();
							//购买书籍
							postTransactions(params).then(res => {
								console.log(res);
								if (res && (res.statusCode === 200 || res.statusCode === 201)) {
									let data = res.data;
									that.dealSuccuss();
								} else {
									common.showModal(res);
								}
							}).catch(error => {
								common.showModal(error);
							}).finally(() => {
								common.hideLoading(0);
							})
						}
					}
				}
			},
			/**
			 * 交易成功
			 */
			dealSuccuss() {
				let that = this;
				that.$refs.dealPopup.close();
				that.$refs.buyPopup.close();
				that.$refs.succussPopup.open();
			},
			/**
			 * 试读
			 */
			tryRead() {
				let that = this;
				that.$refs.popup.open();
			},
			/**
			 * 卖出
			 */
			sellOut() {
				this.$refs.sellPopup.open();
			},
			/**
			 * 撤销挂单
			 * 如果是自己的书籍
			 */
			returnTrade(id) {
				let that = this;
				common.showLoading();
				delTrades(id).then(res => {
					console.log(res);
					if (res && res.statusCode === 204) {
						uni.showToast({
							title: 'transaction cancelled',
							duration: 3000,
							icon: false
						});
						// 刷新挂单列表
						that.getTradeList();
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
			 * 买入
			 * @param {Object} item
			 */
			buyIn(item) {
				let that = this;
				that.currentItem = item;
				that.$refs.buyPopup.open();
			},
			/**
			 *  
			 * 关闭
			 */
			close(type) {
				let that = this;
				if (type == 'read') {
					that.$refs.popup.close()
				} else if (type == 'sell') {
					that.$refs.sellPopup.close()
				} else if (type == 'buy') {
					that.$refs.buyPopup.close()
				}
			},
			/**
			 * 
			 * 打开
			 * @param {Object} num
			 */
			openContent(num) {
				let that = this;
				if (num == 1) {
					if (that.down1) {
						that.down1 = false
					} else {
						that.down1 = true
					}
				}
				if (num == 2) {
					if (that.down2) {
						that.down2 = false
					} else {
						that.down2 = true
					}
				}
				if (num == 3) {
					if (that.down3) {
						that.down3 = false
					} else {
						that.down3 = true
					}
				}
				if (num == 4) {
					if (that.down4) {
						that.down4 = false
					} else {
						that.down4 = true
					}
				}
				if (num == 5) {
					if (that.down5) {
						document.getElementById('closeDiv').style.height = 40+'px';
						that.down5 = false;
					} else {
						that.down5 = true;
						document.getElementById('closeDiv').style.height = 'auto';
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail {
		width: 100%;
		margin: 0 auto;
		min-width: 1440px;
		background-color: #F6F6F6;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;

		.isshowpdf {
			display: flex !important;
		}
		.read,
		.seller,
		.buyer {
			width: 6rem;
			height: 6.5rem;
			background: #FFFFFF;
			border-radius: .15rem;
			padding: .2rem .15rem;
			position: relative;
			text-align: center;

			.title {
				line-height: .24rem;
				font-size: 32rpx;
				font-family: Alibaba PuHuiTi;
				color: #000000;
			}

			.closeimg {
				position: absolute;
				width: .25rem;
				top: .2rem;
				right: 1.8%;
				z-index: 10;
				height: .25rem;
				cursor: pointer;
			}

			.con {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: .1rem 0;

				.oimg {
					vertical-align: middle;
					width: .3rem;
					height: .3rem;
					cursor: pointer;
				}

				.word {
					width: 100%;
					height: 6rem;
				}
			}

			.bot {
				font-size: 30rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #000000;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.op {
					.opimg {
						width: .2rem;
						height: .2rem;
						vertical-align: center;
						margin-right: .12rem;
						cursor: pointer;
					}
				}
			}
		}

		.seller,
		.buyer {
			width: 5.3rem;
			height: 3.2rem;
			background: #FFFFFF;
			border-radius: .15rem;

			.con {
				margin-top: .2rem;
				font-size: 28rpx;

				.range {
					color: #999999;
				}

				.taxview {
					flex: 1;
					text-align: left;
				}

				.tax {
					color: #6783E9;
					padding-right: .2rem;
				}

				._btn {
					width: 1.1rem;
					height: .45rem;
					background: #6783E9;
					border-radius: .24rem;
					color: #FFFFFF;
					line-height: .45rem;
				}
			}

			.border {
				justify-content: flex-start;
				align-items: center;
				height: .5rem;
				line-height: .5rem;
				background: #F8F8F8;
				border-radius: .1rem;

				.left {
					width: 23%;
					display: flex;
					justify-content: space-around;

					.icon {
						width: .21rem;
						height: .21rem;
						margin-left: .08rem;
						margin-right: .05rem;
						vertical-align: middle;
					}

					.title {
						font-size: 28rpx;
						color: #999999;
					}

					.rightb {
						width: 1px;
						background: #DEDEDE;
					}
				}

				.input {
					width: 80%;
					text-align: left;
					text-indent: 25rpx;
					font-size: 28rpx;
					height: .5rem;
					line-height: .5rem;
				}
			}
		}

		.buyer {
			.title {
				color: #000000 !important;
			}
		}

		.container {
			.right {
				.r-top {
					display: flex;
					justify-content: flex-start;

					.itemleft {
						width: 520rpx;
						margin-right: .3rem;

						.img {
							border-radius: .20rem;
							width: 520rpx;
							height: 580rpx;
						}
					}

					.itemright {
						flex: 2;
						font-weight: 400;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						.name {
							line-height: .4rem;
							font-size: 50rpx;
							font-family: Alibaba PuHuiTi;
							font-weight: 800;
							color: #000000;
						}

						.author {
							margin-right: .1rem;
							text-align: left;
							padding: 12rpx 22rpx;
							background: #E1E1E1;
							border-radius: .05rem;
							height: .22rem;
							line-height: .22rem;
							font-size: 24rpx;
							color: #999999;
						}

						.publisher {
							padding: 12rpx 22rpx;
							border-radius: .05rem;
							height: .22rem;
							line-height: .22rem;
							font-size: 24rpx;
							color: #999999;
							background: #E1E1E1;
						}
						.desc{
							color: #999999;
							font-size: 24rpx;
							text-align: left;
							line-height: .2rem;
						}
						.info {
							display: flex;
							justify-content: flex-start;
							line-height: .2rem;
							align-items: center;
							font-size: 24rpx;

							._item {
								margin-right: .6rem;

								.itemimg {
									width: .18rem;
									height: .2rem;
									margin-right: 0.05rem;
									vertical-align: bottom;
								}

								.itemtext {
									width: .75rem;
									height: .2rem;
									line-height: .2rem;
									color: #999999;
								}
							}
						}

						.button {
							background-color: transparent;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							width: 100%;

							._btn {
								width: 1.3rem;
								height: .5rem;
								background: #6783E9;
								border-radius: .24rem;
								color: #FFFFFF;
								line-height: .5rem;
								margin-left: 0px;
								margin-right: 0px;
							}

							.sell {
								margin-left: 0.4rem;
								background: #E96767;
							}
						}
					}
				}

				.r-bottom {
					display: flex;
					justify-content: flex-start;
					font-weight: 400;
					margin: .2rem 0;

					.itemleft {
						width: 520rpx;
						margin-right: .3rem;
						height: auto;
						border-radius: .20rem;
						background-color: #FFFFFF;

						.itemtitle {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 .15rem;
							height: .4rem;
							line-height: .4rem;

							.text {
								font-size: 28rpx;
								color: #000000;
							}

							.img {
								width: .16rem;
								height: .18rem;
								vertical-align: middle;
							}
						}

						.iteminfo {
							padding: .07rem .15rem;
							line-height: .19rem;
							font-size: 24rpx;
							color: #999999;
							background: #F6F8FE;

							.flex {
								display: flex;
								justify-content: space-between;

								.text {
									flex: 1;
									line-height: .22rem;
								}

								.text:last-child {
									text-align: right;
								}
							}
						}
					}

					.itemright {
						flex: 2;
						height: auto;
						border-radius: .20rem;
						background-color: #FFFFFF;
						font-size: 28rpx;

						.itemtitle {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 .15rem;
							height: .4rem;
							line-height: .4rem;

							.text {
								color: #000000;
							}

							.textall {
								color: #6783E9;
							}

							.img {
								width: .16rem;
								height: .18rem;
								margin-left: .06rem;
								vertical-align: middle;
							}
						}

						.listtitle,
						.list {
							display: flex;
							justify-content: space-around;
							padding: 0 .15rem;
							height: .4rem;
							line-height: .4rem;
							background: #F6F8FE;

							.text {
								flex: 1.3;
								color: #999999;
							}

							.text:first-child {}

							.other1 {
								flex: .8;
							}

							.other2 {
								flex: 2;
							}

							.other3 {
								flex: .4;
							}
						}

						.list {
							background: #FFFFFF;

							.text {
								color: #000000;
								margin-right: 0.1rem;
								.mid {
									vertical-align: middle;
								}

								.radio {
									width: .21rem;
									height: .21rem;
									margin-right: .05rem;
									vertical-align: middle;
								}
								.maincolor{
									margin-right: 0.05rem;
								}
								.once {
									background: #E96767;
									color: #FFFFFF;
									padding: .01rem .1rem;
									border-radius: .12rem;
								}

								.img {
									width: .2rem;
									height: .2rem;
									cursor: pointer;
									vertical-align: middle;
								}
							}

						}
					}
				}
				.r-list {
					margin-top: .2rem;
					min-height: 2rem;
					height: auto;
					border-radius: .20rem;
					background: #FFFFFF;
					.itemtitle {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 .15rem;
						height: .4rem;
						line-height: .4rem;
					
						.text {
							font-size: 28rpx;
							color: #000000;
						}
					}
					.none {
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						min-height: 1.5rem;
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
					.right-title,
					.right-list {
						height: .4rem;
						background: #F6F8FE;
						/* border-radius: .15rem .15rem 0 0; */
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
					
						.text {
							color: #000000;
						}
					}
				}
			}
		}
	}
</style>
