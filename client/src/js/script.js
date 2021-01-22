// notes / ideas
// - what if you have to lock every picture so its like gluing in real collaging

function init () {
}

// 0. INITIALIZE CANVAS, CUSTOMIZATION
// 1. COLLAGING TOOLS
// 2. DOWNLOADING COLLAGE
// 3. ZOOMING


// INITIALIZE FABRIC CANVAS FOR COLLAGING 0000000
var canvas = new fabric.Canvas('c', {
  isDrawingMode: false,
});
var man = document.getElementById("c");
var ctx = man.getContext('2d');
 
// const CANVAS_WIDTH = canvas.width;
// const CANVAS_HEIGHT = canvas.height;
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}
const artSpaceWidth = 1500;
const artSpaceHeight = 900;
const artBoardWidth = 300;
const artBoardHeight = 300;
const initialUserWidth = window.innerWidth;
var CANVAS_WIDTH = 1500;
var CANVAS_HEIGHT = 900;
console.log("HEIGHT: "+window.innerHeight);
console.log("WIDTH: "+window.innerWidth);

canvas.setHeight(4000);
canvas.setWidth(4000);
// canvas.setBackgroundImage('./client/gf3.png', canvas.renderAll.bind(canvas));
canvas.setBackgroundImage('./client/src/img/artboard.png', canvas.renderAll.bind(canvas));
canvas.setOverlayImage('./client/src/img/artboard-overlay.png', canvas.renderAll.bind(canvas));

// centerArtboard
var initialZoom = window.innerWidth/1500;
// initialZoom = 1;
var initialX = 0.5 * (window.innerWidth - artSpaceWidth*initialZoom);
var initialY = 0.5 * (window.innerHeight - artSpaceHeight*initialZoom);


console.log("inital xy: "+initialX*initialZoom+" , "+initialY);
canvas.setViewportTransform([initialZoom,0,0,initialZoom,initialX,initialY]);


// CANVAS CUSTOMIZATION 1111111
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.centeredScaling = true // maybe false?
fabric.Object.prototype.cornerSize = 30;
fabric.Object.prototype.borderColor =  "rgba(255, 160, 0, 0.8)";
fabric.Object.prototype.cornerColor = "rgb(255, 72, 0)";
fabric.Object.prototype.cornerStrokeColor = "rgb(255, 160, 0)";
// fabric.Object.prototype.hasControls
// fabric.Object.prototype.hasBorders
// fabric.Object.prototype.hasRotatingPoint
// fabric.Object.prototype.visible
// fabric.Object.prototype.selectable
// fabric.Object.prototype.evented
// fabric.Object.prototype.centeredRotation
// fabric.Object.prototype.padding
// fabric.Object.prototype.rotatingPointOffset
fabric.Object.prototype.setControlsVisibility({
  tl:true, //top-left
  mt:false, // middle-top
  tr:true, //top-right
  ml:false, //middle-left
  mr:false, //middle-right
  bl:true, // bottom-left
  mb:false, //middle-bottom
  br:true //bottom-right
 })


var shadowObj = new fabric.Shadow({ 
  color: "rgba(0,0,0, .15)", 
  blur: 15 
}); 

// DEFAULT PLACED PICS
fabric.Image.fromURL('./client/src/img/gucci.png', function(myImg) {
  //i create an extra var for to change some image properties
  var img1 = myImg.set({ left: 650, top: 180});
  canvas.add(img1); 
});


fabric.Image.fromURL('./client/src/img/gf.png', function(myImg) {
  //i create an extra var for to change some image properties
  var img1 = myImg.set({ left: 825, top: 400});
  canvas.add(img1); 
});
fabric.Image.fromURL('./client/src/img/egg.png', function(myImg) {
  //i create an extra var for to change some image properties
  var img1 = myImg.set({ left: 500, top: 300});
  canvas.add(img1); 
});



// =============================================================================
// ---------- TOOLS ------------------------------------------------------------
// =============================================================================

// DISCARD SELECTION
function discard () {canvas.discardActiveObject().renderAll();}
$("#delete").on("click", function(e) {
    canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj)
  });
  canvas.discardActiveObject().renderAll()
});

// GROUP / UNGROUP ------------------------------------------------
var group = $('#group'),
    ungroup = $('#ungroup');
