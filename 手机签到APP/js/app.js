/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		// 获得input数据
//		loginInfo.account = loginInfo.account || '';
//		loginInfo.password = loginInfo.password || '';
	/*	if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}*/
		
		
		// 获得数据库数据
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		var socket = io('http://tangchuan.xyz/');
		var socket = io('http://123.206.78.216');
//		var socket = io('http://10.151.212.163');
		var res = false;
		socket.emit('login',loginInfo);
			  	
		socket.on('login_return', function (data) {
			res = data.res;
//			console.log(data.res)
//			plus.nativeUI.alert(data.res, "OK" );
			if (res) {
//				console.log(true);
				localStorage.setItem('$uid',JSON.stringify(loginInfo.account));
				return owner.createState(loginInfo.account, callback);
			} else {
//				console.log(false);
				return callback('用户名或密码错误');
			}
		});
		
//		console.log(res.toString());
//		var authed = users.some(function(user) {
//			return loginInfo.account == user.account && loginInfo.password == user.password;
//		});

		
		
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		//regInfo.account = regInfo.account || '';
		//regInfo.password = regInfo.password || '';
		
		//var users = JSON.parse(localStorage.getItem('$users') || '[]');
		// users.push(regInfo);
		// localStorage.setItem('$users', JSON.stringify(users));
//		var socket = io('http://tangchuan.xyz/');
		var socket = io('http://123.206.78.216');
//		var socket = io('http://10.151.212.163');
		socket.emit('reg',regInfo);
		socket.on('reg_return',function(data){
			console.log(data.res);
		})
		
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		
	
}(mui, window.app = {}));