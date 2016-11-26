module.exports = function (io){
    io.on('connection', function(socket){
        console.log("a user connected");
        socket.on('draw', function(p){
             io.emit('draw',p);
        });
        socket.on('disconnect', function(){
            console.log("disconnected :(");
        });
    });
}
