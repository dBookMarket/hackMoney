<template>
	<view>
		<view class="navbg">
			<view class="nav">
				<view class="left" @click="toIndex()">
					<image src="/static/img/logodbook.png" mode="" class="logo"></image>
				</view>
				<view class="center cflex">
					<view class="search">
						<input class="searchinput" v-model="bookname" type="text" placeholder="Search" />
						<image class="searchicon" @click="toSearch()" src="/static/book/search.svg"></image>
					</view>
				</view>
				<view class="right cflex" style="flex: 1.5;">
					<view class="flex" @click="toRead()">Reader</view>
					<view class="flex" @click="selled()">Sell</view>
					<view class="flex choosewallet" v-if="!address" @click="toWallet(1)">
						<image class="svg" src="/static/book/link1.svg"></image>
						<text>Connect Wallet</text>
						<text></text>
					</view>
					<view class="flex choosewallet cwbg" v-if="address">
						<image @click="selled()" class="svg" src="/static/book/link.svg"></image>
						<text @click="toWallet(2)">{{address | strAddress}}</text>
						<text></text>
					</view>
					<view class="_wallet" v-if="isMetaMask">
						<view class="_walletItem">
							<image src="/static/book/metamask.jpg" class="metamask"></image>
							<text class="selectw">Connect Wallet</text>
						</view>
						<view class="choose" @click="toMetamask()">
							<text>MeraMask</text>
							<image class="metamaskmin" src="/static/book/metamask.jpg"></image>
						</view>
					</view>
					<view class="_connect" v-if="isConnect">
						<view class="_item" @click="copyUrl()">
							<image class="svg" src="/static/book/copy.svg"></image>
							<text>Copy Address</text>
						</view>
						<view class="_item" @click="toSwitch()">
							<image class="svg" src="/static/book/switch.svg"></image>
							<text>Use another account</text>
						</view>
						<view class="_item" @click="toBreak()">
							<image class="svg" src="/static/book/break.svg"></image>
							<text>Disconnect / Sign-Out</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="read">
				<view class="title">
					App Download
				</view>
				<image class="closeimg" @click="close()" src="/static/book/close.svg"></image>
				<view class="con">
					<view class="text1">Coming Soon</view>
					<!-- <view class="qcode">
						<image class="qcodeimg" src="/static/book/qcode.png"></image>
						<view class="text">ios</view>
					</view>
					<view class="qcode">
						<image class="qcodeimg" src="/static/book/qcode.png"></image>
						<view class="text">android</view>
					</view> -->
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		login,
		postNonce,
		logout
	} from '@/common/api.js';
	import common from '@/common/common.js';
	import wallet from '@/common/wallet.js';
	export default {
		name: "navBar",
		data() {
			return {
				isMetaMask: false,
				isConnect: false,
				bookname: "",
				address: ''
			};
		},
		filters: {
			strAddress: function(val) {
				return common.getAddress(val); //从0下标开始的8个字符
			},
		},
		onLoad(option) {
			let that = this;
		},
		mounted: function() {
			let that = this;
			if (common.getStorage("token") && common.getStorage('address')) {
				that.address = common.getStorage('address');
				that.isMetaMask = false;
				that.isConnect = false;
			}else{
				//that.toBreak();
			}
			if(common.getStorage('search')){
				that.bookname = common.getStorage('search');
			}
		},
		methods: {

			/**
			 * 弹出框连接钱包1 已经连接2
			 * @param {Object} type
			 */
			toWallet(type) {
				let that = this;
				if (type == 1) {
					if (that.isMetaMask) {
						that.isMetaMask = false;
					} else {
						that.isMetaMask = true;
					}
					that.isConnect = false;
				} else if (type == 2) {
					if (that.isConnect) {
						that.isConnect = false;
					} else {
						that.isConnect = true;
					}
					that.isMetaMask = false;
				}
			},
			//弹出阅读器
			toRead(){
				let that = this;
				that.$refs.popup.open();
			},
			close(){
				let that = this;
				that.$refs.popup.close()
			},
			/**
			 * 
			 */
			toSearch() {
				let that = this;
				common.setStorage('search',that.bookname);
				uni.navigateTo({
					url: '/pages/index/list?name=' + that.bookname
				})
			},
			toSearchData() {
				let that = this;
				that.$emit('getBookData',that.bookname);
			},
			/**
			 * 获取nonce
			 */
			postNonceFun(address) {
				return new Promise((resolve, reject) => {
					//获取nonce
					postNonce({
						address: address
					}).then(res => {
						console.log(res);
						if (res && (res.statusCode === 200 || res.statusCode === 201)) {
							let nonce = res.data.nonce;
							resolve(nonce);
						} else {
							common.showModal(res);
							reject(res);
						}
					}).catch(data => {
						reject(data);
					}).finally(() => {
						common.hideLoading(0);
					})
				});
			},
			/**
			 * 连接钱包
			 */
			async toMetamask() {
				let that = this;
				common.showLoading();
				let nonce = "";
				let signature = "";
				let provider = "";
				//目标链ID Polygon 链不一致，就询问切换网络，没有就创建网络 然后连接
				provider = await wallet.connectWeb3();
				
				if (provider) {
					let signer = await wallet.getSigner(provider);
					if (signer) {
						let address = await wallet.getAddress(signer);
						if (address) {
							//获取nonce
							that.postNonceFun(address)
								.then(async nonce => {
									console.log("nonce", nonce);
									//获取签名
									signature = await wallet.getSignature(signer, nonce);
									//地址和签名都不为空
									if (typeof(address) === 'string' && typeof(signature) === 'string') {
										let params = {
											address: address,
											signature: signature
										}
										//拿到address和signature去登录
										login(params).then(res => {
											console.log(res);
											if (res && (res.statusCode === 200 || res.statusCode ===
													201)) {
												that.address = address;
												//存储address
												common.setStorage("address", address);
												//存储token
												common.setStorage("token", res.data.token);
												let toUrl = common.getStorage('currentPage');
												if(toUrl){
													common.removeStorage('currentPage');
													uni.navigateTo({
														url: toUrl
													})
												}
												that.isMetaMask = false;
											} else {
												common.showModal(res);
											}
										}).catch(error => {
											common.showModal(error);
										}).finally(() => {
											common.hideLoading(0);
										})
									} else {
										common.hideLoading(0);
									}
								})
								.catch(errData => {
									console.log('reject', errData);
									common.hideLoading(0);
									common.showModal(errData);
								});
						} else {
							common.hideLoading(0);
							common.showModal('the address is empty');
						}
					} else {
						common.hideLoading(0);
						common.showModal('the signer is empty');
					}
				} else {
					common.hideLoading(0);
					common.showModal('the provider is empty');
				}
			},
			toIndex() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			/**
			 * 卖出
			 */
			selled() {
				uni.navigateTo({
					url: '/pages/index/mine'
				})
			},
			/**
			 * 复制地址
			 */
			copyUrl() {
				let that = this;
				let oInput = document.createElement('input');
				oInput.value = that.address;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				console.log(oInput.value)
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					title: 'successfully copied to the clipboard',
					duration: 3000,
					icon: false
				});
				oInput.remove();
				that.isConnect = false;
			},
			/**
			 * 切换路线
			 */
			toSwitch() {
				//切换账户为重新选择连接钱包
				let that = this;
				that.isMetaMask = true;
				that.isConnect = false;
			},
			/**
			 * 断开连接
			 */
			async toBreak() {
				//清除存储缓存输入数据
				let that = this;
				common.showLoading();
				await wallet.disconnect();
				logout().then(res => {
					console.log(res);
					if (res && (res.statusCode === 200 || res.statusCode === 201)) {
						uni.showToast({
							title: 'disconnect succeeded',
							duration: 3000,
							icon: false
						});
						that.isConnect = false;
						that.address = "";
						common.removeStorage('address');
						common.removeStorage('token');
					} else {
						common.showModal(res);
					}
				}).catch(error => {
					common.showModal(error);
				}).finally(() => {
					common.hideLoading(0);
				})
			},
		}
	}
