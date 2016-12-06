"use strict";

var webpack = require('webpack');
//var ignore = new webpack.IgnorePlugin(/\.svg$/);
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
var fs = require("fs");

function getAllFileArray(dirname) {
	return fs.readdirSync(dirname).reduce(function (prev, current) {
		if (!fs.statSync("./" + path.join(dirname, current)).isDirectory()) {
			prev.push("./" + path.join(dirname, current));
		}
		return prev;
	}, []);
}

var settings = {
	devtool: 'source-map',
	entry: {
		bundle: [
			'react-hot-loader/patch',
			'babel-polyfill',
			'./entry.js'
		],
		vendors: [
			"react-bootstrap",
			"source-map",
			'react',
			'react-dom',
			'react-router',
			'redux',
			'react-router-redux',
			//'./lib/My97DatePicker2/WdatePicker.js'
		].concat(getAllFileArray('./util/'))
			.concat(getAllFileArray('./lib/'))
			.concat(getAllFileArray('./lib/qiniu/'))
			//.concat(getAllFileArray('./lib/97DatePicker/'))
			.concat(getAllFileArray('./components/'))
			.concat(getAllFileArray('./constants/'))
			.concat([])
			.concat([])
	},
	output: {
		//public: './build/',
		publicPath: 'http://localhost:9091/',
		filename: '[name].js',
		chunkFilename: "[id].chunk.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0', 'stage-1']})],
				include:path.resolve(__dirname),
				exclude: [/node_modules/,/publish/]
			},
			{ test: /\.scss$/, loaders: [
				'style',
				'css',
				//'autoprefixer',
				'sass'
			] },
			//{
			//	test: /\.css$/,
			//	loader: ExtractTextPlugin.extract({
			//		fallbackLoader: "style-loader",
			//		loader: "css-loader"
			//	})
			//},
			//{
			//	test: /\.css$/,
			//	loader:  ExtractTextPlugin.extract("style-loader", "css-loader",'autoprefixer'),
			//	//loaders:  ["style-loader", "css-loader",'autoprefixer']
			//},
			//{
			//	test: /\.css$/,
			//	loaders: ['style-loader', 'css-loader']
			//},
			{test: /\.(png|jpg|jpeg|gif)$/,loader:'file'},
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]" },
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]" },
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]" }
			//{
			//	test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			//	loader: 'file?name=fonts/[name].[ext]'
			//}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		//new webpack.DefinePlugin({
		//	'process.env.NODE_ENV': '"development"'
		//}),
		//new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("[name].css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		new htmlWebpackPlugin({
			template: '1.html',
			title: "Weshare Ebooking",
			minify: {
				removeAttributeQuotes: true
			},
			inject: true,
			"files": {
				"css": ["./styles/main.css"]
			}
		})
	],
	devServer: {
		hot: true,
		inline: true
	},
	node: {
		__dirname:true,
		__filename:true
	}
};


//var path1 = "./test_mjs2/containers/";
//var files = fs.readdirSync(path1);
//for(var i=0;i<files.length;i++) {
//	if (fs.statSync(path1 + files[i]).isFile()) {
//		//testmjs.push(path + files[i]);
//		settings.entry[files[i].substr(0,files[i].lastIndexOf("."))] = path1 + files[i];
//	}
//}

console.log(settings);

module.exports = settings;
