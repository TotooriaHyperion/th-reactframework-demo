/**
 * Created by Totooria Hyperion on 2016/10/11.
 */
"use strict";

import * as types from '../constants/actionType';

import constants from "../constants/constants";
import util from "../util/utility";
import { routerActions } from  "react-router-redux";

export function doLogin(userName,pwd,routerContext) {
	return (dispatch,getState) => {
		dispatch({type:types.DO_LOGIN});
		let admin = getState().authed.admin;
		let users = getState().authed.user;
		if (admin[userName] == pwd) {
			window.sessionStorage.setItem('authed',JSON.stringify({
				userName:userName,
				userType:'Admin',
				expires_time:new Date().getTime() + 8*60*60*1000
			}));
			dispatch({type:types.LOGIN_COMPLETE,data:{
				userName:userName,
				userType:'Admin'
			}});
			routerContext.router.push('/admin/user_manage');
		} else if (users[userName] == pwd) {
			window.sessionStorage.setItem('authed',JSON.stringify({
				userName:userName,
				userType:'User',
				expires_time:new Date().getTime() + 8*60*60*1000
			}));
			dispatch({type:types.LOGIN_COMPLETE,data:{
				userName:userName,
				userType:'User'
			}});
			routerContext.router.push('/user/form_demo');
		} else {
			util.showToast('Username or password wrong/用户名或密码错误！');
		}
	};
}

//function getQiniuToken(callback) {
//	return (dispatch,getState) => {
//		let { qiniuToken,gettingToken,newToken } = getState().authed;
//		if ((!qiniuToken && !gettingToken) || !newToken) {
//			dispatch({type:types.GETTING_QINIU_TOKEN});
//			var param2 = {
//				"backend.common.getCdnToken": {
//					"bucketName": ""
//				}
//			};
//			 //param2 = util.md5SolveAndroid(param2);
//			return dispatch(ajaxhelper.put("http://" + constants.orderJSHost + "apiclient/common",param2,
//				null, getQiniuTokenSuccess.bind(null,callback)));
//			//return dispatch(ajaxhelper.get("http://" + window.frontJSHost + "/api/v1/exchange/activity/getCdnToken?paramStr=" + JSON.stringify(param2),
//			//	null, this, getQiniuTokenSuccess));
//		}
//	}
//}
//
//function getQiniuTokenSuccess(callback,data) {
//	return dispatch => {
//		let _data = data["backend.common.getCdnToken"];
//		if (_data.isSuccess) {
//			dispatch({
//				type:types.GET_QINIU_TOKEN,
//				qiniuToken:_data.results.uptoken
//			});
//			(callback instanceof Function) && callback();
//		} else {
//			util.showToast('获取七牛token失败,文件上传功能无法使用');
//		}
//	}
//}

export function EditUser(data) {
	return (dispatch,getState) => {
		if (getState().authed.currentUser.userType != "Admin") {
			return util.showToast("You don't have authority to do so");
		}
		dispatch({type:types.EDIT_USER,data});
	}
}

export function DeleteUser(data) {
	return (dispatch,getState) => {
		if (getState().authed.currentUser.userType != "Admin") {
			return util.showToast("You don't have authority to do so");
		}
		dispatch({type:types.DELETE_USER,data});
	}
}

export default {
	doLogin,
	DeleteUser,
	//getQiniuToken,
	EditUser };