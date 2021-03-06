var app=require('express')();
var http =require('http').Server(app);
var io=require('socket.io')(http);
var fs = require("fs");
var st = "1";

//-------------------------------------------------------------------------//
// Mongodb setup

var newItem = {};
console.log(newItem);

var contents = fs.readFileSync("dummy.json");
var jsonContent = JSON.parse(contents);
var ID;
// Compile model from schema


//-------------------------------------------------------------------------//
// Handle sockets
io.on('connect', function(socket){
	console.log("User connected "+socket.id);

	socket.on('create', function(){
		var st = "0";
		console.log("close it");
	});
	socket.on('picture', function(data){
		newItem["picture"] =  data;
		console.log(newItem.picture);

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
		if (newItem == {}){
			//
		} else {
			console.log('app asked for a picture');
			socket.emit("setImage", newItem.picture);
		}
	});

	socket.on('getQuestions', function(id){
		ID = id;
		var item = {};
		if (id =="0") {
			item = newItem;
		}

		if (id =="1") {
			item = jsonContent.items[0];
		}

		if (id =="2") {
			item = jsonContent.items[1];
		}

		socket.emit('q1', item.q1);
		socket.emit('q2', item.q2);
		socket.emit('q3', item.q3);
	});

	socket.on('checkAnswers', function(json) {
		console.log('checking answers')
		var k = 0;
		id = ID;
		var item = {};
		if (id =="0") {
			item = newItem;
		}

		if (id =="1") {
			item = jsonContent.items[0];
		}

		if (id =="2") {
			item = jsonContent.items[1];
		}

		if (json.a1 == item.a1){
			k = k+1;
		}
		if (json.a2 == item.a2){
			k = k+1;
		}
		if (json.a3 == item.a3){
			k = k+1;
		}

		if (k>0) {
			socket.emit('yep');
			console.log(k);
		} else {
			socket.emit('nope');
			console.log(k);
		}

	});

	socket.on('collect', function(){
		newItem = {};
		var st = "1";
		console.log("open it");
	})
});

// the box
app.get('/status', function (req, res){
	res.send(st);

});

//for server to know if it was done
app.post('/boxlocked', function (req, res){

	console.log('the box is locked. well done.');
	// console.log(req);
	// const body = req.body.Body;

});

app.post('/boxunlocked', function (req, res){
	console.log('the box is unlocked. well done.');
});

http.listen('3000', function(){
	console.log("Server is running on port 3000");
});

