# react-gallery
webpack-reack实现画廊应用  
[预览](https://ymbo.github.io/react-gallery/)  
> webpack版本：3.0.0  

### 开发环境是react+webpack   
***  
* webpack所需loader：     
    * css-loader  
    * file-loader  
    * url-loader(处理iconfont)  
    * json-loader  
    * less  
    * less-loader  
    * style-loader   
    * babel-loader  
    * babel-preset-latest  
    * babel-preset-react  
* plugin:   
    * html-webpack-plugin   
* webpack服务器:  
    * webpack-dev-server    实时刷新        
    
***  
### webpack.config.js 配置  
```javascript
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
				test: /\.(woff|svg|ttf|eot)$/i,
				loader:'url-loader',
				options:{
					/*图片名称*/
					name:"fonts/[name].[ext]",
					/*位置*/
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
</script>
```  
  
*****  
### git相关操作  
将本地代码提交到github 

git add -A   //将文件的修改，文件的删除，文件的新建，添加到暂存区

/*
git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。
*/

2.git commit -m "finish gallery-by-react project"	//添加summary

3.git push   //提交



/*新建一个gh-pages分支*/
1.git add dist			//将dist文件夹添加到暂存区
2.git commit -m "add dist"	//添加summary
3.git subtree push --prefix=dist origin gh-pages	//将dist文件提交到gh-pages分支上