$("#group").on("click", function(e) {
  if (!canvas.getActiveObject()) {return;}
  if (canvas.getActiveObject().type !== 'activeSelection') {return;}
  canvas.getActiveObject().toGroup();
  canvas.requestRenderAll();
});
$("#ungroup").on("click", function(e) {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'group') {
    return;
  }
  canvas.getActiveObject().toActiveSelection();
  canvas.requestRenderAll();
});


// ADD PICTURES ---------------------------------------------------
function addPicture(img) {
  var scale, w, h;
  var defaultPicSize = 200;
  var defaultPlaceX = 300;
  var defaultPlaceY = 300;
  var i = new Image(); 
  i.onload = function(){
    w = i.width;
    h = i.height;
    if (w >= h) {scale = defaultPicSize/w;} else {scale = defaultPicSize/h;}
  };
  i.src = img; 
  
  fabric.Image.fromURL(img, function(myImg) {
    // var opacity = w*.1
    // var shadowObj2 = new fabric.Shadow({ 
    //   color: "rgba(255,0,0,"+opacity+")",
    //   blur: 50
    // }); 
    // var imgScaled = myImg.set({left: defaultPlaceX, top: defaultPlaceY,scaleX: scale, scaleY: scale, shadow: shadowObj2 });
    var imgScaled = myImg.set({left: defaultPlaceX, top: defaultPlaceY,scaleX: scale, scaleY: scale
    });
    canvas.add(imgScaled);
  });
}

//file reader setup
document.getElementById("btn-file-upload").onclick = function(e) {
  document.getElementById("input-file-upload").click(); // simulates click on hidden file loader
};
document.getElementById("input-file-upload").onchange = function(e) {
  let file = e.target.files; // FileList
  // console.log(file);
  if(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let result = e.target.result;
      addPicture(result);
    };
    reader.readAsDataURL(file[0]); // Read as DataURL
  }
  document.getElementById("file-upload").reset(); // Reset, so we can use the same filename
};


// ===== READS MULTIPLE FILES
// function readmultifiles(files) {
//   var reader = new FileReader();  
//   function readFile(index) {
//     if( index >= files.length ) return;
//     var file = files[index];
//     reader.onload = function(e) {  
//       // get file content  
//       let result = e.target.result;
//       addPicture(result);

//       // do sth with bin
//       readFile(index+1)
//     }
//     reader.readAsBinaryString(file);
//   }
//   readFile(0);
// }

// DRAWING MODE ---------------------------------------------------
$('#drawing-mode').on("click", function() { // TOGGLES DRAWING MODE
  canvas.isDrawingMode = !canvas.isDrawingMode;
  if (canvas.isDrawingMode) {
    $('#drawing-mode').text('Cancel drawing mode');
    $('#drawing-mode').css("background-color", "var(--toolButtonActive-color)");
    $('#drawing-mode-options').css("display", "block");
    var brush = canvas.freeDrawingBrush;
    brush.color = document.getElementById("drawing-color").value; 
    canvas.freeDrawingBrush.width = document.getElementById("drawing-line-width").value;
  } else {
    $('#drawing-mode').text('Enter drawing mode');
    $('#drawing-mode').css("background-color", "var(--toolButton-color)");
    $('#drawing-mode-options').css("display", "none");
  }
});

$('#drawing-color').on("change", function() {
  var brush = canvas.freeDrawingBrush;
  brush.color = this.value;
});
$('#drawing-line-width').on("change", function() {
  canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
  this.previousSibling.innerHTML = this.value;
});
var widthSlider = document.getElementById("drawing-line-width");
var widthSliderValue = document.getElementById("widthSliderValue");
widthSlider.oninput = function() {widthSliderValue.innerHTML = "Width: "+this.value;}


// SNIPPING MODE ------------------------------------------------
$("#click").on("dblclick", function(e) {
  console.log('DOUBLE CLICK!');
})
$("#snip").on("click", function(e) {
  console.log('snippin!');
  var activeObject = canvas.getActiveObject();
  activeObject.setSrc("./client/src/img/gf2.png");
  canvas.requestRenderAll();
})

// COPY & PASTE -------------------------------------------------
var pasteOffset = 50;
$("#copypaste").on("click", function(e) {
  if (canvas.getActiveObject() != null) {
    canvas.getActiveObject().clone(function(cloned) {
      _clipboard = cloned;
      paste();
    });
  } else {alert("nothing slected");}
});

