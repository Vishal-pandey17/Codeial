const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    // comment belong to user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
       }
 },{
    timestamps: true
});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;


