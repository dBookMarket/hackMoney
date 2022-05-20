<template>
	<view class="settled">
		<nav-bar></nav-bar>
		<view class="container">
			<view class="left">
				<left></left>
			</view>
			<view class="right">
				<view class="stepTitle">
					<uni-steps :options="options" :active="current" active-color="#6783E9"></uni-steps>
					<view class="stepCon" v-if="current==0">
						<view class="stepname">
							<text>Step 1: Basic Information</text>
						</view>
						<view class="title">Upload book cover (*mandatory)</view>
						<view class="upload" @click="uploadPhoto">
							<image :src="book.cover_url" mode="" class="_upimg" v-if="book.cover_url"></image>
							<image :src="book.cover" mode="" class="_upimg" v-else></image>
							<image src="/static/book/cover.svg" mode="" class="cover"></image>
						</view>
						<view class="title">Book title (*mandatory) </view>
						<input maxlength="150" type="text" v-model="book.name" class="input-style"
							placeholder="Insert book title here…" />
						<view class="title">Synopsis (*mandatory)</view>
						<textarea maxlength="1500" v-model="book.desc" class="input-style _height"
							placeholder="Insert synopsis here…"></textarea>
						<view class="title">Author (*mandatory)</view>
						<input maxlength="150" type="text" v-model="book.author_name" class="input-style"
							placeholder="Insert author’s name here…" />
						<view class="title">Author’s Bio (*mandatory)</view>
						<textarea maxlength="1500" v-model="book.author_desc" type="text" class="input-style _height"
							placeholder="Key in author’s bio here… "></textarea>
						<view class="title">Publisher (*mandatory) </view>
						<input maxlength="150" type="text" v-model="book.publisher_name" class="input-style"
							placeholder="Insert publisher name here…" />
						<view class="title">Publisher description (*optional)</view>
						<textarea maxlength="1500" v-model="book.publisher_desc" type="text" class="input-style _height"
							placeholder="Publisher description(*optional)"></textarea>
						<view class="button _btn" @click="nextStep()">
							Next Step
						</view>
					</view>
					<view class="stepCon" v-if="current==1">
						<view class="stepname">
							<text>Step 2: Upload digital book</text>
							<!-- <text class="min">（第二步）</text> -->
						</view>
						<view class="title">Upload digital book (pdf format only) </view>
						<view class="upload" @click="uploadPdf">
							<image src="/static/book/pdf.svg" class="cover" v-if="pdfName"></image>
							<image src="/static/book/cover.svg" v-else class="cover"></image>
							<view mode="" class="_pdfName" v-if="pdfName">{{pdfName}}</view>
						</view>
						<view class="title">Category (choose from list)</view>
						<view class="relative">
							<view class="input-style cursor" @click="bindCategory()">{{getCategoryName(book.category)}}</view>
							<image class="down" src="/static/book/down.svg"></image>
							<view class="selectCategory" v-if="isShowCategory">
								<view class="item" v-for="(item,index) in categoryList" :key="index" @click="categoryChange(item)" :class="{'active':book.category==item.id}">
									{{item.name}}
								</view>
							</view>
						</view>
						<view style="height: 100px;"></view>
						<view class="button _btn _marright" @click="prevStep()">
							Back
						</view>
						<view class="button _btn" @click="nextStep()">
							Next
						</view>
						
					</view>
					<view class="stepCon" v-if="current==2">
						<view class="stepname">
							<text>Step 3: Smart Settings</text>
						</view>
						<view class="title">Choose blockchain</view>
						<view class="relative">
							<view class="input-style cursor" @click="bindPickerChange()">{{chainList[index]}}</view>
							<image class="down" src="/static/book/down.svg"></image>
							<view class="selectCategory" v-if="isChainList">
								<view class="item" v-for="(item,idx) in chainList" :key="idx" @click="chainListChange(item)" :class="{'active':idx==index}">
									{{chainList[index]}}
								</view>
							</view>
						</view>
						
						<view class="title">Set quantity (circulation)</view>
						<input v-model="book.amount" type="number" class="input-style" placeholder="" />
						<view class="title">Choose cryptocurrency </view>
						<view class="relative">
							<view class="input-style cursor" @click="bindCurrencyChange()">{{currencyList[cindex]}}</view>
							<image class="down" src="/static/book/down.svg"></image>
							<view class="selectCategory" v-if="isCurrency">
								<view class="item" v-for="(item,idx) in currencyList" :key="idx" @click="currencyChange(item)" :class="{'active':idx==cindex}">
									{{currencyList[cindex]}}
								</view>
							</view>
						</view>
						
						<view class="title">Set price </view>
						<input v-model="book.price" type="number" class="input-style" placeholder="" />
						<view class="title"><text>Set royalty </text>
							<!-- <text>0% ~ 50%之间</text> -->
						</view>
						<view class="relative">
							<input type="number" v-model="book.ratio" class="input-style " placeholder="" />
							<text class="unit">%</text>
						</view>
						<view class="button _btn _marright" @click="prevStep()">
							Back
						</view>
						<view class="button _btn" @click="nextStep()">
							Next
						</view>
					</view>
					<view class="stepCon" v-if="current==3">
						<view class="stepname">
							<text>Step 4: Confirm and Upload</text>
						</view>
						<view class="title">
							Information cannot be changed after confirmation and upload. Please ensure that there are no errors before clicking on upload. 
						</view>
						<view class="title detail" @click="openDetail">Information details</view>
						<view v-if="book.status=='Uploading'">
							<view class="stepInfo" style="margin-left: 3px;">
								<!-- <uni-icons class="loading" color="#fff" type="spinner-cycle" size="22"></uni-icons> -->
								<image src="/static/book/loding.gif" class="loading"></image>
								<text class="text">File encryption - Synchronous encryption in progress, please wait</text>
							</view>
						</view>
						<view v-if="book.status=='Uploading'">
							<view class="stepInfo" style="margin-left: 3px;">
								<image src="/static/book/loding.gif" class="loading"></image>
								<text class="text">File to be uploaded</text>
							</view>
						</view>
						<view v-else-if="book.status=='Uploaded'">
							<view class="stepInfo">
								<uni-icons color="#6783E9" type="checkbox-filled" size="22"></uni-icons>
								<text class="text">File uploaded</text>
							</view>
						</view>
						<view v-else-if="book.status=='Failure'">
							<view class="stepInfo">
								<uni-icons color="#999999" type="clear" size="22"></uni-icons>
								<text class="text" style="color: #999999;">Failed to upload files</text>
							</view>
						</view>
						<view v-else-if="book.status=='Success'">
							<view class="stepInfo">
								<uni-icons color="#6783E9" type="checkbox-filled" size="22"></uni-icons>
								<text class="text">Success of the book</text>
							</view>
						</view>
						<view style="height: 180px;"></view>
						<view class="button _btn _marright" @click="prevStep()">
							Back
						</view>
						<view class="button _btn" @click="getContractsFun()" v-if="book.status=='Uploaded'">
							Publish
						</view>
						<view class="button _btn" @click="formDataIssuesFun()" v-else-if="book.status=='Failure'">
							Next
						</view>
						<view class="button _btn" @click="createIssuesFun()" v-else-if="!book.status && !book.id">
							Next
						</view>
					</view>
				</view>

			</view>
		</view>
		<uni-popup ref="detailPopup" type="center" :mask-click="false">
			<view class="detailInfo">
				<view class="title">
					Listing Information Details
				</view>
				<image class="closeimg" @click="close('buy')" src="/static/book/close.svg"></image>
				<view class="contitle">Book cover</view>
				<image class="coverimg" :src="book.cover_url"></image>
				<view class="contitle">Book title</view>
				<input type="text" v-model="book.name" class="input-style" placeholder="" />
				<view class="contitle">Synopsis</view>
				<textarea v-model="book.desc" class="input-style _height" placeholder=""></textarea>
				<view class="contitle">Author</view>
				<input type="text" v-model="book.author_name" class="input-style" placeholder="" />
				<view class="contitle">Author’s Bio</view>
				<textarea v-model="book.author_desc" type="text" class="input-style _height"
					placeholder=""></textarea>
				<view class="contitle">Publisher</view>
				<input type="text" v-model="book.publisher_name" class="input-style" placeholder="" />
				<view class="contitle">Publisher description</view>
				<textarea v-model="book.publisher_desc" class="input-style _height"
					placeholder=""></textarea>
				<view class="contitle">Choose blockchain</view>
				<input type="text" class="input-style" value="Polygon" placeholder="" />
				<view class="contitle">Set quantity</view>
				<input type="text" v-model="book.amount" class="input-style" />
				<view class="contitle">Choose cryptocurrency</view>
				<input type="text" class="input-style" value="USTD" />
				<view class="contitle">Set price</view>
				<input type="text" v-model="book.price" class="input-style" />
				<view class="contitle">Set royalty</view>
				<input type="text" v-model="book.ratio" class="input-style" />
				<view class="between"></view>
			</view>
		</uni-popup>
		<uni-popup ref="putPopup" type="center" :mask-click="false">
			<view class="deal">
				<image class="img1" src="/static/book/onShelf.svg"></image>
				<view>On the shelf</view>
			</view>
		</uni-popup>
		<uni-popup ref="succussPopup" type="center">
			<view class="deal">
				<image class="img2" src="/static/book/shelf.svg"></image>
				<view>On a successful</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getCategories,
		getIssuesCurrent,
		postContracts,
		putIssuesTrade,
		formDataIssues
	} from '@/common/api.js';
	import common from '@/common/common.js';
	import navBar from '@/components/nav.vue';
	import left from '@/components/left.vue';
	import wallet from '@/common/wallet.js';
	import web from '@/common/web.js';
	export default {
		components: {
			navBar,
			left
		},
		data() {
			return {
				index: 0,
				cindex: 0,
				chainList: ['Polygon'], //网络暂时只支持polygon
				currencyList: ['USDC'], //货币只支持USDC
				categoryList: [],
				book: {
					cover: '', //书籍封面
					cover_url: '', //书籍修改
					name: '', //书籍名称
					desc: '', //书籍描述
					author_name: '', //作者名称
					author_desc: '', //作者描述
					publisher_name: '', //出版商名称
					publisher_desc: '', //出版商描述
					amount: '', //发行数量
					price: '', //发行单价
					ratio: '', //出版商版税比例
					number: '', //issue no
					category: 0, //书籍类别
					file: '', //书籍文件
				},
				pdfName: '',
				current: 0,
				isShowCategory:false,
				isChainList:false,
				isCurrency:false,
				options: [{
					title: 'Info'
				}, {
					title: 'Upload'
				}, {
					title: 'Price & Royalty'
				}, {
					title: 'Submit'
				}],

			};
		},
		filters: {
			
		},
		onLoad(option) {
			let that = this;
			let address = common.getStorage('address');
			let token = common.getStorage('token');
			if(address && token){
				that.getCategoryList();
				that.getIssuesCurrentFun();
			}else{
				common.setStorage('currentPage','/pages/index/settled');
				common.showModal('please connect wallet');
			}
		},
		methods: {
			/**
			 * 左边书籍分类的数据
			 */
			getCategoryList(){
				let that = this;
				common.showLoading();
				let params = {}
				getCategories(params).then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						that.categoryList = data;
						common.setStorage("categories", that.categoryList);
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
			 * 上架
			 * 
			 * 我调用合约wallet.issue()生成书籍合约  => 
			 * 在调用合约post请求到contracts api，生成合约记录=> 
			 * 调用trade上架 
			 */
			putOn(amount, contractAddr, issueId) {
				let that = this;
				that.$refs.putPopup.open();
				let params = {
					issue: issueId,
					address: contractAddr, // 合约ERC1155的地址？
					token_amount: amount,
					token_creteria: "ERC-1155", //代币标准
					block_chain: that.chainList[0]
				}
				putIssuesTrade(issueId, params).then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let tradeData = res.data;
						if (tradeData.status == "Success") {
							that.dealSuccuss(); //提示上架成功
							// 上架成功，跳转到详情页
							let inerval = setInterval(function() {
								//清空定时器
								clearInterval(inerval);
								uni.navigateTo({
									url: '/pages/index/detail?id=' + issueId
								})
							}, 3000)
							//common.removeStorage('stepcontent');
							//common.removeStorage('current');
							//that.getContractsFun(data);
						}
					} else {
						common.showModal(res);
					}
				}).catch(error => {
					common.showModal(error);
				}).finally(() => {

				})
			},
			/**
			 * @param {Object} data
			 */
			async getContractsFun(){
				let that = this;
				let data = that.book;
				common.showLoading();
				//获取判断是否连接
				let provider = await wallet.connect();
				if (provider) {
					let signer = await wallet.getSigner(provider);
					if (signer) {
						let issueJson = await wallet.approveIssue(signer);
						console.log(issueJson);
						if(issueJson && issueJson.status == 1){
							let nftId = data.id; //the issue id
							let amount = parseInt(data.amount); //买入的数量
							//hex,metainfo 原数据，一个json数据可以存nft的相关数据，需要转成十六进制 
							let metadata = common.strToHexCharCode(JSON.stringify(data));
							let price = parseFloat(data.price); //买入的价格
							let ratio = parseFloat(data.ratio); //出版商版税比例
							let contractTxn = await wallet.issue(signer, nftId, amount, metadata, price, ratio);
							console.log(contractTxn);
							if(contractTxn==null || contractTxn.status != 1) {
								common.showModal('smart contract error, please try again');
								common.hideLoading(0);
								return;
							}
							const contractAddr = wallet.getNFTContractAddress(); // contractTxn.contractAddress is null???
							that.putOn(amount, contractAddr, data.id);
							common.hideLoading(0);
						}else{
							common.showModal('transaction error, please try again');
							common.hideLoading(0);
						}
					}
				}
			},
			/**
			 * 发布流程:
			 * Step 1，获取前端返回的数据，校验数据的合法性
			 * Step 2，校验成功后，生成一条记录并返回数据到前端
			 * Step 3，前端拿到数据后，连接用户钱包获取用户授权并调用合约生成书籍合约 
			 * Step 4，调用合约api，生成合约记录
			 */
			createIssuesFun() {
				let that = this;
				let baseURL = web.host;
				let url = baseURL + '/api/v1/issues';
				common.showLoading();
				const uploadTask = uni.uploadFile({
					url: url,
					header: {
						authorization: "Bearer " + common.getStorage('token')
					},
					files: [{
						'name': 'cover',
						'uri': that.book.cover
					}, {
						'name': 'file',
						'uri': that.book.file
					}],
					formData: {
						//cover: that.book.cover, //书籍封面
						name: that.book.name, //书籍名称
						desc: that.book.desc, //书籍描述
						author_name: that.book.author_name, //作者名称
						author_desc: that.book.author_desc, //作者描述
						publisher_name: that.book.publisher_name, //出版商名称
						publisher_desc: that.book.publisher_desc, //出版商描述
						amount: that.book.amount, //发行数量
						price: that.book.price, //发行单价
						ratio: that.book.ratio, //出版商版税比例
						category: that.book.category, //书籍类别
						//file: that.book.file //书籍文件
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes);
						common.hideLoading();
						console.log(uploadFileRes.data);
						let data = JSON.parse(uploadFileRes.data);
						if (uploadFileRes && uploadFileRes.statusCode == 201) {
							if (data) {
								that.book = data;
								that.book.publisher_name = data.publisher.name;
								that.book.publisher_desc = data.publisher.desc;
								let inerval = setInterval(function() {
									that.getIssuesCurrentFun(inerval);
								}, 120000)
							}
						} else {
							data = JSON.stringify(data);
							common.showModal(data);
						}
					},
					fail: (res) => {
						common.hideLoading();
						common.showModal(res);
					}
				});
				uploadTask.onProgressUpdate((res) => {
					console.log('progress:' + res.progress);
					console.log('totalBytesSent:' + res.totalBytesSent);
					console.log('totalBytesExpectedToSend:' + res.totalBytesExpectedToSend);
				});
			},
			/**
			 * 修改书籍流程:
			 * Step 1，获取前端修改返回的数据，校验数据的合法性
			 * Step 2，校验成功后，生成一条记录并返回数据到前端
			 * Step 3，前端拿到数据后，连接用户钱包获取用户授权并调用合约生成书籍合约 
			 * Step 4，调用合约api，生成合约记录
			 */
			formDataIssuesFun() {
				let that = this;
				common.showLoading();
				let formData = new FormData();
				that.book.cover && formData.append("cover", that.book.cover); //书籍封面
				formData.append("name", that.book.name); //书籍名称
				formData.append("desc", that.book.desc); //书籍描述
				formData.append("author_name", that.book.author_name); //作者名称
				formData.append("author_desc", that.book.author_desc); //作者描述
				formData.append("publisher_name", that.book.publisher_name); //出版商名称
				formData.append("publisher_desc", that.book.publisher_desc); //出版商描述
				formData.append("amount", that.book.amount); //发行数量
				formData.append("price", that.book.price); //发行单价
				formData.append("ratio", that.book.ratio); //出版商版税比例
				formData.append("category", that.book.category); //书籍类别
				that.book.file && formData.append("file", that.book.file); //书籍文件
				var xhr = new XMLHttpRequest();
				let baseURL = web.host;
				let url = baseURL + '/api/v1/issues/' + that.book.id;
				xhr.open('PATCH', url, true);
				//回调
				xhr.onreadystatechange = function() {
					uni.hideLoading();
					console.log(xhr);
					if (xhr.readyState == 4 && xhr.status == 200) {
						let data = JSON.parse(xhr.responseText);
						console.log(data);
						if (data) {
							that.book = data;
							that.current = 3;
							that.book.publisher_name = data.publisher.name;
							that.book.publisher_desc = data.publisher.desc;
							let inerval = setInterval(function() {
								that.getIssuesCurrentFun(inerval);
							}, 120000)
						}
					} else {
						console.log(xhr.responseText);
						if(typeof(xhr.responseText) === 'string'){
							//common.showModal(xhr.responseText);
						}
					}
				}
				//设置token
				xhr.setRequestHeader("authorization", "Bearer " + common.getStorage('token') || '');
				//将formdata上传
				xhr.send(formData);
			},
			/**
			 * 查询当前上传issues的状态 status，"Uploading", "Uploaded", "Failure", "Success”
			 */
			getIssuesCurrentFun(inerval) {
				let that = this;
				common.showLoading();
				getIssuesCurrent().then(res => {
					console.log(res);
					if (res && res.statusCode === 200) {
						let data = res.data;
						if (data && data.id) {
							that.book = data;
							that.current = 3;
							that.book.publisher_name = data.publisher.name;
							that.book.publisher_desc = data.publisher.desc;
							if(that.book.status == 'Uploaded' || that.book.status == 'Failure'){
								//上传成功和失败都清空定时器
								clearInterval(inerval);
							}
						}
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
			 * 获取分类名称
			 * @param {Object} type
			 */
			getCategoryName: function(type) {
				let that = this;
				let categoryName = "Category (choose from list)";
				if(that.categoryList.length ==0){
					let categories = common.getStorage('categories');
					if (categories && categories.length > 0 ) {
						that.categoryList = categories;
					} 
				}
				for (let a = 0; a < that.categoryList.length; a++) {
					if (that.categoryList[a].id == type) {
						categoryName = that.categoryList[a].name;
						break;
					}
				}
				return categoryName; //书籍分类
			},
			/**
			 * 创建contracts合约
			 */
			postContractsFun(issue) {
				let that = this;
				let params = {
					issue: issue.id,
					address: issue.address,
					token: common.getStorage('token'),
					token_amount: 1,
					token_creteria: issue.token_creteria, //代币标准
					block_chain: that.chainList[0]
				}
				common.showLoading();
				postContracts(issue).then(res => {
					console.log(res);
					if (res && (res.statusCode === 200 || res.statusCode === 201)) {
						let data = res.data;
						
					} else {
						common.showModal(res);
					}
				}).catch(error => {
					common.showModal(error);
				}).finally(() => {
					common.hideLoading(0);
				})
			},
			/**绑定学历
			 * @param {Object} e 获取的是下标 从0开始
			 * 4硕士及以上3本科2大专1中专/高中其他0其他
			 */
			bindEducationChange: function(e, item) {
				var that = this;
				var targetIndex = e.target.value + "";
				for (var a = 0; a < that.educationList.length; a++) {
					if (targetIndex == a) {
						item.EDUCATION = that.educationList[a].value;
						item.eduindex = targetIndex;
						break;
					}
				}
			},
			/**
			 * 绑定书籍分类
			 * @param {Object} item
			 */
			categoryChange(item){
				let that = this;
				that.book.category = item.id;
				that.book.categoryName = item.name;
				that.isShowCategory = false;
			},
			/**
			 * 选择区块链
			 * @param {Object} item
			 */
			chainListChange(item){
				let that = this;
				that.isChainList = false;
			},
			/**
			 * 设置数字货币
			 */
			currencyChange(){
				let that = this;
				that.isCurrency = false;
			},
			/**
			 * 书籍分类弹框
			 */
			bindCategory(){
				let that = this;
				if(that.isShowCategory){
					that.isShowCategory = false;
				}else{
					that.isShowCategory = true;
				}
			},
			/**
			 * @param {Object} e
			 * 选择区块链
			 */
			bindPickerChange: function() {
				let that = this;
				if(that.isChainList){
					that.isChainList = false;
				}else{
					that.isChainList = true;
				}
			},
			/**
			 * 设置数字货币
			 * @param {Object} e
			 */
			bindCurrencyChange: function(e) {
				let that = this;
				if(that.isCurrency){
					that.isCurrency = false;
				}else{
					that.isCurrency = true;
				}
			},
			/**
			 * 上一步
			 */
			prevStep() {
				let that = this;
				if (that.current > 0) {
					that.current = that.current - 1;
				}
			},
			/**
			 * 检查第一步填写信息
			 */
			checkFirstStep() {
				let that = this;
				if (!that.book.cover_url&&!that.book.cover) {
					return 'please upload book cover';
				} else if (!that.book.name) {
					return 'please key in book title';
				} else if (!that.book.desc) {
					return 'please key in author bio';
				} else if (!that.book.author_name) {
					return 'please key in author name';
				} else if (!that.book.author_desc) {
					return 'please key in author description';
				} else if (!that.book.publisher_name) {
					return 'please key in publisher name';
				} else {
					return null;
				}
			},
			/**
			 * 检查第二步填写信息
			 */
			checkSecondStep() {
				let that = this;
				//新增
				if (!that.book.id) {
					if (!that.book.file) {
						return 'please upload digital book in pdf format';
					}
				}
				if (!that.book.category) {
					return 'please choose book category';
				}
				return null;
			},
			/**
			 * 检查第三步填写信息
			 */
			checkThirdStep() {
				let that = this;
				if (!that.book.amount) {
					return 'please key in quantity to publish';
				} else if (!that.book.price) {
					return 'please key in price';
				} else if (!that.book.ratio) {
					return 'please key in royalty';
				}
				if (that.book.ratio) {
					if (parseInt(that.book.ratio) < 0 || parseInt(that.book.ratio) >50 ) {
						return 'please key in royalty between 0-50%';
					}
				} 
				return null;
			},
			/**
			 * 下一步
			 */
			nextStep() {
				let that = this;
				let returnMsg = null;
				if (that.current == 0) {
					//第一步
					returnMsg = that.checkFirstStep();
					if (returnMsg) {
						common.showModal(returnMsg);
						return false;
					}
				} else if (that.current == 1) {
					//第二步
					returnMsg = that.checkSecondStep();
					if (returnMsg) {
						common.showModal(returnMsg);
						return false;
					}
				} else if (that.current == 2) {
					//第二步
					returnMsg = that.checkThirdStep();
					if (returnMsg) {
						common.showModal(returnMsg);
						return false;
					}
				}
				that.current = that.current + 1;
				//common.setStorage("current", that.current);
				//common.setStorage("stepcontent", that.book);
			},
			/**
			 * 信息详细
			 */
			openDetail() {
				this.$refs.detailPopup.open()
			},
			/**
			 * 关闭
			 */
			close(type) {
				let that = this;
				that.$refs.detailPopup.close()
			},

			/**
			 * 交易成功
			 */
			dealSuccuss() {
				let that = this;
				that.$refs.putPopup.close();
				that.$refs.succussPopup.open();
			},
			/**
			 * 上传图片
			 */
			uploadPhoto() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						console.log(chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						if (that.book.id) {
							that.book.cover = chooseImageRes.tempFiles[0];
						} else {
							that.book.cover = tempFilePaths[0];
						}
						that.book.cover_url = tempFilePaths[0];
					}
				});
			},
			/**
			 * 上传pdf
			 */
			uploadPdf() {
				let that = this;
				uni.chooseFile({
					count: 1, //默认100
					extension: ['.pdf'],
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(res);
						if (that.book.id) {
							that.book.file = res.tempFiles[0];
						} else {
							that.book.file = tempFilePaths[0];
						}
						that.pdfName = res.tempFiles[0].name;
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.pages-index-settled{
		background: #F6F6F6;
	}
	.settled {
		width: 100%;
		margin: 0 auto;
		min-width: 1440px;
		background-color: #F6F6F6;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;

		.detailInfo {
			width: 5.5rem;
			height: 6.2rem;
			overflow-y: scroll;
			background: #FFFFFF;
			border-radius: .15rem;
			padding: .2rem .15rem;
			position: relative;
			text-align: center;

			.between {
				color: #999999;
				padding-top: .1rem;
				text-align: right;
				width: 95%;
			}

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

			.coverimg {
				width: 1.1rem;
				height: 1.4rem;
				border-radius: .1rem;
				display: block;
			}

			.contitle {
				color: #999999;
				font-size: 30rpx;
				margin: .15rem 0;
				text-align: left;
			}

			.input-style {
				width: 95%;
				font-size: 30rpx;
				background: #F8F8F8;
				border-radius: .1rem;
				height: .5rem;
				text-align: left;
				line-height: .5rem;
				text-indent: .1rem;
			}
			._height {
				height: .9rem;
				line-height: .3rem;
				overflow-y: scroll;
			}
		}

		.container {
			.right {
				.stepTitle {
					width: 100%;
					height: .65rem;
					padding-top: .25rem;
					background: #FFFFFF;
					border-radius: .15rem;
				}

				.stepCon {
					width: 97%;
					height: auto;
					min-height: 5.5rem;
					margin-top: .25rem;
					margin-bottom: .25rem;
					background: #FFFFFF;
					border-radius: .15rem;
					padding-left: 3%;
					padding-top: .2rem;

					.button {
						margin-bottom: .25rem;
						margin-top: .25rem;
						text-align: center;
					}

					._btn {
						width: 1.1rem;
						height: .45rem;
						background: #6783E9;
						border: 1px solid #6783E9;
						border-radius: .24rem;
						color: #FFFFFF;
						line-height: .45rem;
					}

					._marright {
						margin-right: .5rem;
						background: #FFFFFF;
						color: #6783E9;
						border: 1px solid #6783E9;
					}

					.upload {
						width: 1.2rem;
						height: 1.4rem;
						background: #F8F8F8;
						border-radius: .1rem;
						text-align: center;
						margin-top: .18rem;
						cursor: pointer;
						position: relative;

						.cover {
							width: .5rem;
							height: .5rem;
							margin-top: 0.4rem;
						}

						._upimg {
							width: 1.2rem;
							height: 1.4rem;
							border-radius: 0.1rem;
							position: absolute;
							z-index: 10;
							left: 0;
						}
					}

					.relative {
						position: relative;

						.unit {
							position: absolute;
							left: 77%;
							top: 0.16rem;
							color: #999999;
						}
					}

					.stepname {
						font-size: 36rpx;
						color: #000000;

						.min {
							color: #999999;
						}
					}

					.stepInfo {
						line-height: 80rpx;
						font-size: 30rpx;
						color: #6783E9;

						.text {
							padding-left: 30rpx;
							vertical-align: top;
						}

						.loading {
							color: #ffffff;
							/* background: #999999;
							border-radius: 50%; */
							vertical-align: middle;
							width: 24px;
							height: 24px;
						}
					}

					.flex {
						display: flex;
						justify-content: space-between;
					}

					.title {
						color: #999999;
						font-size: 30rpx;
						margin-top: .25rem;
						margin-bottom: .18rem;
					}

					.detail {
						color: #6783E9;
						cursor: pointer;
					}
					.cursor{
						cursor: pointer;
					}
					.input-style {
						width: 80%;
						font-size: 30rpx;
						background: #F8F8F8;
						border-radius: .1rem;
						height: .5rem;
						line-height: .5rem;
						text-indent: .1rem;
					}
					.relative{
						position: relative;
					}
					.down{
						position: absolute;
						right: 21%;
						top: .17rem;
						width: .16rem;
						height: .18rem;
						vertical-align: middle;
					}
					.selectCategory{
						width: 80%;
						font-size: 30rpx;
						border-radius: .1rem;
						height: auto;
						box-shadow: 2px 0px 16px 0px rgba(86, 86, 86, 0.22);
						text-align: left;
						text-indent: .1rem;
						background: #ffffff;
						border: 1px solid #F8F8F8;
						position: absolute;
						top: .6rem;
						left: 0;
						z-index: 100;
						display: flex;
						flex-wrap:wrap;
						.item{
							padding: 0 .1rem;
							height: .35rem;
							text-align: center;
							border-radius: .05rem;
							line-height: .35rem;
							background: #F8F8F8;
							color: #404040;
							cursor: pointer;
							margin: 0.15rem 0 0.15rem 0.3rem;
						}
						.active{
							color:#6783E9;
							background: #EDF1FF;
						}
					}
					._height {
						height: .9rem;
						line-height: .3rem;
						overflow-y: scroll;
					}
				}
			}
		}
	}
</style>
