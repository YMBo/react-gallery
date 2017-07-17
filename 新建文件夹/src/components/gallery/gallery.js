require ("./gallery.less");
var React =require("react");
var ReactDOM =require("react-dom");
var ImageDatas =require("./imageData.json");
//获取图片相关数据
ImageDatas=(function(imageDatasArr){
	for( var i=0,j=imageDatasArr.length;i<j;i++ ){
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require("../../images/"+singleImageData.filename);
	}
	return imageDatasArr;
})(ImageDatas);


class ImgFigure  extends React.Component{
	render(){
		var styleObj = {};
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}
		/*角度值*/
		if(this.props.arrange.rotate){
			styleObj["transform"]="rotate("+this.props.arrange.rotate+"deg)";
		}

		var imgFigureClassName = "img-figure";
		imgFigureClassName += this.props.arrange.isInverse ? "is-inverse":"";
		return (
			<figure className={imgFigureClassName} style={styleObj} >
				<img src={this.props.data.imageURL} alt={this.props.data.title} key={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
}

class GalleryByReact extends React.Component{
	constructor() {
		/*必须加super这个函数，否则下面的this会报错*/
		super();
		this.state = {
			imgsArrangeArr : [
				/*{
					pos:{
						left:"0",
						top :"0"
					},
					rotate:0,  //旋转角度
					isInverse:false	//图片正反面
				}*/
			]
		};
	 }
	//组件加载以后，为每张图片计算其位置范围
	componentDidMount(){
		/*初始化范围信息*/
		var constant={
			/*中心点*/
			centerPos:{
				left:0,
				top:0
			},
			/*水平方向的取值范围*/
			hPosRange:{
				leftSecX:[0,0],
				rightSecX:[0,0],
				y:[0,0]
			},
			vPosRange:{
				x:[0,0],
				topY:[0,0]
			}
		};

		//舞台大小
		var stageDom=ReactDOM.findDOMNode(this.refs.stage),
		stageW = stageDom.scrollWidth,
		stageH = stageDom.scrollHeight,
		halfStageW =parseInt(stageW /2),
		halfStageH =parseInt(stageH /2);

		/*imgFigure大小*/
		var imgFigureDOM= ReactDOM.findDOMNode(this.refs.imgFigure0),
		imgW = imgFigureDOM.scrollWidth,
		imgH =imgFigureDOM.scrollHeight,
		halfImgW = parseInt(imgW/2),
		halfImgH =parseInt(imgH/2);
		/*范围信息赋值*/
		constant.centerPos = {
			left:halfStageW-halfImgW,
			top:halfStageH-halfImgH
		};
		/*范围*/
		constant.hPosRange = {
			leftSecX:[-halfImgW , halfStageW-halfImgW*3],
			rightSecX:[halfStageW+halfImgH , stageW-halfImgW],
			y:[-halfImgH,stageH-halfImgH]
		};
		/*上侧*/
		constant.vPosRange={
			topY:[-halfImgH , halfStageH-halfImgH*3 ],
			x:[ halfStageW-imgW ,  halfStageW]
		};
		function get30DegRandom(){
			return ((Math.random()>0.5?"":"-")+Math.round(Math.random()*30))
		}
		function getRangeRandom(min,max){
			return parseInt(Math.random()*(max-min)+min);
		}
		/*
		*布局图片函数
		*@param centerIndex 指定居中图片
		*/
		var rearrange=(centerIndex)=>{
			var imageDatasArr=this.state.imgsArrangeArr,
			Constant=constant,
			centerPos=Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange =Constant.vPosRange,
			hPosRangeLeftSecX =hPosRange.leftSecX,
			hPosRangeRightSecX =hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX =vPosRange.x,

			imgsArrangeTopArr = [],
			/*上侧的图片数量设置*/
			topImgNum=Math.round(Math.random()*1),
			/*标记上侧的图片是数组对象的第几个*/
			topImgSpliceIndex = 0,
			/*取出居中图片的状态信息*/
			imgsArrangeCenterArr = imageDatasArr.splice(centerIndex,1);
			/*居中它*/
			imgsArrangeCenterArr[0].pos=centerPos;
			imgsArrangeCenterArr[0].rotate=0;
			/*取出布局上侧的图片状态信息*/
			topImgSpliceIndex=parseInt(Math.random()*(imageDatasArr.length - topImgNum));
			
			imgsArrangeTopArr = imageDatasArr.splice(topImgSpliceIndex,topImgNum);
			/*布局上侧的图片*/
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index]={
					pos:{
						top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
						left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
					},
					rotate:get30DegRandom()
				}
			})
			/*布局两侧*/
			for(var i=0,j=imageDatasArr.length, k=j/2; i<j;i++){
				var hPosRangeLORX=null;
				/*前半部分在左边右半部分在右边*/
				hPosRangeLORX = i<k? hPosRangeLeftSecX : hPosRangeRightSecX;		
				imageDatasArr[i]={
					pos:{
						top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
						left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
					},
					rotate:get30DegRandom()
				}
			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imageDatasArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
			}
			imageDatasArr.splice(centerIndex , 0 ,imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr:imageDatasArr
			});
		};
		rearrange(0);
	}
	render() {
		var controllerUnits = [],
		      imgFigures = [];
		/*填充数据*/
		ImageDatas.forEach(function(value,index){
			//如果当前图片没有值，那么赋值
			if(!this.state.imgsArrangeArr[index]){
				/*初始化状态对象*/
				this.state.imgsArrangeArr[index]={
					pos:{
						left:"0",
						top :"0"
					},
					rotate:0,
					isInverse:false
				}
			}
			imgFigures.push(<ImgFigure  ref={'imgFigure'+index} key={index} data={value} arrange={this.state.imgsArrangeArr[index]} />) ;

		}.bind(this))
		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		)
	}
}
module.exports=GalleryByReact;