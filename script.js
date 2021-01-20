

console.log("script.js")


var canvas = new fabric.Canvas('c', {
  isDrawingMode: false
  
});
canvas.setHeight(900);
canvas.setWidth(1500);
var mainCanvas = document.getElementById('c');
var ctx = mainCanvas.getContext("2d");
var cropCanvas = document.getElementById('cropCanvas');
var cropCtx = cropCanvas.getContext("2d");



canvas.setBackgroundImage('./img/artboard.png', canvas.renderAll.bind(canvas));
canvas.setOverlayImage('./img/artboard-overlay.png', canvas.renderAll.bind(canvas));



fabric.Image.fromURL('./img/gf.png', function(myImg) {
  //i create an extra var for to change some image properties
  var img1 = myImg.set({ left: 850, top: 400 });
  canvas.add(img1); 
});
fabric.Image.fromURL('./img/egg.png', function(myImg) {
  //i create an extra var for to change some image properties
  var img1 = myImg.set({ left: 500, top: 300 });
  canvas.add(img1); 
});





$("#text").on("click", function(e) { 
  text = new fabric.Text($("#text").val(), { left: 100, top: 100 });
      canvas.add(text);
  });

$("#rect").on("click", function(e) {
  	rect = new fabric.Rect({
    left: 40,
    top: 40,
    width: 50,
    height: 50,      
    fill: 'transparent',
    stroke: 'green',
    strokeWidth: 5,
			  });  
  canvas.add(rect);
});





function addPicture(img) {
  console.log("ADDIN PIC")
  // img = img.toDataURL();
  fabric.Image.fromURL(img, function(myImg) {
    //i create an extra var for to change some image properties
    var img1 = myImg.set({ left: 0, top: 0 });
    canvas.add(img1); 
  });
}


$("#save").on("click", function(e) {
  discard();

  const dimension = 150;
  const scale = 6; 

  let pixelData = ctx.getImageData(300, 150, dimension, dimension).data;
  // let imageData = canvas.toDataURL();
  // cropCtx.putImageData(imageData, 0, 0);


  // console.log("pixelData");
  console.log(pixelData);
  console.log(pixelData.length);
    
  var reshaped=[];
  for(var p=0; p< pixelData.length; p+=4){ 
    let color = [pixelData[p], pixelData[p+1], pixelData[p+2], pixelData[p+3]]
    reshaped.push(color);
  }
  var reshaped2 = []
  for(var k=0; k< dimension; k++){ 
    let row = []
    for(var j=0; j< dimension; j++){
      row.push(reshaped[k*dimension+j])
    }
    reshaped2.push(row);
  }
  console.log("pixelDataReshaped");
  console.log(reshaped2);
  console.log(reshaped2.length);

  var r,g,b,a;   
  for(var k=0; k< dimension; k++){ 
    let row = reshaped2[k];
    for(var j=0; j< dimension; j++){
        
        let pixel = row[j];
        r = pixel[0];
        g = pixel[1];
        b = pixel[2];
        a = pixel[3];
        let color = "rgba("+r+","+g+","+b+", 1)";
        cropCtx.fillStyle = color;  
        cropCtx.fillRect(j*scale, k*scale, scale, scale); 
    }
    // console.log("pos: "+j+","+k);
  }


// $("#save").on("click", function(e) {
//   const dimension = 300;
//   const scale = 1; 

//   let pixelData = ctx.getImageData(0, 0, 1500, 900).data;
//   // let imageData = canvas.toDataURL();
//   // cropCtx.putImageData(imageData, 0, 0);


//   console.log("pixelData");
//   console.log("X: "+pixelData[0].length);
//   console.log("Y: "+pixelData.length);
    
//   var reshaped=[];
//   for(var p=0; p< pixelData.length; p+=4){ 
//     let color = [pixelData[p], pixelData[p+1], pixelData[p+2], pixelData[p+3]]
//     reshaped.push(color);
//   }
//   console.log("pixels: "+reshaped.length);


//   var reshaped2 = []
//   for(var k=0; k< 900; k++){ 
//     let row = []
//     for(var j=0; j< 1500; j++){
//       row.push(reshaped[k*900+j])
//     }
//     reshaped2.push(row);
//   }
//   console.log("pixelDataReshaped");
//   // console.log(reshaped2);
//   console.log("X: "+reshaped2[0].length);
//   console.log("Y: "+reshaped2.length);
//   console.log("Ch: "+reshaped2[0][0].length);

//   var cutRows = reshaped2.slice(300,600); // gets middle 300 rows

//   console.log("rows cut");
//   // console.log(reshaped2);
//   console.log("X: "+cutRows[0].length);
//   console.log("Y: "+cutRows.length);
//   console.log("Ch: "+cutRows[0][0].length);


//   var finalReshape = []
//   for(var k=0; k< 300; k++){ 
//     let newRow = cutRows[k].slice(600,900); // gets middle 300 cols
//     finalReshape.push(newRow);
//   }
  
//   console.log("pixelDataCUT");
//   console.log("X: "+finalReshape[0].length);
//   console.log("Y: "+finalReshape.length);
//   console.log("Ch: "+finalReshape[0][0].length);

//   var r,g,b,a;   
//   for(var k=0; k< finalReshape.length; k++){ 
//     let row = finalReshape[k];
//     for(var j=0; j< finalReshape[0].length; j++){
        
//         let pixel = row[j];
//         r = pixel[0];
//         g = pixel[1];
//         b = pixel[2];
//         a = pixel[3];
//         let color = "rgba("+r+","+g+","+b+", 1)";
//         cropCtx.fillStyle = color;  
//         cropCtx.fillRect(j*scale, k*scale, scale, scale); 
//     }
//   }




// FOR DOWNLOADING DONT DELETE
      // var downloadAnchorNode = document.createElement('a');
      // downloadAnchorNode.setAttribute("href",     dataStr);
      // downloadAnchorNode.setAttribute("download", "Collage.png");
      // document.body.appendChild(downloadAnchorNode); // required for firefox
      // downloadAnchorNode.click();
      // downloadAnchorNode.remove();
// FOR DOWNLOADING DONT DELETE


});















