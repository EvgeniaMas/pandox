window.onload=init;
window.PhotoCollage={};




function make_base()
{
   var man = document.getElementById('man');  
    var imageObj=new Image();     
    var width = man.width;
    var height = man.height;
    var ratio = height/ width ; 
    var heights = width/ratio;

   
    imageObj.src=man.src;
    imageObj.draggable = false;
    imageObj.width = PhotoCollage.width/ratio-70;
    imageObj.height = PhotoCollage.height-70;
    insertAtCenter(imageObj);





     

//       imageObj.setAttribute('crossOrigin', 'anonymous');
//       var imageObjInstance = new fabric.Image(imageObj, {
//     left: 20,
//     top: 20,
//     angle: 0,
// });
//   PhotoCollage.add(imageObjInstance);


}










//Initilizing canvas
function  init() {

    //Canvas Attach Event Handlers
		// var canvasWrapper = document.getElementById('canvasWrap');
		// canvasWrapper.tabIndex = -1	;
		// canvasWrapper.addEventListener("keydown", OnkeyDown	, false);
  //   canvasWrapper.addEventListener("drop",OnImageDrop,false);
  //   canvasWrapper.addEventListener("dragover",OnImageDragOver,false);
    





    //Canvas Properties
		PhotoCollage = new fabric.Canvas('canvas');
		PhotoCollage.selectionColor = 'rgba(0,0,0,0.3)';
		PhotoCollage.selectionBorderColor = 'black';
		PhotoCollage.selectionLineWidth = 1;

    //DownLoad Canvas  As Image
    //Not made visible as tainted canvas cannot be dowbloaded
    //due to CORS origin policy
    document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'photo_collage.png');
}, false);

    //Dummy Image Fixtures
    AddDummyImages();
    make_base();




}

//Add Key Down Event 
//On Delete Remove Selected Object from canvas 
function OnkeyDown(event){
    var activeObject = PhotoCollage.getActiveObject();
    if (event.keyCode === 46) {
    	PhotoCollage.remove(activeObject);
    }
}

//Add Drop Event Listner to get images into canvas
function  OnImageDrop(event) {
    event.preventDefault();
    var imageObj=new Image();
    imageObj.src=event.dataTransfer.getData("text");
      imageObj.width = 54;
    imageObj.height = 54;
    insertAtCenter(imageObj);
   
}


//Image drag over event
// function OnImageDragOver(event) {
//   event.preventDefault();
// }

//Set Image src on drag start
// function drag(event) {
//     event.dataTransfer.setData("text",event.target.src);
// }
function insertDress(imgElement){
  imgElement.className="items";
  imgElement.setAttribute('crossOrigin', 'anonymous');
  imgElement.setAttribute('name', 'hat'); // 

	var imgInstance = new fabric.Image(imgElement, {
    left: PhotoCollage.getWidth()/2-imgElement.width/2,
    top: 10,  
    angle: 0,
});
var objects = PhotoCollage.getObjects();
for (var i = 0; i < objects.length; ) {
  if (objects[i]._element.name == 'hat') {
    PhotoCollage.remove(objects[i]);
    i = 0;
  } else {
    i++;
  }
}
PhotoCollage.add(imgInstance);


}




//Insert and Add object to canvas 
function insertAtCenter(imgElement){
  imgElement.setAttribute('crossOrigin', 'anonymous');
	var imgInstance = new fabric.Image(imgElement, {
    left: PhotoCollage.getWidth()/2-imgElement.width/2,
    top: PhotoCollage.getHeight()/2-imgElement.height/2,
    // top: 0,
    angle: 0,
});
	PhotoCollage.add(imgInstance);

}

//Download canvas Image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

//Add dummy Images
//Not Proper way, need to implement image search to display few images on basis of search.
function  AddDummyImages() {
   var imgContainer=document.getElementById("img-container");
    //Temporray  Fixtures.
   var len=3;
   for(var i=0;i<len;i++){
      
      var imagediv=document.createElement("div");
      imagediv.className="img-item";
     
      var img=new Image();
      img.draggable="true";
      img.className="dress";
      // img.addEventListener("dragstart",drag,false);
      img.src="img/"+(i+1)+".png";
      
      imagediv.appendChild(img);
     imgContainer.appendChild(imagediv);
      
   }

   var dress = document.querySelectorAll('.dress');

var index, item;

for (index = 0; index < dress.length; index++) {
    item = dress[index];
    item.addEventListener('click', function (event) { 
    var image = this; 
    var imageObj=new Image();
    imageObj.src=image.src;
    imageObj.width = 54;
    imageObj.height = 54;
    insertDress(imageObj); 

      
    });
}
}


 var menu_canvas_items = document.querySelectorAll('.menu_canvas_item');
 var menu_canvas_item;
 for (var i = 0; i < menu_canvas_items.length; i++) {
     menu_canvas_item = menu_canvas_items[i];
     menu_canvas_item.addEventListener('click', function (event) { 
     for (var a = 0; a < menu_canvas_items.length; a++) {
       menu_canvas_items[a].classList.remove('active');
     }     
    this.classList.add('active');
 });
}




function loadImages(i){
    i = i || 1;
    var img = new Image();    
    img.onload = function(){
      document.body.appendChild(img);
        loadImages(++i);
    }
    img.src = 'img/' +i + '.jpg';
}

loadImages(5);



// var objects = PhotoCollage.getObjects();

// console.log(objects);

// for (var i = 0; i < objects.length; ) {
//   if (objects[i].name == 'cropArea' || objects[i].name == 'bleedLine') {
//     canvas.remove(objects[i]);
//     i = 0;
//   } else {
//     i++;
//   }
// }