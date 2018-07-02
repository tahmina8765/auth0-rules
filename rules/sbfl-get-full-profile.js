function (user, context, callback) {
    // console.log(user);
   
    var data = {
      locale: user.locale,
      createdAt: user.created_at,
      memberSince: user.memberSince,
      weight: user.weight,
      weightUnit: user.weightUnit,
      offsetFromUTCMillis: user.offsetFromUTCMillis,
      timezone: user.timezone
    };
    context.idToken['http://sbfl.com/profile/auth'] = user.identities[0];
    context.idToken['http://sbfl.com/profile/identities'] = user.identities;
    context.idToken['http://sbfl.com/profile/data'] = data;
    context.idToken['http://sbfl.com/groups'] = user.groups;
    // context.idToken['http://sbfl.com/createdAt'] = user.created_at;
    // context.idToken['http://sbfl.com/memberSince'] = user.memberSince;
    // context.idToken['http://sbfl.com/weight'] = user.weight;
    // context.idToken['http://sbfl.com/weightUnit'] = user.weightUnit;
    // context.idToken['http://sbfl.com/offsetFromUTCMillis'] = user.offsetFromUTCMillis;
    // context.idToken['http://sbfl.com/timezone'] = user.timezone;
    callback(null, user, context);    
}
