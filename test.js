var options = {
    client_id : '',
    client_secret : ''
}

var Watson = require('watson-js').Watson;
var watson = new Watson(options);


watson.sendSMS('', 'e3ICwFwy0CBXy2IUTDyYJzuj0Tq0rzzj', function(err, t) {
  console.log('response : ', err, t);
});
