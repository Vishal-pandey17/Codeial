const passport = require('passport');                  // Before this use Notes First
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
     secretOrKey: 'codeial'                                   // Encrypt and Decrypt String
}



// Once the JWT is created after that this is user to Authenticate the User
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
         User.findById(jwtPayLoad._id, function(err, user){
            if(err){
                console.log("Error in finding the user from JWT");
                return;
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false)
            }
         })
}));

module.exports = passport;