<template>
	<view class="bg">
		<view class="indexapp">
			<view class="navbg">
				<view class="nav">
					<view class="left">
						<image src="/static/img/logodbook.png" mode="" class="logo"></image>
					</view>
					<view class="center">
						<a href="#Learn"><text class="text _marleft">Learn</text></a>
						<a href="#Solution"><text class="text">Solution</text></a>
						<a href="#Cooperation"><text class="text">Cooperation</text></a>
						<a href="#Community"><text class="text">Community</text></a>
					</view>
					<view class="right">
						<button id="airdrop" @click="toMarket()" class="button">Explore the market</button>
					</view>
				</view>
			</view>
			<view class="content_1_bg">
				<view class="content_1">
					<image src="/static/img/dbook.png" mode="" class="img1"></image>
					<view class="font1">
						D-Book is an nft book marketplace that allows authors/publishers to publish their works as nfts.
						Readers/collectors can purchase these nft books by their favorite authors for their reading pleasure
						using the D-Book app.
						Readers can also choose to resell or transfer ownership of their nft book collection at any point of
						time. Authors/publishers are guaranteed of their royalty earnings with each secondary sale of their
						work.
					</view>
				</view>
			</view>
			<view class="content_2_bg">
				<view class="content_2" id="Learn">
					<view class="item">
						<image src="/static/img/icon1.svg" mode="" class="icon1"></image>
						<view class="font2">Copyright Protection</view>
						<view class="font3">
							Genuine transaction records can be traced and held, no additional copies will be generated for
							D-Book transactions.
						</view>
					</view>
					<view class="item">
						<image src="/static/img/icon2.svg" mode="" class="icon1"></image>
						<view class="font2">Digital Transaction</view>
						<view class="font3">
							In addition to publishers and authors who can release D-Books, readers have the right to resell
							D-Books again.
						</view>
					</view>
					<view class="item">
						<image src="/static/img/icon3.svg" mode="" class="icon1"></image>
						<view class="font2">Collection Value</view>
						<view class="font3">
							Each D-Book is a limited edition with the opportunity to obtain the author's rare and precious
							signature.
						</view>
					</view>
				</view>
			</view>
			<view class="content_3_bg" id="Solution">
				<view class="content_3">
					<view class="item">
						<image src="/static/img/what.png" mode="" class="img0"></image>
						<view class="font1">
							Publisher & Author
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">Genuine guarantee, NFT and traceability of D-Books.</text>
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">Fully Homomorphic Encryption ensures that no additional copies will be
								generated during the transaction process.</text>
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">Conform to the DRM design scheme, only the owner can get decryption reading
								permission.</text>
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">Guarantee the rights of copyright owners, allow owners to trade, and up to
								50% of the copyright tax can be levied.</text>
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">Fully decentralized, publishers and authors can release works after
								verifying the copyright ownership.</text>
						</view>
						<view class="list">
							<image src="/static/img/right.svg" mode="" class="img1"></image>
							<text class="text1">There is no middleman, you can get all the income without sharing with the
								platform.</text>
						</view>
					</view>
					<view class="item">
						<image src="/static/img/book.png" mode="" class="img2"></image>
					</view>
				</view>
			</view>
			<view class="content_4_bg">
				<view class="content_4">
					<view class="item">
						<image src="/static/img/photo.png" mode="" class="img2"></image>
					</view>
					<view class="item">
						<text class="font1">
							Reader
						</text>
						<view class="list">
							<text class="text1">Copyright is limited worldwide, with collection value.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
						<view class="list">
							<text class="text1">Resell at any time, with a safe and reliable trading platform.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
						<view class="list">
							<text class="text1">On-chain traceability, which ensures that all purchases / sales on the
								trading platform are genuine.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
						<view class="list">
							<text class="text1">Free trial reading, and choose to purchase if the content has value.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
						<view class="list">
							<text class="text1">Dedicated decoder, the super ultimate reading experience.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
						<view class="list">
							<text class="text1">Link meta-universe, which can be read in the virtual world.</text>
							<image src="/static/img/right.svg" mode="" class="img1"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="content_5_bg">
				<view class="content_5">
					<image src="/static/img/developers.png" mode="" class="img1"></image>
					<view class="item">
						<view class="info">D-Book allows publishers or authors to sell NFT on multiple public chains, such
							as Ethereum, Polygon, BSC, Solana, Dfinity etc.</view>
						<view class="info">D-book will not issue its own digital currency, but will support payments with
							the mainstream digital currency in the market.</view>
						<view class="info">D-Book will provide API for developers to carry out secondary development on
							D-Book, and you can also leave a message in the community if you have any ideas and suggestions.
						</view>
					</view>
				</view>
			</view>
			<view class="content_6_bg" id="Cooperation">
				<view class="content_6">
					<image src="/static/img/author.png" mode="" class="img1"></image>
					<view class="font1">
						If you're a publisher & author who wants to publish your own digital right, D-Book is a good choice
						for you. Join us for a whole new experience that blockchain brings to you!
					</view>
					<view class="input-style">
						<input type="text" class="emailinput" placeholder="Enter your email address" />
						<button class="submit" @click="toEmail()">submit</button>
					</view>
					<view class="font2">We will contact you within 3-7 working days after submission.</view>
				</view>
			</view>
			<view class="content_7_bg" id="Community">
				<view class="content_7">
					<view class="top">
						<view class="font1" style="display: none;">Partner</view>
						<view class="font2" style="height: 1.8rem;"></view>
					</view>
					<view class="flexbottom">
						<view class="left">
							<view class="item">
								<image src="/static/img/twitter.svg" mode="" @click="toUrl(1)" class="img img1"></image>
								<image src="/static/img/discord.svg" mode="" @click="toUrl(2)" class="img img1"></image>
								<image src="/static/img/youtube.svg" mode="" @click="toUrl(3)" class="img img3"></image>
								<image src="/static/img/medium.svg" mode="" @click="toUrl(4)" class="img img4"></image>
							</view>
						</view>
						<view class="right">
							<image src="/static/img/app.svg" mode="" class="android"></image>
							<image src="/static/img/google.svg" mode="" class="apple"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		mounted() {
			let that = this;
		},
		methods: {
			toUrl(type) {
				if (type == 1) {
					window.location.href = 'https://twitter.com/ddid_io'
				} else if (type == 2) {
					//window.location.href = 'https://www.youtube.com/channel/UC8T2Hv_OhEozP52_MSpRu2g'
				} else if (type == 3) {
					window.location.href = 'https://www.youtube.com/channel/UC8T2Hv_OhEozP52_MSpRu2g'
				} else if (type == 4) {
					window.location.href = 'https://medium.com/@ddid_io'
				}

			},
			toMarket(){
				uni.navigateTo({
					url: '/pages/index/market'
				})
			},
			toEmail() {
				window.location.href =
					'https://docs.google.com/forms/d/e/1FAIpQLSfZvNUMTzLVxIM7UZiE5Th31Tk6D8xI_qgQZVEs98MbJ8kTjQ/viewform?usp=sf_link'
			}
		}
	}
