/**
 * Created by Totooria Hyperion on 2016/10/18.
 */
var webpack = require('webpack');
//var ignore = new webpack.IgnorePlugin(/\.svg$/);
var path = require("path");
var fs = require("fs");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");

function getAllFileArray(dirname) {
	return fs.readdirSync(dirname).reduce(function (prev,current) {
		if (!fs.statSync("./" + path.join(dirname, current)).isDirectory()) {
			prev.push("./" + path.join(dirname, current));
		}
		return prev;
	},[]);
}

var settings = {
	devtool:"source-map",
	//devtool:"cheap-source-map",
	entry: {
		app: [
			'react-hot-loader/patch',
			'babel-polyfill',
			path.resolve(__dirname, './entry.js')
		],
		vendors: [
			"react-bootstrap",
			//"source-map",
			//"babel-polyfill",
			'react',
			'react-dom',
			'react-router',
			'redux',
			'react-router-redux',
			'./lib/My97DatePicker2/WdatePicker.js'
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
		//path: path.resolve(__dirname, "publish/publish" + (new Date()).toLocaleDateString().split("/").join("_") + "/"),
		path: path.resolve(__dirname, "publish/publish"),
		filename: '[name]-[chunkhash].js',
		chunkFilename: "[id][chunkhash].js",
		sourceMapFilename:"[file].map"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0', 'stage-1']})],
				include:path.resolve(__dirname),
				exclude: [/node_modules/,/publish/]
			},
			//{ test: /\.scss$/, loaders: [
			//	'style',
			//	'css',
			//	//'autoprefixer',
			//	'sass'
			//] },
			//{
			//	test: /\.css$/,
			//	loader: ExtractTextPlugin.extract({
			//		fallbackLoader: "style-loader",
			//		loader: "css-loader"
			//	})
			//},
			//{
			//	test: /\.css$/,
			//	loaders: ['style-loader','css-loader']
			//},
			{
				test: /\.s?css$/,
				loader:  ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
			},
			// 随机命名的字体文件
			//{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			//{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			//{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			//{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
			// 按原始名称打包压缩的字体文件
			{test: /\.(png|jpg|jpeg|gif)$/,loader:'file'},
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]" },
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]" },
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]" }
		]
	},
	//resolve: {
	//    extensions: ['', '.js', '.json', '.scss', '.jsx']
	//},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors-[chunkhash].js'),
		new ExtractTextPlugin("[name]-[contenthash:8].css"),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new htmlWebpackPlugin({
			template: '1.html',
			title:"Weshare Ebooking",
			minify:{
				removeAttributeQuotes: true
			},
			inject: true,
			"files": {
				"css": ["./styles/main.css"]
			}
		})
	],
	node: {
		__dirname:true,
		__filename:true
	}
};

module.exports = settings;
