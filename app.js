/** SETTINGS **/

var SECURITYTOKKEN = "aaa"; //at least 128bit strong key
var port = 8000;
var title = "Servertitle";
var url = "127.0.0.1:8000"; // eg 127.0.0.1:8000
var admin = "admin" // Name of the server admin
var lang = "eng"; // Language, eng or ger only

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
	app.set('views', __dirname);
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname)));
});



app.get('/?', function(req, res){
	res.send(403, "<h1>Sorry Guy! This is a private part!</h1>");
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


app.get('/' + SECURITYTOKKEN + '/status/?', function(req, res){
	var spawn = require('child_process').spawn,
	ls = spawn('./mcscript.sh', ['status']);
	ls.on('exit', function (code) {
		if(code == "true"){
			res.send("true");
		}
		else{
			res.send("false");
		}
	});
});


app.get('/' + SECURITYTOKKEN + '/backup/?', function(req, res){
	var spawn = require('child_process').spawn,
	ls    = spawn('./mcscript.sh', ['backup']);
	ls.on('exit', function (code) {
		console.log('child process exited with code ' + code);
	});
});


app.get('/' + SECURITYTOKKEN + '/?', function(req, res){

	if(req.originalUrl == '/' + SECURITYTOKKEN ){
		res.redirect('/' + SECURITYTOKKEN + '/');
	}

	else{

		if(lang == "eng"){
			res.render("template", {
				title: title,
				admin: admin
			});	
		}
		else if(lang == "ger"){
			res.render("template.ger.jade", {
				title: title,
				admin: admin
			});
		}

		else{
			res.render("template", {
				title: title,
				admin: admin
			});	
		}


	}

});


app.get('/' + SECURITYTOKKEN + '/client.js', function(req, res){
	fs.readFile('./client.js', function(error, content) {
				if (error) {
						res.writeHead(500);
						res.end();
				}
				else {
						res.writeHead(200, { 'Content-Type': 'application/x-javascript' });
						res.end(content, 'utf-8');
				}
		}); 
});




http.createServer(app).listen(app.get('port'), function(){
	console.log("WebInterface startet. Port:" + port);
});
