const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res){
   try{
    // url like --> likes/toggle/?id=abcdef&type=Post or Comment
    let likeable;
    let deleted = false;
    if(req.query.type == 'Post'){
        likeable = await Post.findById(req.query.id).populate('likes'); // If there are already like in the likes array then i populate the likes

    }else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }

    // Check if like is already exsist
    let existingLike = await Like.findOne({
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id
    })

    // if like already exists then delete it 
    if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();

        existingLike.remove();
        deleted = true;
    }else{
        // Make a new like
        let newLike = await Like.create({
            user: req.user._id,
            likeable: req.query._id,
            onModel: req.query.type
            
        });

        likeable.likes.push(newLike._id);
        likeable.save();
    }

    return res.status(200).json({
        messagge: 'Request Successfull',
        data:{
            deleted:deleted
        }
    });
       
   }catch(err){
      console.log(err);
      return res.json(500, {
        messagge: 'Internal server error'
      });
   }
}