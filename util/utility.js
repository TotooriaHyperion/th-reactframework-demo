/**
 * Created by Totooria Hyperion on 2016/8/11.
 */

"use strict";

//function getMap(path,fn) {
//	fetch(path, {method: "GET"}).then(function (res) {
//		res.json().then(fn)
//	});
//}

import $ from '../lib/zepto';
import md5 from './MD5';
import { Component } from "react";

String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
};
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
};
JSON.stringifyForCircular = function stringifyForCircular(obj) {
	//console.log(obj);
	function censor(censor) {
		var i = 0;
		return function(key, value) {
			if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
				return '[Circular]';
			if(value instanceof HTMLElement)
				return  '[Circular]';
			if(value instanceof Component)
				return '[Circular]';
			++i;
			return value;
		}
	}
	return JSON.stringify(obj,censor(obj));
};

////toast
$("body").append('<div id="i_toast_mask" class="toast_mask"></div>');
$("body").append('<div id="i_toast_content" class="toast_content"></div>');
//loading
$("body").append('<div id="i_loading_mask" class="loading_mask"></div>');
$("body").append('<div id="i_loading_content" class="loading_content">' +
	'<div class="loading_icon"><div class="busyIcon"><div class="container">' +
	'<div class="spinner"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></div></div></div>')

