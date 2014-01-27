var st = require('st')({
  path: __dirname + '/public',
  cache: false,
  index : "index.html",
  passthrough: true
});

var options = {
    client_id : '',
    client_secret : ''
}

var qs = require('querystring');
var http = require('http');
var request = require('request');
var Watson = require('watson-js').Watson;
var watson = new Watson(options);

http.createServer(function(req, res) {
  console.dir('listening....')
  console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST!!!!");
         // terrible code with unused paramters below
            watson.sendSMS('', '', function(err, t) {
              console.dir('response : ', err, t);
            });
    }
    else
    {   
        // test page render
        console.log("GET");
        var html = '<html><body><form method="post" action="/"><input type="hidden" value="hello"/><input type="submit" value="Submit" /></form></body>';
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    
}).listen(8081)
