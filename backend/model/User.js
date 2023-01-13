const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniques: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [
        {type: mongoose.Types.ObjectId, 
        ref: "Blog", 
        required: true}
    ]
});

module.exports = mongoose.model('User', userSchema);
//the 'User' defined here is the name of the document
//but mongodb will assign it in plural form and will 
//rewrite as 'users' according to the naming convection
//of mongodb.