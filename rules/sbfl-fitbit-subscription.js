/**
 * This rules shuld be only applicable for those users who login with FITBIT
 */

function (user, context, callback) {
   var rulename = "SBFL - Fitbit subscription";
   console.log("------------- SBFL - Fitbit subscription --------------");
  
   var fitbit = user.identities.filter(function(elem, i){
     return elem.provider === "fitbit";
   });
   
   console.log(typeof user.identities);
   if (fitbit['0'] && fitbit['0'] !== {}) {
     console.log(rulename + ": Fitbit user, start subscription");
     var http = require("http");
     var https = require("https");
  
     var access_token = user.identities[0].access_token;
     var user_id = user.user_id.split("|")[1];
     // context.idToken['http://sbfl.com/profile/fitbit'] = user.identities[0];
     // https://us-central1-scoreboard-for-life.cloudfunctions.net/api/token/3
     var endpoint = '/1/user/' + user_id + '/apiSubscriptions/' + user_id + '.json';
  
     var options = {
       host: 'api.fitbit.com',
       path: endpoint,
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + access_token
       }
     };
     
     console.log(options.host + options.path);
     https.request(options, function(response) {
       var str = '';
       //another chunk of data has been recieved, so append it to `str`
       response.on('data', function(chunk) {
         str += chunk;
         console.log(str);
       });
      
       //the whole response has been recieved, so we just print it out here
       response.on('end', function() {
         console.log("This is the token: " + str);
         callback(null, user, context);
       });
     }).end();
     
   }else{
     console.log(rulename + ": Not a fitbit user " + fitbit);
     callback(null, user, context);
   }
  
  
}