</script>

<style scoped lang='scss'>
	.navbg {
		background-color: #FFFFFF;
		width: 100%;
		font-size: 28rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		.search {
			width: 6rem;
			height: .4rem;
			line-height: .4rem;
			background-color: #F2F2F2;
			border: 1px solid #F2F2F2;
			border-radius: .2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.searchinput {
				border: none;
				width: 90%;
				text-align: left;
				text-indent: 25rpx;
				height: .4rem;
				line-height: .4rem;
			}

			.searchicon {
				width: .3rem;
				height: .3rem;
				margin-right: 0.1rem;
				text-align: right;
				cursor: pointer;
			}
		}

		.right {
			text-align: center;

			.flex {
				flex: 1;
				line-height: .4rem;
				font-weight: normal;
				color: #000000;
				cursor: pointer;
			}

			.choosewallet {
				position: relative;
				height: .4rem;
				line-height: .4rem;
				background: #E8E8E8;
				border-radius: .2rem;
				text-align: center;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #999999;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.svg {
					width: .3rem;
					height: .3rem;
					margin-left: 0.1rem;
					text-align: left;
				}
			}

			.cwbg {
				background: #6783E9;
				color: #FEFEFE;
			}
		}
	}

	.read {
		width: 5rem;
		height: 3.2rem;
		background: #FFFFFF;
		border-radius: .15rem;
		padding: .2rem .15rem;
		position: relative;
		text-align: center;

		.title {
			line-height: .3rem;
			font-size: 36rpx;
			font-family: Alibaba PuHuiTi;
			color: #000000;
		}

		.closeimg {
			position: absolute;
			width: .25rem;
			top: .2rem;
			right: 2%;
			z-index: 10;
			height: .25rem;
			cursor: pointer;
		}

		.con {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: .3rem 0;
			flex-direction:column;
			.text1{
				width: 2rem;
				height: 2rem;
				color: #999;
				margin-top: 1rem;
				font-size: 32rpx;
			}
			.qcodeimg {
				vertical-align: middle;
				width: 2rem;
				height: 2rem;
				cursor: pointer;
			}

			.text {
				margin-top: .1rem;
				color: #000000;
				font-size: 32rpx;
			}
		}
	}

	._connect {
		height: auto;
		width: 2.3rem;
		position: absolute;
		z-index: 10;
		top: .9rem;
		right: 3%;
		font-size: 30rpx;
		background-color: #6783E9;
		border-radius: .1rem;
		color: #FEFEFE;
		font-family: Alibaba PuHuiTi;

		._item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-weight: 400;
			line-height: .4rem;
			cursor: pointer;

			.svg {
				width: .2rem;
				height: .2rem;
				margin-left: .2rem;
				margin-right: .1rem;
			}
		}

	}

	._wallet {
		height: auto;
		width: 2.3rem;
		position: absolute;
		z-index: 10;
		top: .9rem;
		right: 1.5%;
		font-size: 30rpx;
		background-color: #FFFFFF;
		border-radius: .1rem;
		color: #000000;

		._walletItem {
			text-align: center;
			margin-top: .2rem;
			height: .8rem;
			line-height: .3rem;

			.selectw {
				display: block;
				height: .4rem;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
			}

			.metamask {
				width: .4rem;
				height: .4rem;
				border-radius: 50%;
			}
		}

		.choose {
			width: 80%;
			height: .4rem;
			margin: .2rem auto;
			line-height: .4rem;
			border-radius: .2rem;
			border: 1px solid #E2E2E2;
			text-align: center;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			color: #000000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			cursor: pointer;

			.metamaskmin {
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
			}
		}
	}
</style>
