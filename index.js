var app=require('express')();
var http =require('http').Server(app);
var io=require('socket.io')(http);

//-------------------------------------------------------------------------//
// Mongodb setup
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/27017';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Mongodb schema
var Schema = mongoose.Schema;
var ItemSchema = new Schema({
	id: String,
	picture: String,
	q1: String,
	q2: String,
	q3: String,
	a1: String,
	a2: String,
	a3: String,
});


var iid, ipicture, iq1, iq2, iq3, ia1, ia2, ia3;


// Compile model from schema
var ItemModel = mongoose.model('ItemModel', ItemSchema );





//-------------------------------------------------------------------------//
// Handle sockets
io.on('connect', function(socket){
	console.log("User connected "+socket.id);

	socket.on('create', function(){

	});
	socket.on('picture', function(data){
		ipicture =  data;
		//socket.emit("putImage", data);
	});
	socket.on('id', function(data){
		iid = data;
	});
	socket.on('q1', function(data){
		iq1 = data;
	});
	socket.on('q2', function(data){
		iq2 = data;
	});
	socket.on('q3', function(data){
		iq3 = data;
	});
	socket.on('a1', function(data){
		ia1 = data;
	});
	socket.on('a2', function(data){
		ia2 = data;
	});
	socket.on('a3', function(data){
		ia3 = data;
	});
	socket.on('create', function(data){
		var item_instance = new ItemModel({ id: iid,  picture: ipicture, q1:iq1, q2:iq2, q3:iq3, a1:ia1, a2:ia2, a3:ia3});
		item_instance.save(function (err) {
			if (err) return handleError(err);
			// saved!
		});
	});

	socket.on('disconnect', function(){
		console.log("User disconnected " + socket.id);
	})
});

http.listen('3000', function(){
	console.log("Server is running on port 3000");
});

