const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,           // this means we cannot enter into database without email.
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true    // This will create the above schema and update that.
});


const User = mongoose.model('User', userSchema);

module.exports = User;