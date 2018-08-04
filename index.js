var app=require('express')();
var http =require('http').Server(app);
var io=require('socket.io')(http);
var fs = require("fs");

//-------------------------------------------------------------------------//
// Mongodb setup

var newItem;


var contents = fs.readFileSync("dummy.json");
var jsonContent = JSON.parse(contents);
// Compile model from schema


//-------------------------------------------------------------------------//
// Handle sockets
io.on('connect', function(socket){
	console.log("User connected "+socket.id);

	socket.on('create', function(){

	});
	socket.on('picture', function(data){
		newItem["picture"] =  data;

	});
	socket.on('id', function(data){
	});
	socket.on('q1', function(data){
		newItem["q1"] = data;
	});
	socket.on('q2', function(data){
		newItem["q2"] = data;
	});
	socket.on('q3', function(data){
		newItem["q3"] = data;
	});
	socket.on('a1', function(data){
		newItem["a1"] = data;
	});
	socket.on('a2', function(data){
		newItem["a2"] = data;
	});
	socket.on('a3', function(data){
		newItem["a3"] = data;
	});

	socket.on('disconnect', function(){
		console.log("User disconnected " + socket.id);
	});

	socket.on('getNewItem', function(){
		if (newItem == 0){
			//
		} else {
			socket.emit("setImage", newItem.picture);
		}
	});

	socket.on('collected', function(){
		newItem = 0;
	})
});

http.listen('3000', function(){
	console.log("Server is running on port 3000");
});

