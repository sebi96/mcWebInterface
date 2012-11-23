/*

REPLACE the FOLLOWING VARIABLES:
*/

var SECURITYTOKKEN = "aaa"; //at least 128bit strong key
var port = 8000;
//var ip = '127.0.0.1';


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");




http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});


var uri = url.parse(req.url).pathname; 
var filename = path.join(process.cwd(), uri);  

if(uri == "/" + SECURITYTOKKEN + "/start"){
	sys.puts ("ERFOLG");
	//////////////////////////////////////////////

	var spawn = require('child_process').spawn,
	
	ls    = spawn('./mcscript.sh', ['start']);

	/*ls.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});*/
	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	});

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("", 'utf-8');
	///////////////////////////////////////////////
}

else if(uri == "/" + SECURITYTOKKEN + "/stop"){
	sys.puts ("ERFOLG");
	//////////////////////////////////////////////

	var spawn = require('child_process').spawn,
	
	ls    = spawn('./mcscript.sh', ['stop']);

	/*ls.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});*/
	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	});

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("", 'utf-8');
	///////////////////////////////////////////////
}

else if(uri == "/" + SECURITYTOKKEN + "/restart"){
	sys.puts ("ERFOLG");
	//////////////////////////////////////////////

	var spawn = require('child_process').spawn,

	ls    = spawn('./mcscript.sh', ['restart']);

	/*ls.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});*/
	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	});

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("", 'utf-8');
	///////////////////////////////////////////////
}

else if(uri == "/" + SECURITYTOKKEN || uri == "/" + SECURITYTOKKEN + "/"){


     fs.readFile('./file.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });	


}


}).listen(port);
console.log('Server running at PORT ' + port);
