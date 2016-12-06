var express = require('express');
var app = express();
var fs = require('fs');
var compress = require('compression');
 
app.use(compress());
app.use(express.static("publish"));

app.get('/', function (req, res) {
	fs.readFile("./publish/index.html",'utf-8',function(err,data){
		res.end(data);
	});
});

app.get("/api", function (req, res) {
	res.end(JSON.stringify(req.query));
});
 
app.listen(12344);