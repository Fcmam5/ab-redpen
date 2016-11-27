$(document).ready(function(){
var socket = io();
var canvas = $("#red-pen")[0];
var ctx = canvas.getContext('2d');
var pos = {x:0, y:0};
var isDown = false;

canvas.height = $('#the-board').height();
canvas.width = $('#the-board').width();

var setPosition = function(a,b){
    pos.x = a;
    pos.y = b;
};

var drawing = function(x,y,down){
    if (down) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'red';
    ctx.moveTo(pos.x,pos.y);
    setPosition(x,y);
    ctx.lineTo(pos.x,pos.y);
    ctx.closePath();
    ctx.stroke();
    }
    pos.x = x;
    pos.y = y;
};

//Define erase functions
var eraseAll = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
};

//Define erasor
var erase = function(x,y,w,h){
        ctx.clearRect(x,y,w,h);
};

$('#the-board').on('mousedown',function(p){
    isDown = true;
    drawing(p.pageX - $(this).offset().left,
             p.pageY - $(this).offset().top,
             isDown);

});

$("#the-board").on('mousemove', function(p) {
        drawing(p.pageX - $(this).offset().left,
                 p.pageY - $(this).offset().top,
                 isDown);
    socket.emit('draw',pos,isDown);
    $("#le-me").text(pos.x+","+pos.y);
});//end mousemove event

$("#the-board").on('mouseleave mouseup', function(){
    isDown = false;
});

socket.on('draw',function (ps,b) {
    drawing(ps.x,
             ps.y,
             b);
             $("#le-him").text(ps.x+","+ps.y);

});

//Get the photo from user
$('#btn').click(function(){
    var imgUrl = $('#img-link').val();
    socket.emit('change-bg',imgUrl);
});

socket.on('change-bg',function(img){
    console.log(img);
    $("#the-board").css("background-image","url("+img+")");
});

//Erase button
$('#erase-btn').on('click', function(){
    eraseAll();
    socket.emit('eraseAll');
});

socket.on('eraseAll', function(){
    eraseAll();
});

});