function paste() {
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + pasteOffset,
			top: clonedObj.top + pasteOffset,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += pasteOffset;
		_clipboard.left += pasteOffset;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}


// LASSO TOOL ---------------------------------------------------
var snipCanvas = document.getElementById('snipCanvas');
var snipCtx = snipCanvas.getContext('2d');
var snipImg = document.createElement('IMG');


var fabSnipCanvas = new fabric.Canvas('snipCanvas', {
  isDrawingMode: true,
});
fabSnipCanvas.setBackgroundImage('./client/src/img/egg.png', fabSnipCanvas.renderAll.bind(fabSnipCanvas));


var imgInstance;
var base = new Image();
base.onload = function() {
  snipCtx.drawImage(base, -400,0, 1200, 800);
  imgInstance = new fabric.Image(base, {
      left: 0,
      top: 0,
  });
  fabSnipCanvas.add(imgInstance);
};
base.src = "./client/src/img/lamb.jpg";

fabSnipCanvas.on('path:created', function(options) {
  var path = options.path;
  // OwnCanv.isDrawingMode = false;
  fabSnipCanvas.remove(imgInstance);
  fabSnipCanvas.remove(path);
  fabSnipCanvas.clipTo = function(snipCtx) {
      path.render(snipCtx);
  };
  // fabSnipCanvas.add(imgInstance);
});


//////////////////////////////////////////////////////////////////
// CROPPING AND DOWNLOADING ---------------------------------------
//////////////////////////////////////////////////////////////////

// FOR DOWNLOADING DONT DELETE
$("#download").on("click", function(e) {
  var prevCanvas = document.getElementById("preview");
  var data = prevCanvas.toDataURL();  
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", data);
  downloadAnchorNode.setAttribute("download", "superBeatifulCollageWowAmazing.png");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});
// FOR DOWNLOADING DONT DELETE

$("#save").on("click", function(e) { 
  $('#popup').css("display", "block");

  canvas.setViewportTransform([1,0,0,1,1350,1550]); // zoom for crop
  discard(); // discards
  const scale = document.getElementById("preview").width/artBoardWidth;

  var prevCanvas = document.getElementById("preview");
  var prevCtx = prevCanvas.getContext("2d");

  var pred = new Image();
  pred.onload = function() {
    prevCtx.drawImage(pred, -1950*scale, -1850*scale, pred.width*scale, pred.height*scale);
    pngData = prevCanvas.toDataURL();
    document.getElementById("img2").src = pngData;
    // UNCOMMENT TO DOWNLOAD
    // downloadPNG(pngData);
  };
  pred.src = canvas.toDataURL('image/png');
});

$("#backPopup").on("click", function(e) { 
  centerArtboard(); 
  $('#popup').css("display", "none"); 
});

/////////////////////////////////////////////////
// ZOOMING and DRAGGING--------------------------------------
/////////////////////////////////////////////////
var maxZoom = 5;
var minZoom = 0.3;
var zoomBound = 1000;
var trackX = 0;
var trackY = 0;

canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > maxZoom) zoom = maxZoom;
  if (zoom < minZoom) zoom = minZoom;

  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});

// RESETING ZOOM TO CENTER
$("#center").on("click", function(e) {
  centerArtboard();
});
function centerArtboard () {
  var initialZoom = window.innerWidth/1500;
  var initialX = 0.5 * (window.innerWidth - artSpaceWidth*initialZoom);
  var initialY = 0.5 * (window.innerHeight - artSpaceHeight*initialZoom);

  console.log("inital xy: "+initialX+" , "+initialY);
  canvas.setViewportTransform([initialZoom,0,0,initialZoom,initialX,initialY]);
}
// DRAGGING
canvas.on('mouse:down', function(opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on('mouse:move', function(opt) {
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    console.log("LAST  " + this.lastPosX+" , "+this.lastPosY);
    console.log("now   " + e.clientX+" , "+e.clientY);

    let deltaX = e.clientX - this.lastPosX;
    let deltaY = e.clientY - this.lastPosY;
    vpt[4] += deltaX;
    vpt[5] += deltaY;
    trackX += deltaX;
    trackY += deltaY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
    console.log("now   " + trackX+" , "+trackY);
  }
});
canvas.on('mouse:up', function(opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});