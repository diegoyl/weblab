
function init() {
	console.log("script.js")
}

const canvas = new fabric.Canvas('fabricCanvas', {
	width: 500,
	height: 700,
	backgroundColor: 'rgb(240,30,0)'
});
// can add options, scrolling, selection etc


canvas.renderAll();