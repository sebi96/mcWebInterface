/** SETTINGS **/

var SECURITYTOKKEN = "aaa"; //at least 128bit strong key
var port = 8000;

/** END SETTINGS **/


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require("fs");

var app = express();

app.configure(function(){
  app.set('port', port);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});


app.get('/' + SECURITYTOKKEN + '/start/?', function(req, res){
  var spawn = require('child_process').spawn,
  ls    = spawn('./mcscript.sh', ['start']);
  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });
});


app.get('/' + SECURITYTOKKEN + '/stop/?', function(req, res){
  var spawn = require('child_process').spawn,
  ls    = spawn('./mcscript.sh', ['stop']);
  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });
});


app.get('/' + SECURITYTOKKEN + '/restart/?', function(req, res){
  var spawn = require('child_process').spawn,
  ls    = spawn('./mcscript.sh', ['restart']);
  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });
});


app.get('/' + SECURITYTOKKEN + '/?', function(req, res){
     fs.readFile('./file.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');        }
    }); 
});




http.createServer(app).listen(app.get('port'), function(){
  console.log("WebInterface startet. Port:" + port);
});
