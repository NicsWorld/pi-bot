var http = require('http');
var express = require('express');
var piblaster = require('pi-blaster.js');

var app = express();
// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored
// in the home directory
app.use(express.static(__dirname));

//try a simpler rest get call
app.get('/hello', function(req, res) {
       console.log("hello");
 });

//lock rest get call
app.get('/test1', function(req, res) {
       piblaster.setPwm(11, 0.145);
       res.end('Box is locked');
 });

//unlock rest get call
app.get('/test2', function(req, res) {
       piblaster.setPwm(10, 0.1);
       res.end('Box is unlocked');
 });


// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
       res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
 if (req.xhr) {
       res.status(500).send('Oops, Something went wrong!');
 } else {
       next(err);
 }
}); // apt.use()


//------------------------------------------------------------------------
//on clrl-c, put stuff here to execute before closing your server with ctrl-c
process.on('SIGINT', function() {
 var i;
 console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");
 process.exit();
});

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');