var Utility = {
	pageSize: 20,
	ak: "p1r1giyFfiNu61QOBm69uyFh",
	getQueryParameter: function (name) {
		return this.props.location.query[name];
	},
	hasClass: function (obj,cln) {
		return obj.className.match(new RegExp('(\\s|^)'+cln+'(\\s|$)'));
	},
	showToast: function (msg,callback) {
		$("#i_toast_mask").css("display", "block");
		$("#i_toast_content").css("display", "block").text(msg);
		setTimeout(function () {
			$("#i_toast_mask").css("display", "none");
			$("#i_toast_content").css("display", "none");
			if (callback && Object.prototype.toString.call(callback) === '[object Function]')
				callback.apply();
		}, 1500);
	},
	showLoading: function () {
		$("#i_loading_mask").css("display", "block");
		$("#i_loading_content").css("display", "block");
	},
	hideLoading: function () {
		$("#i_loading_mask").css("display", "none");
		$("#i_loading_content").css("display", "none");
	},
	oneDepthCopy: function (obj) {
		return Object.assign({},obj);
	},
	deepCopy: function (obj) {
		//const ignore = ["[object Number]","[object String]","[object Boolean]","[object Null]","[object Undefined]"];
		//let ret = {};
		//for(let key in obj) {
		//	if(ignore.findIndex(function(item){return item == Object.prototype.toString.call(obj[key])}) == -1) {
		//		ret[key] = this.deepCopy(obj[key]);
		//	} else {
		//		ret[key] = obj[key];
		//	}
		//}
		//return ret;
		//if (Object.prototype.toString.call(obj[key]) == '[object Array]') {
		//	return [].concat(obj);
		//} else {
		//	return Object.assign({},obj)
		//}
		return JSON.parse(JSON.stringifyForCircular(obj));
	},
	isEmptyObj: function (obj) {
		let count = 0;
		for (let key in obj) {
			count++;
		}
		return (count == 0) ? true : false;
	},
	getBrowserVersion: function () {
		var u = navigator.userAgent.toLowerCase();
		return {
			//浏览器版本判断
			isWeiXin: u.indexOf("micromessenger") >= 0,
			isUC: u.indexOf('ucbrowser') >= 0,
			isQQ: u.indexOf('qqbrowser') >= 0,
			isSafari: !!u.match(/.*version\/([\w.]+).*(safari).*/),
			isChrome: !!u.match(/.*(chrome)\/([\w.]+).*/),
			isOpera: !!u.match(/(opera).+version\/([\w.]+)/),
			//移动端判断
			isMobile: !!u.match(/applewebkit.*mobile.*/),
			//操作系统判断
			isIos: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
			isAndroid: u.indexOf('android') > -1,
		}
	},
	saveData: function (key, value) {
		if ((value != null) && (value != undefined)) {
			window.localStorage[key] = value;
		}
	},
	getData: function (key) {
		return window.localStorage[key];
	},
	saveDataSe: function (key, value) {
		if ((value != null) && (value != undefined)) {
			window.sessionStorage[key] = value;
		}
	},
	getDataSe: function (key) {
		return window.sessionStorage[key];
	},
	saveDataOne: function(key,value) {
		if ((value == null) || (value == undefined)) {
			return;
		}
		if (!window.localStorage["thSetting"]) {
			window.localStorage["thSetting"] = JSON.stringify({});
		}
		var params = JSON.parse(window.localStorage["thSetting"]);
		if (!params[this.getLastPath()]) {
			params[this.getLastPath()] = {};
		}
		params[this.getLastPath()][key] = value;
		window.localStorage["thSetting"] = JSON.stringify(params);
	},
	getDataOne: function(key) {
		var params = JSON.parse(window.localStorage["thSetting"]);
		if (params[this.getLastPath()]) {
			return params[this.getLastPath()][key];
		} else {
			return null;
		}
	},
	dateFormat: function (fmt) {
		var a = new Date();
		var o = {
			"M+": a.getMonth() + 1, //月份
			"d+": a.getDate(), //日
			"h+": a.getHours(), //小时
			"m+": a.getMinutes(), //分
			"s+": a.getSeconds(), //秒
			"q+": Math.floor((a.getMonth() + 3) / 3), //季度
			"S": a.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
		return fmt;
	},
	getManageId: function () {
		var userInfojf = JSON.parse(localStorage.getItem("userInfojf"));
		return userInfojf ? userInfojf.exchangeManage.id : "";
	},
	getManageName: function () {
		var userInfojf = JSON.parse(localStorage.getItem("userInfojf"));
		return userInfojf ? userInfojf.exchangeManage.employee.name : "";
	},
	getCode: function () {
		var userInfojf = JSON.parse(localStorage.getItem("userInfojf"));
		return userInfojf ? userInfojf.exchangeManage.duty.code : "";
	},
	getJson: function (res) {
		return '{"' + res.replace(/=/g, '":"').replace(/&/g, '","') + '"}';
	},
	getAccessToken: function () {
		var tokenInfojf = JSON.parse(localStorage.getItem("secretjf"));
		if (tokenInfojf) {
			return tokenInfojf.access_token;
		}
		return "";
	},
	loadJS: function (file) {
		var jsElm = document.createElement("script");
		jsElm.type = "application/javascript";
		jsElm.src = file;
		document.body.appendChild(jsElm);
	},
	md5SolveAndroid: function (param) {
		for(var key in param){
			var paramArry = new Array();
			param[key]["apiKey"] = "android_client";
			for(var subKey in param[key]){
				if(Object.prototype.toString.call(param[key][subKey]) == "[object Object]"){
					param[key][subKey] = JSON.stringify(param[key][subKey]);
				}
				if(!!param[key][subKey]){
					paramArry.push(subKey + "=" + param[key][subKey]);
				}
			}
		}
		var str = paramArry.sort().join('&') + "&" + key + "&5b2e1c483b4cf67c87399e1de4554cf9";
		var md5Key = md5(str);
		param[key]["token"] = md5Key;
		return param;
	},
	isPropsEqual(props,nexrProps,exception) {
		let keys = [];
		for(let key in props) {
			if (exception.findIndex(function (item) {
					return item == key;
				}) == -1) {
				keys.push(key);
			}
		}
		return (keys.findIndex(function (item) {
			return JSON.stringify(props[item]) != JSON.stringify(nexrProps[item]);
		}) == -1);
	},
	fillZero:function(n){
		if (!isNaN(parseInt(n))) {
			return n>=10 ? n : "0"+parseInt(n);
		} else {
			throw '参数应该是数字';
		}
	}
};

export default Utility;