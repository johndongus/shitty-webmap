// main sketch
var x, y, socket;

var game_data = {
  session: "",
  items: [],
  players: []
};

var temp_players = [];



function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}




selected_map = "";

function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
     return decodeURIComponent(name[1]);
}

session_id = get('s');


window.onload = function () {

  var img = new Image;
  img.onload = function(){
     // Or at whatever offset you like
  };
  img.src = "./icons/icon_killings.png";



  // canvas related variables
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width;
  var ch = canvas.height;


  
  
  

  // start the animation
  requestAnimationFrame(animate);

  function animate(currentTime) {
      ctx.clearRect(0, 0, 100000, 100000);
       
    if (game_data.items.length == 0 && game_data.players.length == 0) {

      const heightOutput = document.querySelector("#height");
      const widthOutput = document.querySelector("#width");
      


      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, 10000, 10000);

      ctx.font = "130px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("No items or players found", canvas.height/ 4, canvas.width / 8);




      
    }

    //if(document.getElementById("checkItems").checked)

    game_data.items.forEach((item) => {
      
      if(item.price > 40000 || item.name == "Corpse") {
          
        ctx.beginPath();

        if(item.price > 30000){
          ctx.fillStyle = "white"; 
          ctx.font="small-caps 20px Trebuchet MS";

          ctx.arc(item.x-3, item.y -3, 6, 0, Math.PI * 2, false);
          ctx.fillText(`${item.name} | ${nFormatter(item.price, 1)}`,item.x - 35, item.y + 35);
          ctx.fill();
        }
         
        if(item.price > 70000){
          ctx.fillStyle = "lime";
          ctx.font=" small-caps bold 32px Trebuchet MS";
          ctx.strokeStyle = 'black';

          ctx.arc(item.x-3, item.y -3, 6, 0, Math.PI * 2, false);
          ctx.fillText(`${item.name} | ${nFormatter(item.price, 1)}`,item.x - 35, item.y + 35);
          ctx.fill();
        }

        if(item.name == "Corpse"){
          ctx.fillStyle = "fuchsia";
          ctx.font=" small-caps bold 28px Trebuchet MS";
          ctx.strokeStyle = 'black';

         // ctx.arc(item.x-3, item.y -3, 6, 0, Math.PI * 2, false);
        
          ctx.fill();
          ctx.drawImage(img,item.x  - 35, item.y , 60,60);
          ctx.fillText(`${item.name}`,item.x - 55, item.y + 80);
        }
         

       
        
        
      
        ctx.closePath();
      }
      });





game_data.players.forEach((player) => {
      //  if(player.session != session_id) return;
         deg = player.direction - 90;
         length = 100;

     

        if(player.side == '1' || player.side == '2'){
          ctx.fillStyle = 'fuchsia';
         // ctx.strokeStyle = 'black';
        }

        if(player.side == '4' || player.side == '3'){
          ctx.fillStyle = 'red';
         // ctx.strokeStyle = 'black';
        }

        if(player.local >= 1){
          ctx.fillStyle = "yellow";
          //ctx.strokeStyle = "black";
        } 
        ctx.strokeStyle  = ctx.fillStyle;


        ctx.font = "30px Lucida Console";
        temp_name = `${player.name} | ${player.kd}`;
        if(player.kd == 0 || player.kd < 0) temp_name = player.name;
        ctx.fillText(temp_name,player.x - 35, player.y + 35);



        ctx.beginPath();
        ctx.arc(player.x-5, player.y -5, 10, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
        
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(player.x-5, player.y-5);

        P2x = Math.round(player.x-5 + length * Math.cos(deg * Math.PI / 180.0));
        P2y = Math.round(player.y-5 + length * Math.sin(deg *  Math.PI / 180.0));
        ctx.lineTo(P2x,P2y);
        ctx.stroke();


      });
    requestAnimationFrame(animate);
    
  }
};



$('.nav li').click(function(){
  $('.nav li').removeClass('active');
  $(this).addClass('active');
})


$('#myModal').on('shown.bs.modal', function () {
  $('#customs').trigger('focus')
})


$("#woods").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Woods.png') no-repeat"

  canvas.style.width = 7148;
  canvas.style.height = 5133;
});
$("#customs").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Customs.png') no-repeat"
});
$("#reserve").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Reserve.png') no-repeat"
});
$("#shoreline").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Shoreline.png') no-repeat"
});
$("#lighthouse").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Lighthouse.png') no-repeat"
});
$("#interchange").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Interchange.png') no-repeat"
});
$("#factory").click(function() {
  var canvas = document.querySelector("canvas");
  canvas.style.background = "url('./maps/Factory.png') no-repeat"
});





function test(){
  var e = document.getElementById("maps");
  var strUser = e.value;
  console.log(strUser);
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  selected_map = strUser;


  
 
  if(selected_map == "woods"){
    canvas.style.background = "url('./maps/Woods.png') no-repeat"

    canvas.style.width = 7148;
    canvas.style.height = 5133;
    
    
  } else if(selected_map == "customs"){
    canvas.style.background = "url('./maps/Customs.png') no-repeat"

  } else if(selected_map == "reserve"){
    canvas.style.background = "url('./maps/Reserve.png') no-repeat"

  } else if(selected_map == "shoreline"){
    canvas.style.background = "url('./maps/Shoreline.png') no-repeat"

  } else if(selected_map == "lighthouse"){
    canvas.style.background = "url('./maps/Lighthouse.png') no-repeat"

  } else if(selected_map == "interchange"){
    canvas.style.background = "url('./maps/Interchange.png') no-repeat"

  } else if(selected_map == "factory"){
    canvas.style.background = "url('./maps/Factory.png') no-repeat"

  } 

}



function setup() {
  var canvas = document.querySelector("canvas"),
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    ctxBg = canvas.getContext("2d");
  

    //document.getElementById('canvas').style(' background-image: url(/maps/Woods.png)');

  const img = new Image(); // Create new img element





  img.src = "./maps/Customs.png";

  img.addEventListener(
    "load",
    function () {
      createCanvas(10000,10000);
      
    },
    false
  );



  rectMode(CENTER);



  socket = io.connect(location.protocol + "//" + location.host);




  socket.on("game_data", async function (data) {

    if(session_id == data.session) {
      if(data.current_map == "Customs") canvas.style.background = "url('./maps/Customs.png') no-repeat"
      game_data = data;
    }
    

   });
 

}
