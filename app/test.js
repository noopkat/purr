var options = {
    client_id : 'yfn9j9vkcd5qqt9tze0mertjkmxigrb2',
    client_secret : 'geh8noikgfbbcdfjisurtl19ytre1zfj',
    //scope : 'SPEECH'
}

var Watson = require('watson-js').Watson;
var watson = new Watson(options);


// watson.getAccessToken(function(err, t) {
//   console.log('access token : ' + t);
// });

// watson.getUserAccessToken(function(err, t) {
//   console.log('user access token : ' + t);
// });

watson.sendSMS('cat3.jpg', 'e3ICwFwy0CBXy2IUTDyYJzuj0Tq0rzzj', function(err, t) {
  console.log('response : ', err, t);
});