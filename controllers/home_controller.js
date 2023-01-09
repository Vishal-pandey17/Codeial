const Post = require('../models/post');
const { populate } = require('../models/user');

// A group of action function in one file is called controller
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);                // Update that presented cookie


    /*Post.find({}, function(err, posts){       // use to show the post details in home.ejs file
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    })*/

    // populate the user for each post
    Post.find({})                               // use to fetch out which all the data of user who has post this
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        })
        .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    })
    
}

// module.exports.actionName = function(req, res){}

