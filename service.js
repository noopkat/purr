var st = require('st')({
  path: __dirname + '/public',
  cache: false,
  index : "index.html",
  passthrough: true
});

var options = {
    client_id : 'yfn9j9vkcd5qqt9tze0mertjkmxigrb2',
    client_secret : 'geh8noikgfbbcdfjisurtl19ytre1zfj',
    //scope : 'SPEECH'
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
         // watson!
            watson.sendSMS('cat3.jpg', 'e3ICwFwy0CBXy2IUTDyYJzuj0Tq0rzzj', function(err, t) {
              console.dir('response : ', err, t);
            });

        //var body = '';

        // req.on('data', function (data) {
        //   console.log(data);
        //     body += data;
        //     console.log("Partial body: " + body);
           
            
        // });
        // req.on('end', function () {
        //     console.dir("Body: " + body);
        // });
        // res.writeHead(200, {'Content-Type': 'text/html'});
        // res.end('post received');

    }
    else
    {
        console.log("GET");
        var html = '<html><body><form method="post" action="/"><input type="hidden" value="hello"/><input type="submit" value="Submit" /></form></body>';
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    
}).listen(8081)
