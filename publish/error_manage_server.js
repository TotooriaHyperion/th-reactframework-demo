"use strict";

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const sourceMap = require("source-map");

// 将全部map数据预先读取到内存。（每次发布需重启本服务器）
let allFiles = fs.readdirSync(path.resolve(__dirname,'publish'));
let mapFiles = {};
allFiles.forEach(function (item,index) {
	if (/^.+\.map$/.test(item)) {
		mapFiles[item.slice(0,-4)] = JSON.parse(fs.readFileSync(path.resolve(__dirname,"publish",item),"utf-8"));
	}
});
// 预读取map数据完毕

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
	let allowedOrigins = [
		"http://localhost:8080",
		"http://localhost:12344",
		"http://localhost:3313",
		"http://localhost:63342"
	];
	// 这里是允许跨域的的domain列表

	let origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Credentials', true);// Allow Cookie
		// 注意IE和EDGE需要加时间戳，否则会走缓存。

		// 默认支持的跨域形式
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

		// 应对特殊跨域请求（兼容Safari和Firefox）
		if (req.headers['access-control-request-method']) {
			res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
		}
		if (req.headers['access-control-request-headers']) {
			res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
		}
	}
	next();
});

app.post("/error", function (req,res) {
	console.log(req.body);
	let fileName = (new Date()).toLocaleDateString().split("/").join("_") + ".txt";
	let pathName = path.join(__dirname,"/log/" + fileName);
	fs.readdir("log", function (err,data) {
		let a;
		if (err != null) {
			fs.mkdir("log");
			a = -1;
		} else {
			a = data.findIndex(function (item) {
				return item == fileName;
			});
		}

		req.body.time = (new Date()).toLocaleTimeString();

		//delete req.body.errStack;

		// 处理errStack，如果没有，则根据err本身的信息来找
		if (req.body.errStack) {
			let errstack = req.body.errStack;
			errstack.forEach(function (item,index) {
				errstack[index] = item.trim();
			});
			let isNative = errstack.findIndex(function (item,index) {
				return /^at.+\(native\)$/.test(item);
			});
			let problem;
			if (isNative == -1) {
				problem = errstack[1];
			} else {
				problem = errstack.find(function (item,index) {
					return /^.+http\:\/\/.+\/.+$/.test(item);
				});
			}
			let _fileName = problem.slice(problem.lastIndexOf("/") + 1, problem.lastIndexOf("js") + 2);
			problem = problem.slice(0,-1).split(":").splice(-2);
			req.body.filename = _fileName;
			req.body.lineNo = problem[0];
			req.body.colNo = problem[1];
		} else {
			// 如果没有errStack，则根据lastErr来找
			req.body.filename = req.body.lastErr.filename;
			req.body.lineNo = req.body.lastErr.lineno;
			req.body.colNo = req.body.lastErr.colno;
		}
		delete req.body.lastErr;

		// 处理errStack结束

		// 测试errStack完全处理
		let dealAllStack;
		dealAllStack = true;
		//dealAllStack = false;
		//let fileErrLen = 0;
		//let currentErrCount = 0;
		let allStack = Array.from(Object.create(req.body.errStack || []));
		//let allStack = req.body.errStack || [];
		function parseAll(errstack) {
			errstack.forEach(function (item,index) {
				errstack[index] = item.trim();
				let isFile = /^.+https?\:\/\/.+\/.+$/.test(errstack[index]);
				if (isFile) {
					//fileErrLen++;
					let problem = errstack[index];
					let _fileName = problem.slice(problem.lastIndexOf("/") + 1, problem.lastIndexOf("js") + 2);
					problem = problem.slice(0,-1).split(":").splice(-2);
					errstack[index] = {
						message: errstack[index],
						filename: _fileName,
						lineNo: problem[0],
						colNo: problem[1]
					}
				}
			});
		}
		function getOriginPos(item) {
			if (!item.filename) {
				return;
			}
			//fs.readFile(path.join("publish",item.filename + ".map"),"utf-8",dealWithAll.bind(item));
			(dealWithAll.bind(item,null,mapFiles[item.filename]))();
		}
		function dealWithAll(err,mapData) {
			if (!err) {
				//let theMap = JSON.parse(mapData);
				let theMap = mapData;
				let smc = new sourceMap.SourceMapConsumer(theMap);
				let originPos = smc.originalPositionFor({
					line: parseInt(this.lineNo),
					column: parseInt(this.colNo)
				});
				this.lineNo = originPos.line;
				this.colNo = originPos.column;
				this.sourceFileName = originPos.source;
			}
			//if (++currentErrCount == fileErrLen) {
			//	console.log(allStack);
			//}
		}
		if (req.body.errStack && dealAllStack) {
			parseAll(allStack);
			for(let i=0;i<allStack.length;i++) {
				getOriginPos(allStack[i]);
			}
			console.log(allStack);
		}
		// 测试errStack完全处理结束

		let _thisFileName = req.body.filename;
		fs.readFile(path.join("publish",_thisFileName + ".map"),"utf-8", function (err,data) {
			// 获取sourceMap，并根据sourceMap获取对应源文件名和行列号。
			let theMap = JSON.parse(data);
			let smc = new sourceMap.SourceMapConsumer(theMap);
			let originPos = smc.originalPositionFor({
				line: parseInt(req.body.lineNo),
				column: parseInt(req.body.colNo)
			});
			req.body.lineNo = originPos.line;
			req.body.colNo = originPos.column;
			//req.body.sourceFileName = originPos.source.slice(originPos.source.indexOf("://") + 3);
			req.body.sourceFileName = originPos.source;
			req.body._errStack = req.body.errStack;
			delete req.body.errStack;
			// 获取原始行列号结束。

			console.log(req.body);
			let logData = JSON.stringify(req.body) + ",,,\n";
			if (a != -1) {
				fs.appendFile(pathName,logData,"utf-8", function (err) {
					res.writeHead(200,{
						"Content-Type":"text/plain;charset=utf-8"
					});
					res.end(JSON.stringify({status:"接受异常"}));
				});
			} else {
				fs.writeFile(pathName,logData,"utf-8", function (err) {
					res.writeHead(200,{
						"Content-Type":"text/plain;charset=utf-8"
					});
					res.end(JSON.stringify({status:"接受异常"}));
				});
			}

		});
	});

	//res.writeHead(200,{
	//	"Content-Type":"text/plain;charset=utf-8"
	//});
	//res.end(JSON.stringify({status:"接受异常"}));
});

let currentStatus = false;

app.post("/status", function (req,res) {
	if (req.body.setStatus) {
		currentStatus = req.body.open;
		console.log("已将异常抓取设置为" + (currentStatus ? "开启" : "关闭"));
		res.end("已将异常抓取设置为" + (currentStatus ? "开启" : "关闭"));
	}
	let status = {};
	status.isOpen = currentStatus;
	res.end(JSON.stringify(status));
});

app.listen(30010);


String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
};
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
};