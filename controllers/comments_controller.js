const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){
   Post.findById(req.body.post, function(err, post){
     if(post){
        Comment.create({
            comment: req.body.content,
            post: req.body.post,
            user: req.user._id
         }, function(err, comment){
             // handle error
             if(err){
                console.log("Error to add the comments", err);
                return;
             }
             
             post.comments.push(comment);
             post.save();

             res.redirect('/');
        });
     }
   });       
}