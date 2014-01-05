var st = require('st')({
  path: __dirname + '/public',
  cache: false,
  index : "index.html",
  passthrough: true
});
var qs = require('querystring');
var http = require('http');
var request = require('request');
var Watson = require('watson-js').Watson;
var watson = new Watson(options);

var options = {
    client_id : 'yfn9j9vkcd5qqt9tze0mertjkmxigrb2',
    client_secret : 'geh8noikgfbbcdfjisurtl19ytre1zfj',
    //scope : 'SPEECH'
}

http.createServer(function(req, res) {
  
  if (!st(req, res)) {
    var body = "";

    req.on('data', function(chunk) {
      body += chunk.toString();
    });

    req.on('end', function() {
      if (req.method === 'POST') {
        
        var data = qs.parse(body);
        //console.log(data);

        watson.sendSMS('cat3.jpg', 'e3ICwFwy0CBXy2IUTDyYJzuj0Tq0rzzj', function(err, t) {
          console.log('response : ', err, t);
        });
        
       
      
      }
    });    
  }
}).listen(80);
