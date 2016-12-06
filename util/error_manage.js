/**
 * Created by Totooria Hyperion on 2016/8/30.
 */

"use strict";

//import ajaxhelper from "../actions/ajaxhelper";
//
//function errorManage(errorMessage) {
//	window.errs = arguments;
//	window.err = errorMessage;
//	console.log(err);
//	let xhr = errorMessage.error.xhr || {};
//	let errstack = errorMessage.error.stack;
//	errstack = errstack.split("\n");
//	let lastErrFileName = errorMessage.filename;
//	let errMes = {
//		lastErr: {
//			filename: lastErrFileName.slice(lastErrFileName.lastIndexOf('/') + 1),
//			lineno: errorMessage.lineno,
//			colno: errorMessage.colno
//		},
//		userAgent: window.agent,
//		message: errstack.message,
//		compName: errorMessage.error.compName,
//		errStack:errstack,
//		xhr:{
//			...xhr,
//			status:xhr.status,
//			statusText:xhr.statusText,
//			withCredentials:xhr.withCredentials
//		}
//	};
//	console.log(errMes);
//	ajaxhelper.post("http://localhost:30010/error",errMes, function (data) {
//		console.log(data);
//	});
//	//window.fetch("http://localhost:30010/error", {
//	//	method: "POST",
//	//	body: JSON.stringify(errMes),
//	//	headers: {"Content-Type": "application/json"}
//	//}).then(function (res) {
//	//	res.json().then(function (data) {
//	//	});
//	//});
//}
//
//ajaxhelper.post("http://localhost:30010/status", {}, null,function (data) {
//	if (data.isOpen) {
//		let userAgent = navigator.userAgent;
//		let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
//		reIE.test(userAgent);
//		let fIEVersion = parseFloat(RegExp["$1"]);
//		if (fIEVersion == 9) {
//			return;
//		}
//		window.addEventListener("error", errorManage);
//	}
//});