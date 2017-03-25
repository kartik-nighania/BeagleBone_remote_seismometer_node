#!/usr/bin/node
"use strict";

var port = 1551,
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    b = require('bonescript'),
    child_process = require('child_process'),
    mpu6050 = require('mpu6050'),
    server,
    connectCount = 0,	// Number of connections to server
    errCount = 0;	// Counts the AIN errors.

var mpu = new mpu6050();
    mpu.initialize();

// Initialize various IO things.
function initIO() {
    var mpu = new mpu6050();
    mpu.initialize();


    if (mpu.testConnection()) {
        console.log(mpu.getMotion6());
    }
}

function refreshMPU() {
    var mpu = new mpu6050();
    mpu.initialize();

    while (1) {
	if (mpu.testConnection()) {
	    socket.emit('mpuupdate',{mpudata: mpu.getMotion6()});
	}
	sleep(1000);
    }
}

function send404(res) {
    res.writeHead(404);
    res.write('404');
    res.end();
}

initIO();
//refreshMPU();

server = http.createServer(function (req, res) {
// server code
    var path = url.parse(req.url).pathname;
    console.log("path: " + path);
    if (path === '/') {
        path = '/seismometerNode.html';
    }

    fs.readFile(__dirname + path, function (err, data) {
        if (err) {return send404(res); }
//            console.log("path2: " + path);
        res.write(data, 'utf8');
        res.end();
    });
});

server.listen(port);
console.log("node established on port:  " + port);

var io = require('socket.io').listen(server);
io.set('log level', 2);


io.sockets.on('connection', function (socket) {

    console.log("Connection " + socket.id + " accepted.");

    socket.on('mpustart', function() {
        //sleep(1000);
        socket.emit('mpu',mpu.getMotion6());
	});

    socket.on('disconnect', function () {
        console.log("Connection " + socket.id + " terminated.");
        connectCount--;
        console.log("connectCount = " + connectCount);
    });

    connectCount++;
    console.log("connectCount = " + connectCount);
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


