//取得畫布
var c = document.getElementById("MyCanvas");

//取得繪圖區域
var ctx = c.getContext("2d");

//取得螢幕尺寸，設定畫布跟變數
var ww=$(window).outerWidth();
var wh=$(window).outerHeight();

var center={
  x: ww/2,
  y: wh/2  
}

c.width=ww;
c.height=wh;

function getWindowSize(){
  var ww=$(window).outerWidth();
  var wh=$(window).outerHeight();
  c.width=ww;
  c.height=wh; 

  ctx.restore();
  ctx.translate(center.x,center.y);
}

//設定當網頁尺寸變動的時候要重新抓跟設定大小、中心
$(window).resize(getWindowSize);
getWindowSize()

var time = 0;

setInterval(draw,10);
function draw(){

  //清除背景
  ctx.fillStyle="#111";
  ctx.beginPath();
  //起點/長/寬
  ctx.rect(-2000,-2000,4000,4000);
  ctx.fill();


  //座標軸
  ctx.strokeStyle="rgba(255,255,255,0.4)";
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(-ww/2,0);
  ctx.lineTo(ww/2,0);
  ctx.moveTo(0,-wh/2);
  ctx.lineTo(0,wh/2);
  ctx.stroke();


  //-------------------------------------------------------------
  //繪製變動弧線
  //設定半徑
  var r= 200;
  //將角度轉換為弧度
  var deg_to_pi = Math.PI / 180 ;
  var count=200;

  //重新開始繪製
  ctx.beginPath();
  ctx.lineWidth=1;
  for(var i=0 ;i<=count ;i++){
    //設定變動的半徑跟角度
    var now_r = r + 2*Math.sin(Math.PI*2*i/10 + time/20);
    var deg= i* (360/count) * deg_to_pi;

    //連線
    ctx.lineTo(
      now_r* Math.cos(deg),
      now_r* Math.sin(deg)
    );
  };

  //設定顏色跟繪製
  ctx.strokeStyle="#fff";
  ctx.stroke();

  //-------------------------------------------------------------
  //繪製刻度 (內圈)
  var r= 220;
  var count= 240;
  ctx.lineWidth=1;
  for (var i=0 ;i<=count ;i++){
    var deg= 360* (i/count) * deg_to_pi;
    
    var pan=0;
    var len=4 + ( i%10==0?4:0 ) + ( i%60==0?8:0 );
    var opacity=( (len>4)?1:0.7 );

    var start_r=r;
    var end_r=r+len;

    ctx.beginPath();
    ctx.moveTo(
      start_r* Math.cos(deg),
      start_r* Math.sin(deg)
    );     
    ctx.lineTo(
      end_r* Math.cos(deg),
      end_r* Math.sin(deg)
    );   
    ctx.strokeStyle="rgba(255,255,255,0.5)";
    ctx.stroke();

  }

   //-------------------------------------------------------------
  //繪製刻度 (外圈)
  var r= 400;
  var count= 60;
  ctx.lineWidth=1;
  for (var i=0 ;i<=count ;i++){
    var deg= 360* (i/count) * deg_to_pi;
    
    var pan=0;
    var len=4 + ( i%10==0?4:0 ) + ( i%60==0?8:0 );
    var opacity=( (len>4)?1:0.7 );

    var start_r=r;
    var end_r=r+len;

    ctx.beginPath();
    ctx.moveTo(
      start_r* Math.cos(deg),
      start_r* Math.sin(deg)
    );     
    ctx.lineTo(
      end_r* Math.cos(deg),
      end_r* Math.sin(deg)
    );   
    ctx.strokeStyle="rgba(255,255,255,0.5)";
    ctx.stroke();

  }

  //-----抓取現在的時間
  var now= new Date();
  var sec= now.getSeconds();
  var min= now.getMinutes();
  var hour=now.getHours();


  $(".time").text("(GMT+8) "+hour+":"+min+":"+sec);

  function drawPointer(r,deg,lineWidth){
    ctx.beginPath();
    ctx.lineWidth=lineWidth;

    var now_deg=deg;

    ctx.moveTo(0,0);     
    ctx.lineTo(
      r* Math.cos(now_deg* deg_to_pi),
      r* Math.sin(now_deg* deg_to_pi)
    );       

    ctx.stroke();
  }

  //角度- 刻度/總數    
  //小時會有分鐘偏誤
  drawPointer(380, -360*(sec/60)+90, 1);
  drawPointer(210, -360*(min/60)+90, 3);
  drawPointer(150, -360*((hour+min/60)/12)+90, 6);


  time+=1;
}

draw();