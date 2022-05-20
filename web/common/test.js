connectWeb3: async function() {
  	// 判断链对不，链不对就请求切换网络，或者添加网络，
  	if (window.ethereum) {
  		try {
  			await (window.ethereum as any).request({
  				method: 'wallet_switchEthereumChain',
  				params: [{
  					chainId: Web3.utils.numberToHex(56) // 目标链ID
  				}]
  			})
  		} catch (e) {
  			if ((e as any).code === 4902) {
  				try {
  					await (window.ethereum as any).request({
  						method: 'wallet_addEthereumChain',
  						params: [{
  							chainId: Web3.utils.numberToHex(56), // 目标链ID
  							chainName: 'Binance Smart Chain Mainnet',
  							nativeCurrency: {
  								name: 'bnb',
  								symbol: 'bnb',
  								decimals: 18
  							},
  							rpcUrls: ['https://bsc-dataseed.binance.org'], // 节点
  							blockExplorerUrls: ['https://www.bscscan.com']
  						}]
  					})
  				} catch (ee) {
  					//
  				}
  			} else if ((e as any).code === 4001) return
  		}
  	}


  	// 监听账户变化
  	const func: Function = async function(accounts) {
  		_this.account = accounts[0];
  		if (_this.isConnect) {
  			console.log("Contract Account Changed");
  			_this.init(); // 清空数据
  			_this.connectWeb3(); // 链变化，然后重新调用此方法，连接web3
  		}
  	};
  	let web3Provider: any = null;
  	if (window.ethereum) {
  		(window.ethereum as any).autoRefreshOnNetworkChange = false;
  		(window.ethereum as any).on("accountsChanged", func);
  		// 监听链id变化
  		(window.ethereum as any).on("chainChanged", (chainId1) => {
  			console.log("Chain Changed");
  			_this.chainId = chainId1;
  			func([_this.account]);
  		});
  		web3Provider = window.ethereum;
  		try {
  			await (window.ethereum as any).enable();
  		} catch (error) {
  			console.error("User denied account access");
  		}
  	} else if (window.web3) {
  		web3Provider = window.web3.currentProvider;
  	} else {
  		web3Provider = new
  		Web3.providers.HttpProvider(ChainLink[TargetChainId.toString()]); // 连接rpc网络
  	}
  	_this.web3 = new Web3(web3Provider);
  	_this.web3.eth.getAccounts(function(error, result) {
  		if (!error) console.log(result);
  	});
  	_this.isConnect = true;
  	_this.account = (window.ethereum as any).selectedAddress || null;
  	_this.chainId = (window.ethereum as any).networkVersion || null;
  	if (_this.chainId != TargetChainId) return; // 链不对,就不去连接合约了
  	if (_this.account) {
  		const time = Math.round(new Date().valueOf() / 1000);
  		// 签名
  		_this.web3.eth.personal.sign("Sign this message to login Game." + time, _this.account)
  			.then((res) => {
  				_this.signature = res + "|" + time;
  			});
  		_this.connectContract(); // 连接合约
  	}
  	return _this.account;
  }
