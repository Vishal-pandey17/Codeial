const User = require('../models/user');
module.exports.profile = function(req, res){
   User.findById(req.params.id, function(err, user){
    return res.render('user_profile', {
        title: 'user Profile',
        profile_user: user
       });
   });
    // restricted to access to my profile
    /*if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user)
        {
            if(err){console.log('   error in finding user in sign up:'); return}
            if(user){
               return res.render('user_profile', {
                 title: 'user Profile',
                 user: user
               })
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
    */
    /*return res.render('user_profile', {
        title: 'User Profile'
    })*/
}


module.exports.update = function(req,res)
{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
           return res.redirect('back');
        });
    }else{
         return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res)
{
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');   
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated()){
       
        return res.redirect('/users/profile');   
      }
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
    /*// Steps to Manual Authentication
    // Find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in sign in'); return}
        // handle user found
        if(user){
              // handle password which don't match
               if(user.password != req.body.password){
                return res.redirect('back');
               }
             // handle session creation 
             res.cookie('user_id', user.id);
             return res.redirect('/users/profile'); 
        }else{
            // handle user not found
            return res.redirect('back');
        }
    }); */

    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
   // this function is given to by request by using passport.js
   req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
