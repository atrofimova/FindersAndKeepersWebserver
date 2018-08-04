var app=require('express')();
var http =require('http').Server(app);
var io=require('socket.io')(http);


// Handle sockets
io.on('connect', function(socket){
	console.log("User connected "+socket.id);

	socket.on('image', function(data){
		console.log(data);
		//socket.emit("putImage", data);
	});

	socket.on('disconnect', function(){
		console.log("User disconnected " + socket.id);
	})
});


http.listen('3000', function(){
	console.log("Server is running on port 3000");
});

