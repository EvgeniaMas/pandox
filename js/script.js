window.onload=startConstructor;
window.PlayerConstructor = {};

var womanPlayer= {
  1: {
    name: 'hat', amount: 2, top:15, width: 54, height:44
  },
    5: {
    name: 'glasses', amount: 2, top:55,  width: 32, height:20
  }
}

var manPlayer= {
  1: {
    name: 'hat', amount: 3, top:15, width: 54, height:44
  },
  5: {
    name: 'glasses', amount: 2, top:55,  width: 32, height:20
  }
}

var player_gender = document.querySelector('input[type="radio"]:checked').value;
if(player_gender==null){
player_gender = 'man';
}

function showPlayer(){
  var person;
  if(player_gender=='woman'){
    person = document.getElementById('woman');
  }
  else{
    person = document.getElementById('man');
  }
    
    var imageObj=new Image();     
    var width = person.width;
    var height = person.height;
    var ratio = height/ width ; 
    var heights = width/ratio;   
    imageObj.src=person.src;
    imageObj.draggable = false;
    imageObj.width = PlayerConstructor.width/ratio-70;
    imageObj.height = PlayerConstructor.height-70;
    setImageAtCenter(imageObj);
}
//Initilizing canvas
function startConstructor() {
   //Canvas Properties
		PlayerConstructor = new fabric.Canvas('canvas');
		PlayerConstructor.selectionColor = 'rgba(0,0,0,0.3)';
		PlayerConstructor.selectionBorderColor = 'black';
		PlayerConstructor.selectionLineWidth = 1;

    document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'photo_collage.png');
}, false);

    //Dress Images load
    showDress();
    showPlayer();
}
//Add Key Down Event 
//On Delete Remove Selected Object from canvas 
function OnkeyDown(event){
    var activeObject = PlayerConstructor.getActiveObject();
    if (event.keyCode === 46) {
    	PlayerConstructor.remove(activeObject);
    }
}

// insert new dress to canvas during constructuing a player;
function insertDress(imgElement, folder, type){
var top = folder[type].top; 
var name =  folder[type].name; 
imgElement.className='items';
imgElement.setAttribute('crossOrigin', 'anonymous');
imgElement.setAttribute('name', name); 
	var imgInstance = new fabric.Image(imgElement, {
    left: PlayerConstructor.getWidth()/2-imgElement.width/2,
    top: top,  
    angle: 0,
});
var objects = PlayerConstructor.getObjects();
for (var i = 0; i < objects.length; ) {
  if (objects[i]._element.name == name) {
    PlayerConstructor.remove(objects[i]);
    i = 0;
  } else {
    i++;
  }
}
PlayerConstructor.add(imgInstance);
}
//Insert and Add object to canvas 
function setImageAtCenter(imgElement){
  imgElement.setAttribute('crossOrigin', 'anonymous');
	var imgInstance = new fabric.Image(imgElement, {
    left: PlayerConstructor.getWidth()/2-imgElement.width/2,
    top: PlayerConstructor.getHeight()/2-imgElement.height/2,
    // top: 0,
    angle: 0,
});
	PlayerConstructor.add(imgInstance);
}

// show first dress items on load and add eventListener 
// for clicking new dress items selection
function  showDress() {
   var imgContainer=document.getElementById("img-container");
    var folder;
    if(player_gender =='woman'){
       folder = womanPlayer;
    }
    else{
      folder = manPlayer;
    }
    var types = document.querySelector('.active.menu_canvas_item').getAttribute('data-part');
    var type = Number(types);
    var len = folder[type].amount;
    var width = folder[type].width;
    var height = folder[type].height;
   for(var i=0; i<len; i++){      
      var imagediv=document.createElement("div");
      imagediv.className="img-item";     
      var img=new Image();
      img.draggable="true";
      img.className="dress";      
      img.src=player_gender+"/"+folder[type].name+"/"+(i+1)+".png";      
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
    imageObj.width = width;
    imageObj.height = height;
    insertDress(imageObj, folder, type);       
    });
   }
}








// switching dress items menu
 var menu_canvas_items = document.querySelectorAll('.menu_canvas_item');
 var menu_canvas_item;
 for (var i = 0; i < menu_canvas_items.length; i++) {
     menu_canvas_item = menu_canvas_items[i];
     menu_canvas_item.addEventListener('click', function (event) { 
     for (var a = 0; a < menu_canvas_items.length; a++) {
       menu_canvas_items[a].classList.remove('active');
     }     
    this.classList.add('active');
    document.getElementById('img-container').innerHTML="";
    showDress();
 });
}

var gender_selections = document.querySelectorAll('.gender');
 var gender_selection;
 for (var i = 0; i <gender_selections.length; i++) {
     gender_selection = gender_selections[i];
    gender_selection.addEventListener('change', function (event) {
      document.getElementById('img-container').innerHTML="";
      player_gender = document.querySelector('input[type="radio"]:checked').value;
      PlayerConstructor = {};
      startConstructor();
 });
}
//Download canvas Image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}