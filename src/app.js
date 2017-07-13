var React =require("react");
var reactDom =require("react-dom");
var GalleryByReact=require("./components/gallery/gallery.js");
reactDom.render(
	<GalleryByReact />,
	document.getElementById("content")
)

