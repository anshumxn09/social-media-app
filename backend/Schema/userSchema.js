const mongoose = require('mongoose')
const crypto = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "please enter a name"],
    },
    avatar : {
        public_id : String,
        url : String 
    },
    email : {
        type:String,
        required : [true, "should be required"],
        unique : [true , 'email already exists'],
    },
    password : {
        type : String,
        required : [true , "Please enter a password"],
        minlength : [6, "Password must be at least 6 character"],
        select : false  // whenever fetching the data the password wont be presented
    },
    post:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    followers  : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    following  : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
})

userSchema.methods.generateToken = async function(){
    return jwt.sign({_id : this._id}, process.env.KEY);
}

userSchema.methods.matchPassword = async function(password){
    return crypto.compare(password, this.password);
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await crypto.hash(this.password, 12);
    }
    next();
})  

module.exports = mongoose.model('User', userSchema)