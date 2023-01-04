const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// render the sign up page
module.exports.signUp = function(req, res)
{
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res)
{
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// Get the sign Up data
module.exports.create = function(req,res)
{ 
    if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in sign up'); return}
        if(!user){
            User.create(req.body, function(err,user)
            {
                if(err){console.log('error in creating user in sign up'); return}
                return res.redirect('/users/sign-in');
            })
        }else
        {
            return res.redirect('back');
        }
    })
}

// get the sign In Session for user
module.exports.createSession = function(req,res)
{

}