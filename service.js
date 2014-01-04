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
        console.log(data);
        
        // change this to the att api
        request.post({
          url : 'https://api.mailgun.net/v2/suziam.com/messages',
          auth: {
            user: 'api',
            password: 'key-2gsxuklh9jx3-4gqjrycm0swqjofua67',
          },
          form: data
          
          // change this reponse to the atti or level db data en
        }, function(err, mailgunResponse) {
          console.log(mailgunResponse.body, mailgunResponse.statusCode);
          if (err) {
            res.writeHead(400);
            res.end((err && err.message) ? err.message : 'unknown error');
            console.log(console.log('Oh noes: ' + err))
          } else {
            console.log('mail sent on behalf of', data.from);
            res.end('ok');
          }
        });
      }
    });    
  }
}).listen(80);
