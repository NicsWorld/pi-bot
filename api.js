var http = require('http');
var express = require('express');
var piblaster = require('pi-blaster.js');

var app = express();
// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored
// in the home directory
app.use(express.static(__dirname));

app.get('/instructions', function(req, res) {
       console.log("instructions");
 });

app.get('/left', function(req, res) {
       // piblaster.setPwm(11, 0.9);
       res.end('Left maybe');
 });

app.get('/right', function(req, res) {
       // piblaster.setPwm(11, 0.1);
       res.end('right maybe');
 });

 app.get('/up', function(req, res) {
        // piblaster.setPwm(13, 0.2);
        res.end('up');
  });

  app.get('/down', function(req, res) {
         // piblaster.setPwm(13, 0.3);
         res.end('down');
   });

app.get('*', function (req, res) {
       res.status(404).send('Unrecognised API call');
});

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
