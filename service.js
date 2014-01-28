var st = require('st')({
  path: __dirname + '/public',
  cache: false,
  index : "index.html",
  passthrough: true
});

// these are for watson
var options = {
    client_id : '',
    client_secret : ''
}

var qs = require('querystring');
var http = require('http');
var request = require('request');
var Mamaset = require('mamaset').Mamaset;
var mamaset = new Mamaset(options);

http.createServer(function(req, res) {

  if (req.method == 'POST') {
    // terrible code with unused paramters below
    mamaset.sendMMS('', function(err, t) {
      console.dir('response : ', err, t);
    });
  }
  else
  {   
    // test page render
    console.log("GET");
    // this is temporary, just to create a quick submit button that allows you to test a post to the server manually without the tinyduino
    var html = '<html><body><form method="post" action="/"><input type="submit" value="Submit" /></form></body>';
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
    
}).listen(8081);
