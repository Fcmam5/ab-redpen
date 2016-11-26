module.exports = function (io){
    io.on('connection', function(socket){
        console.log("a user connected");
        socket.on('draw', function(p){

            console.log("oh :"+p.x);
             io.emit('draw',p);
        });
        socket.on('disconnect', function(){
            console.log("disconnected :(");
        });
    });
}
