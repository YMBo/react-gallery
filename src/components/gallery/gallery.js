require ("./gallery.less");
var React =require("react");
var reactDom =require("react-dom");
var ImageDatas =require("./imageData.json");
//获取图片相关数据
ImageDatas=(function(imageDatasArr){
	for( var i=0,j=imageDatasArr.length;i<j;i++ ){
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require("../../images/"+singleImageData.filename);
	}
	return imageDatasArr;
})(ImageDatas);

class GalleryByReact extends React.Component{
	render() {
		return (
			<section className="stage">
				<section className="img-sec"></section>
				<nav className="controller-nav"></nav>
			</section>
		)
	}
}
module.exports=GalleryByReact;