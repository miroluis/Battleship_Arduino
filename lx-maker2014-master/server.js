#!/usr/bin/env node
"use strict";

process.title = 'node-lxmaker';
var wsPort = 8080;

function is_running() {
    //io.adapter(redis({ host: 'localhost', port: 6379 }));
    console.log('   BattleShip v1');
    console.log('	 > running on port ' + wsPort);
}

var express = require('express'),
	eapp =  express();
  	eapp.use(express.static(__dirname + '/public'));
var exec = require('child_process').exec;

var
	app = require('http').createServer(eapp).listen(Number(process.env.PORT || wsPort), is_running),
	io = require('socket.io').listen(app,{origins:'*:*'});

var usernames = {};                     // usernames which are currently connected to the chat
var rooms = ['game','waiting1','waiting2'];  // rooms which are currently available in chat

io.sockets.on('connection', function(socket) {

	socket.on('adduser', function(username) {
		socket.username = username;
		usernames[username] = username;
		console.log( username + ' user has connected!');
		socket.join('game');
	});

	socket.on('paint', function(x, y) {
		console.log(x + " " + y + "\n");
		var high = 254;
		var low = 0;
		var r = Math.floor(Math.random() * (high - low) + low);
		var g = Math.floor(Math.random() * (high - low) + low);
		var b = Math.floor(Math.random() * (high - low) + low);
		var myx = nm(x,10);
		var myy = nm(y,10);
		console.log('my x: ' + myx + "  &y:" + myy );
		var lednr = (myx + (myy * 10));
		setLed(lednr, r, g, b);

	});

	socket.on('disconnect', function() {
		if (socket.room == 'game') {
			// reset game, find players
		}

		// remove the username from global usernames list
        delete usernames[socket.username];
        socket.leave(socket.room)
	});
});

function setLed(lednr, r, g, b) {
	console.log("setled @ led->" + lednr);
	//exec('./setPixel.py ' + lednr + " " + r + " " + g + " " + b );
	console.log('./setPixel.py ' + lednr + " " + r + " " + g + " " + b );
	exec('./setPixel.py ' + lednr + " " + r + " " + g + " " + b );
}

function nm(nr, max) {
	var i = 0
	while(nr > max) {
		i++;
		nr = nr - max;
	}
	return i;
}