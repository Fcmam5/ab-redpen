module.exports = function (io){
    io.on('connection', function(socket){
        console.log("a user connected");
        socket.on('draw', function(p,b){
             io.emit('draw',p,b);
        });
        socket.on('moved', function(p){
             io.emit('moved',p);
        });
        socket.on('disconnect', function(){
            console.log("disconnected :(");
        });
    });
}
