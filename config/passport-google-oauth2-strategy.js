const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');          // Use to generate the random password.
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
     clientID: "223351384140-ccrou2ussq25pv9rjn5cc5gi27cnd37s.apps.googleusercontent.com",
     clientSecret: "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",
     callbackURL: "https://localhost:8000/users/auth/google/callback",

}, function(accessToken, refreshToken, profile, done){/* Access token take generated token by google, and refresh will 
                                                         regenerate the token when access token expired.*/

      // Find the user
      User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google strategy-passport', err);
            return;
        }
        console.log(profile);

        if(user){
            // If found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex');
            }, function(err, user){
                if(err){
                    console.log("Error in creating user google strategy-passport", err);
                    return;
                }
                return done(null, user);
            })
        }

      })
}));

module.exports = passport;