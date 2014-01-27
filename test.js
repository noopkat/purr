var options = {
    client_id : '',
    client_secret : ''
}

var Watson = require('watson-js').Watson;
var watson = new Watson(options);


watson.sendSMS('', '', function(err, t) {
  console.log('response : ', err, t);
});
