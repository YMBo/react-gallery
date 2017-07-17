var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports ={
	entry: "./src/app.js",
	output : {
		path:path.resolve(__dirname,"./dist"),
		filename:"js/[name].js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename : "./index.html",
			template: "./index.html",
			inject : "body"
		})
	],
	module : {
		rules:[
			{
				test:/\.js$/,
				loader:"babel-loader",
				options : {
					presets:["latest","react"]
				},
				include:[
					path.resolve(__dirname,"./src")
				]
			},{
				test:/\.css$/,
				loader :"style-loader!css-loader"
			},{
				test:/\.css$/,
				loader :"postcss-loader",
				options: {
					plugins:function(loader){
						return [require('autoprefixer')({
							browsers: ['last 5  versions']
						})]
					}
				}
			},{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loader:'file-loader',
				options:{
					/*图片名称*/
					name:"images/[name].[ext]",
					/*位置*/
				}
			},{
				test:/\.json$/,
				loader:"json-loader"
			},{
				test:/\.less$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings 
				}, {
					loader: "css-loader" // translates CSS into CommonJS 
				}, {
					loader: "less-loader" // compiles Less to CSS 
				}]
			}
		]
	}
}