</script>

<style>
	.indexapp {
		width: 100%;
		margin: 0 auto;
		min-width: 1280px;
		height: auto;
		background-color: #FFFFFF;
		background-image: url(../../static/img/bg.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: contain;
	}

	.nav .center a {
		text-decoration: none;
	}

	.content_7_bg {
		width: 100%;
		margin: .7rem auto 0;
		height: 5rem;
		background-color: #FFFFFF;
		background-image: url(../../static/img/bg3.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover;
	}

	.content_7 {
		text-align: center;
		overflow: hidden;
		width: 60%;
		padding: .75rem 0 0rem 0;
		margin: 0rpx auto;
	}

	.content_7 .flexbottom {
		display: flex;
		justify-content: space-around;
	}

	.content_7 .flexbottom .fontitem {
		text-align: left;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #999999;
	}

	.content_7 .flexbottom .fontitem:last-child {
		font-size: .15rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #000000;
	}

	.content_7 .android,
	.content_7 .apple {
		width: 1.75rem;
		height: .5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content_7 .flexbottom .right .img1 {
		vertical-align: middle;
		width: .23rem;
		height: .23rem;
		margin-right: .10rem;
	}

	.content_7 .item {
		display: flex;
		justify-content: flex-start;
	}

	.content_7 .item .img {
		margin-right: .4rem;
		cursor: pointer;
	}

	.content_7 .item .img1 {
		vertical-align: middle;
		width: .31rem;
		height: .31rem;
	}

	.content_7 .item .img2 {
		vertical-align: middle;
		width: .27rem;
		height: .31rem;
	}

	.content_7 .item .img3 {
		vertical-align: middle;
		width: .34rem;
		height: .34rem;
	}

	.content_7 .item .img4 {
		vertical-align: middle;
		width: .35rem;
		height: .35rem;
	}

	.content_7 .top {
		width: 50%;
	}

	.content_7 .left {
		flex: 2;
		text-align: left;
	}

	.content_7 .font1 {
		width: 1.21rem;
		height: .4rem;
		line-height: .4rem;
		background: #FFFFFF;
		font-size: .3rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 800;
		color: #6783E9;
		text-align: center;
	}

	.content_7 .font2 {
		width: 4.21rem;
		line-height: .6rem;
		font-size: .3rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 800;
		color: #FFFFFF;
		text-align: left;
		margin: .5rem 0 .7rem 0;
	}

	.content_7 .right {
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: space-around;
	}

	.content_5_bg {
		width: 100%;
		margin: .8rem auto 0;
		height: 6.5rem;
		background-color: #FFFFFF;
		background-image: url(../../static/img/bg2.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover;
	}

	.content_5 {
		text-align: center;
		overflow: hidden;
		width: 60%;
		padding: 1.6rem 0 0rem 0;
		margin: 0rpx auto;
	}

	.content_5 .img1 {
		vertical-align: middle;
		width: 6.58rem;
		height: 1.1rem;
	}

	.content_5 .item {
		display: flex;
		justify-content: space-around;
		width: 80%;
		margin: 0 auto;
	}

	.content_5 .item .info {
		flex: 1;
		text-align: center;
		margin: 1.3rem 0 1rem 0;
		color: #FFFFFF;
		border-right: 1px solid #FFFFFF;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		line-height: .25rem;
		padding: 0rem .3rem;
	}

	.content_5 .item .info:last-child {
		border-right: none;
	}

	.content_6_bg {
		width: 100%;
		position: relative;
		height: 3.85rem;
		background-color: #FFFFFF;
	}

	.content_6 {
		text-align: center;
		overflow: hidden;
		width: 60%;
		padding: .7rem 0 0rem 0;
		margin: 0rpx auto;
	}

	.content_6 .img1 {
		vertical-align: middle;
		width: 4.65rem;
		height: .41rem;
	}

	.content_6_bg .input-style {
		background: #F7F7F7;
		border-radius: .22rem;
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		height: .7rem;
		line-height: .7rem;
	}

	.content_6_bg .emailinput {
		height: .7rem;
		border: none;
		line-height: .7rem;
		width: 85%;
		text-align: left;
		text-indent: .15rem;
	}

	.content_6_bg .submit {
		width: 12%;
		margin-top: .115rem;
		vertical-align: middle;
		text-align: center;
		height: .47rem;
		line-height: .47rem;
		background: #6783E9;
		border-radius: .24rem;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #FFFFFF;
	}

	.content_6_bg .font1,
	.content_6_bg .font2 {
		width: 70%;
		text-align: center;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #999999;
		line-height: .3rem;
		margin: .46rem auto;
	}

	.content_6_bg .font2 {
		text-align: left;
		text-indent: .15rem;
		width: 88%;
		margin: .1rem auto;
	}

	.content_1_bg {
		width: 100%;
		margin: .4rem auto 0;
		height: 7.6rem;
		background-image: url(../../static/img/bg1.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover;
	}

	.content_1 {
		text-align: center;
		overflow: hidden;
		width: 60%;
		padding: 2.3rem 0 0rem 0;
		margin: 0rpx auto;
	}

	.content_1 .img1 {
		vertical-align: middle;
		width: 4.77rem;
		height: .86rem;
	}

	.content_1 .font1 {
		font-size: .16rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 300;
		color: #FFFFFF;
		padding-top: .6rem;
		line-height: .3rem;
		width: 82%;
		margin: 0 auto;
	}

	.content_2_bg {
		width: 100%;
		position: relative;
		height: 3.5rem;
		background-color: #FFFFFF;
	}

	.content_2 {
		width: 70%;
		height: 3.5rem;
		margin: 0 auto;
		background: #FFFFFF;
		box-shadow: -10px 5px 44px 7px rgba(43, 43, 43, 0.04);
		border-radius: .2rem;
		position: absolute;
		top: -.8rem;
		left: 15%;
		z-index: 11;
		display: flex;
	}

	.content_2 .item {
		flex: 1;
		text-align: center;
		margin: .5rem 0 .5rem 0;
		border-right: 1px solid #DFDFDF;
	}

	.content_2 .item .icon1 {
		vertical-align: middle;
		width: .46rem;
		height: .51rem;
	}

	.content_2 .item .font2 {
		font-size: .18rem;
		font-family: Alibaba PuHuiTi;
		color: #000000;
		margin-top: .3rem;
		line-height: .35rem;
	}

	.content_2 .item .font3 {
		width: 50%;
		margin: .2rem auto 0;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		color: #999999;
		line-height: .25rem;
		margin-top: .2rem;
	}

	.content_2 .item:last-child {
		border-right: none;
	}

	.content_3 .item:last-child,
	.content_4 .item:last-child {
		text-align: right;
	}

	.content_3_bg {
		width: 100%;
		height: 6.2rem;
		margin: 0rem 0 .4rem 0;
		background-color: #FFFFFF;
	}

	.content_4_bg {
		width: 100%;
		height: 3rem;
		margin: .8rem 0;
		background-color: #FFFFFF;
	}

	.content_4 {}

	.content_4 .item {
		width: 50%;
	}

	.content_4 .item .img2 {
		width: 6.42rem;
		height: 2.97rem;
		border-radius: .2rem;
	}

	.content_3,
	.content_4 {
		width: 70%;
		height: 6.2rem;
		margin: 0 auto;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}

	.content_3 .item {
		width: 47%;
	}

	.content_3 .item .font1,
	.content_4 .item .font1 {
		margin: .47rem 0;
		background: #6783E9;
		width: 1.3rem;
		height: .25rem;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #FFFFFF;
		line-height: .25rem;
		text-align: center;
	}

	.content_4 .item .font1 {
		width: .55rem;
		padding: .07rem;
	}

	.content_3 .item .img0 {
		vertical-align: middle;
		width: 3.77rem;
		height: 1.59rem;
	}

	.list {
		margin-top: .3rem;
	}

	.content_4 .list {
		margin-top: .25rem;
	}

	.list .text1 {
		text-align: left;
		font-size: .13rem;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #999999;
		line-height: .25rem;
	}

	.content_4 .list .text1 {
		text-align: right;
	}

	.content_3 .item .img1,
	.content_4 .item .img1 {
		vertical-align: middle;
		width: .15rem;
		height: .14rem;
		margin-right: .15rem;
	}

	.content_4 .item .img1 {
		margin-right: 0rem;
		margin-left: .15rem;
	}

	.content_3 .item .img2 {
		vertical-align: middle;
		width: 4.47rem;
		height: 6.16rem;
	}
</style>
