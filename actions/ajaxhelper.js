/**
 * Created by Totooria Hyperion on 2016/10/11.
 */
"use strict";
import * as types from '../constants/actionType';

import $ from "../lib/zepto";
import util from "../util/utility";
import constants from "../constants/constants"
import { routerActions } from "react-router-redux";

const local = "LOCAL";

let me = {};
function _send(type, url, param, ctx, successFun, errorFun, isPaging, async, isLogin) {
	return (dispatch,getState) => {
		const {authed} = getState();
		if (window.sessionStorage.DEBUG === local) {
			_loadJSONData(url,param, ctx, successFun);
			return;
		}
		if(async == undefined){
			async = true;
		}
		//登陆验证
		if (!isLogin) {
			let tokenInfojf = JSON.parse(sessionStorage.getItem("secretjf"))?JSON.parse(sessionStorage.getItem("secretjf")):{};
			if (!tokenInfojf.expires_time || (tokenInfojf.expires_time < (new Date()).getTime())) {
				//window.location = "#";
				return location.href = location.pathname;
				return dispatch({
					type:"@@router/LOCATION_CHANGE",
					payload:{
						pathname:"/",
						search:"",
						hash:"",
						state:null,
						action:"PUSH",
						key:"",
						query:{},
						$searchBase:{
							search:"",
							searchBase:""
						}
					}
				});
			} else {
				if(util.isEmptyObj(authed.userAuth)) {
					dispatch({
						type:types.LOGIN_COMPLETE,
						data:tokenInfojf
					});
				}
			}
		}
		//if (tokenInfojf && (tokenInfojf.expires_time < new Date().getTime())) {
		//	$.ajax({
		//		type: 'GET',
		//		url: 'http://' + constants.frontLogonHost + '/oauth/oauth2/token?grant_type=refresh_token&refresh_token=' + tokenInfojf.refresh_token + constants.secretjfID,
		//		async: false,
		//		dataType: 'json',
		//		success: function(data) {
		//			data.expires_time = new Date().getTime() + data.expires_in * 1000;
		//			dispatch({type:types.LOGIN_COMPLETE,data:data});
		//		},
		//		error: function() {
		//			dispatch({type:types.LOGIN_FAILED});
		//		}
		//	});
		//} else if (!tokenInfojf) {
		//	// window.location = 'login.html';
		//	dispatch(routerActions('push',{pathname:"/"}));
		//}
		//逻辑代码开始
		if (Object.prototype.toString.call(param) == "[object String]") {
			param = JSON.parse(param);
		}
		//判断传输类型
		var contentType = "application/x-www-form-urlencoded; charset=utf-8";
		if (type === "POST" || type === "PUT") {
			contentType = "application/json;charset=utf-8";
			param = JSON.stringify(param);
		}
		me.isPaging = isPaging;
		if (!isPaging)
			util.showLoading();
		$.ajax({
			type: type,
			url: url,
			data: param,
			dataType: 'json',
			timeout: 60000,
			async: async,
			contentType: contentType,
			beforeSend: function(xhr, settings) {
				//xhr.setRequestHeader("Authorization", "Bearer " + tokenInfojf.access_token);
			},
			success: function(data) {
				util.hideLoading();
				if(!data) {
					return util.showToast("服务器异常,无法获取数据!");
				}
				if (successFun && Object.prototype.toString.call(successFun) === '[object Function]')
					dispatch(successFun.apply(ctx, [data]));
			},
			error: function(xhr, type) {
				if (xhr.status === 401) {
					//window.location = "#";
					//dispatch(routerActions.push("/"));
					return location.href = location.pathname;
					return dispatch({
						type:"@@router/LOCATION_CHANGE",
						payload:{
							pathname:"/",
							search:"",
							hash:"",
							state:null,
							action:"PUSH",
							key:"",
							query:{},
							$searchBase:{
								search:"",
								searchBase:""
							}
						}
					});
				}
				util.hideLoading();
				try {
					util.showToast("错误：" + JSON.parse(xhr.responseText).message);
				}
				catch (e) {
					util.showToast("服务器出错，类型：" + type);
				}
				if (errorFun && Object.prototype.toString.call(errorFun) === '[object Function]')
					dispatch(errorFun.apply(ctx, [xhr, type]));
			}
		});
	}
}

function _loadJSONData(path,param, ctx, successFun) {
	function dealwithit(){
		successFun.apply(ctx, [window[testDataKey]]);

		//get请求释放
		var newPath= path.substr(path.lastIndexOf("/")+1);
		if(newPath.indexOf("?")>0){
			newPath = newPath.substr(0, newPath.indexOf("?"));
		}
		newPath = __dirname + "/data/" + newPath + ".json";

		//post请求释放
		// var newPath;
		// for(var key in param){
		//     newPath = "data/" + key + ".json";
		//     //只处理第一个
		//     break;
		// }

		// 始终保留
		var testDataKey="test_data_" + new Date().getTime();
		$("body").append('<script type="text/javascript">testDataKey="' + testDataKey + '"</script>');
		var script=document.createElement('script');
		script.setAttribute('type','text/javascript');
		script.setAttribute('src',newPath);
		document.body.appendChild(script);
		script.onload = dealwithit;
	}
}

export function get(url, param, ctx, successFun, errorFun, isPaging, async, isLogin) {
	return dispatch => dispatch(_send("GET",url, param, ctx, successFun, errorFun, isPaging, async, isLogin));
}
export function post(url, param, ctx, successFun, errorFun, isPaging, async, isLogin) {
	return dispatch => dispatch(_send("POST",url, param, ctx, successFun, errorFun, isPaging, async, isLogin));
}
export function put(url, param, ctx, successFun, errorFun, isPaging, async, isLogin) {
	return dispatch => dispatch(_send("PUT",url, param, ctx, successFun, errorFun, isPaging, async, isLogin));
}
export function del(url, param, ctx, successFun, errorFun, isPaging, async, isLogin) {
	return dispatch => dispatch(_send("DELETE",url, param, ctx, successFun, errorFun, isPaging, async, isLogin));
}

export default {get,post,put,del}