// ADD PICTURES
$("#pic").on("click", function(e) {
  $("#file").click() // simulates clicking the hidden file loader
});



// Proxy button for <input/>
document.getElementById("btn-file-upload").onclick = function(e) {
  //e.preventDefault();
  document.getElementById("input-file-upload").click();
};

// Handler for <input/> change

document.getElementById("input-file-upload").onchange = function(e) {
  let file = e.target.files; // FileList
  console.log(file);
  if(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let result = e.target.result;
      // ...
      addPicture(result);
      // ...
    };
    reader.readAsDataURL(file[0]); // Read as DataURL
  }
  document.getElementById("file-upload").reset(); // Reset, so we can use the same filename
};




var group = $('#group'),
    ungroup = $('#ungroup');
    // multiselect = $('multiselect'),
    // addmore = $('addmore'),

    // addmore.onclick = add;

    // multiselect.onclick = function() {
    //   canvas.discardActiveObject();
    //   var sel = new fabric.ActiveSelection(canvas.getObjects(), {
    //     canvas: canvas,
    //   });
    //   canvas.setActiveObject(sel);
    //   canvas.requestRenderAll();
    // }
$("#group").on("click", function(e) {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'activeSelection') {
    return;
  }
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

function discard () {
  canvas.discardActiveObject().renderAll();
}





// DRAWING MODE




var drawingOptionsEl = $('#drawing-mode-options');
var drawingColorEl = $('#drawing-color');
var drawingLineWidthEl = $('#drawing-line-width');


$('#drawing-mode').on("click", function() {
  console.log("TOGGLING DRAWING MODE");
  canvas.isDrawingMode = !canvas.isDrawingMode;
  if (canvas.isDrawingMode) {
    $('#drawing-mode').innerHTML = 'Cancel drawing mode';
    
    var brush = canvas.freeDrawingBrush;
    brush.color = document.getElementById("drawing-color").value;
    canvas.freeDrawingBrush.width = document.getElementById("drawing-line-width").value;
    
    // $('#drawing-mode-options').style.display = '';
  }
  else {
    $('#drawing-mode').innerHTML = 'Enter drawing mode';
    // $('#drawing-mode-options').display = 'none';
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



$("#click").on("dblclick", function(e) {
  console.log('DOUBLE CLICK!');
})

$("#snip").on("click", function(e) {
  console.log('snippin!');
  var activeObject = canvas.getActiveObject();
  activeObject.setSrc("../img/gf2.png");
  canvas.requestRenderAll();
})

