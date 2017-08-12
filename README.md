# react-gallery
webpack-reack实现画廊应用  
[预览](https://ymbo.github.io/react-gallery/)  
![logo](https://github.com/YMBo/react-gallery/blob/master/%E7%94%BB%E5%BB%8A%E6%AD%A3%E9%9D%A2.png)  
![logo](https://github.com/YMBo/react-gallery/blob/master/%E7%94%BB%E5%BB%8A%E5%8F%8D%E9%9D%A2.png)  
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
		
		
/*git基本命令*/    
1.`git remote`    
  列出所有远程主机    
      
2.`git remote -v`    
  查看远程主机的网址    
      
3.`git fetch`    
  远程主机版本有了更新，需要将这些更新取回本地    
  比如取回origin主机的master分支    
  `git fetch origin master`    
       
4.`git branch -r`    
  查看远程分支    
  
  `git branch -a`    
  查看所有分支    
      
5.`git checkout -b newBranch origin/master`    
  在origin/master基础上，创建一个新分支    
      
6.`git merge origin/master`或者`git rebase origin/master`    
  在当前分支上，合并origin/master    
      
7.`git pull`
  取回远程主机某个分支的更新，再与本地制定分支合并。
  `git pull origin next:master`    
  取回origin主机的next分支，与本地master分支合并    
  远程分支与当前分支合并    
  `git pull origin next`
      
 

