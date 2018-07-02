function(user, context, callback) {
  var http = require("http");
  var https = require("https");

  // if (context.clientID === 'F3yjSMu8z2JCo3ru453idPnlF2S4mQVn') {

  // context.idToken['http://sbfl.com/profile/fitbit'] = user.identities[0];
  // https://us-central1-scoreboard-for-life.cloudfunctions.net/api/token/3
  var options = {
    host: 'us-central1-scoreboard-for-life.cloudfunctions.net',
    path: '/api/token/' + user.user_id + '?photoURL=' + user.picture,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(options.host + options.path);
  https.get(options, function(response) {

    // console.log('STATUS: ' + response.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(response.headers));

    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
      str += chunk;
      // console.log(str);
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function() {
      // console.log("This is the token: " + str);
      context.idToken['http://sbfl.com/profile/firebase'] = {
        "token": str
      };
      callback(null, user, context);
    });
  }).end();

  // }

}