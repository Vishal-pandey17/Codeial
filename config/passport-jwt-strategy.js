const passport = require('passport');                           // Before this use Notes Firsts
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'                                    // Key use to Decrypt the token
}

// once the JWT is created after that this is used to Authenticate the user
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;
