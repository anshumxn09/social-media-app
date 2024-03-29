const { sendEmail } = require("../middleware/sendEmail")
const postSchema = require("../Schema/postSchema")
const userSchema = require("../Schema/userSchema")
const crypt = require('crypto')
const cloudinary = require('cloudinary');

const userController = {
    register : async (req, res) => {
        try {
            const {name , email, password, images} = req.body

            const image = await cloudinary.v2.uploader.upload(images, {
                folder :"Post"
            })

            let user = await userSchema.findOne({email})

            if(user){
                return res.status(404).json({
                    success : false,
                    message : "user already exists"
                })
            }
            user = new userSchema({name, email, password ,
                avatar : {
                    public_id : image.public_id,
                    url : image.secure_url
                }
            })

            await user.save()

            const token = await user.generateToken();
            // register ke sath login hojaaye
            res.status(201).cookie("token", token, {
                expires : new Date(Date.now() + 90*24*60*60*1000),
                // 90 days 24 hours 60 min 60 sec 1000 miliseconds
                httpOnly : true
            }).
            json({
                success : true,
                user,
                token
            })

        } catch (error) {
            return res.status(500).json({
                message : error.message,
                success : false
            })
        }
    },
    login : async (req, res) => {
        try {
            const getToken = req.cookies.token;
            if(getToken){
                return res.status(200).json({
                    success : true,
                    message : "already logged in"
                })
            }
            const {email, password} = req.body;

            const user = await userSchema.findOne({email}).select("+password").populate("followers following")
            //because we have mention in schema that select none
            if(!user){
                return res.status(500).json({
                    success : false,
                    message : "user doesn't exists"
                })
            }
            const isMatch = await user.matchPassword(password);

            if(!isMatch){
                return res.status(500).json({
                    success : false,
                    message : "password doesn't match"
                })
            }
            const token = await user.generateToken();

            res.status(200).cookie("token", token, {
                expires : new Date(Date.now() + 90*24*60*60*1000),
                // 90 days 24 hours 60 min 60 sec 1000 miliseconds
                httpOnly : true
            }).
            json({
                success : true,
                user,
                token
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    logout : async (req, res) => {
        try {
            return res.status(200).cookie("token", null, {
                expires : new Date(Date.now()),
                httpOnly : true
            })
            .json({
                success : true,
                message : "logged out successfully"
            })  
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    followUser : async (req, res) => {
        try {
            const userToFollow = await userSchema.findById(req.params.id)
            if(!userToFollow){
                return res.status(400).json({
                    success : false,
                    message : "user does no exists"
                })
            }

            if(userToFollow._id.toString() === req.user._id.toString()){
                return res.status(400).json({
                    success : false,
                    message : "you cannot follow yourself"
                })
            }
            
            const user = await userSchema.findById(req.user._id);
            let follow = true;
            if(user.following.includes(userToFollow._id)){
                user.following.splice(user.following.indexOf(userToFollow._id), 1);
                userToFollow.followers.splice(userToFollow.followers.indexOf(user._id), 1);
                follow = false;
            }else{
                user.following.push(userToFollow._id);
                userToFollow.followers.push(user._id);
            }
            await user.save();
            await userToFollow.save();
            let message = ""
            if(follow){
                message = `you started following ${userToFollow.name}`
            }else message = `you unfollowed ${userToFollow.name}`

            return res.status(200).json({
                success : true,
                message
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    updatePassword  : async (req, res) => {
        try {
            const {oldpass, newpass} = req.body;
            if(!oldpass || !newpass){
                return res.status(400).json({
                    success : false,
                    message : "some fields are missing"
                })
            }
            const user = await userSchema.findById(req.user._id).select("+password");
            const isMatch = await user.matchPassword(oldpass);

            if(!isMatch){
                return res.status(400).json({
                    success : false,
                    message : "old password entered not properly"
                })
            }
            user.password = newpass;
            await user.save();

            return res.status(200).json({
                success : true,
                message : "password updated successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    updateProfile : async (req, res) => {
        try {
           const user = await userSchema.findById(req.user._id);
           const {email, name, avatar} = req.body

            if(email){
                user.email = email
            }
            if(name){
                user.name = name
            }

            if(avatar){
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);

                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder : "Post"
                })

                user.avatar = {
                    url : myCloud.secure_url,
                    public_id : myCloud.public_id           
                }
            }
            await user.save();

            return res.status(200).json({
                success : true,
                message : "profile updated successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    deleteMyProfile : async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id);

            user.post.forEach(async (elem) => {
                const post = await postSchema.findById(elem);
                await cloudinary.v2.uploader.destroy(post.image.public_id);
                await post.remove();
            })
            
            user.followers.forEach(async (elem) => {
                const follower = await userSchema.findById(elem);
                follower.following.splice(follower.following.indexOf(req.user._id), 1);
                await follower.save();
            })

            user.following.forEach(async (elem) => {
                const follower = await userSchema.findById(elem);
                follower.followers.splice(follower.followers.indexOf(req.user._id), 1);
                await follower.save();
            })

            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            const get_all_posts = await postSchema.find();
            // deleting all the comments of the user
            for (var i=0; i<get_all_posts.length; i++){
                const post = await postSchema.findById(get_all_posts[i]._id);
                for(var j=0; j<post.comments.length; j++){
                    if(post.comments[j].user.toString() === user._id.toString()){
                        post.comments.splice(j, 1);
                    }
                }
                await post.save();
            }

            // deleting all the likes of the user
            for (var i=0; i<get_all_posts.length; i++){
                const post = await postSchema.findById(get_all_posts[i]._id);
                for(var j=0; j<post.likes.length; j++){
                    if(post.likes[j].toString() === user._id.toString()){
                        post.likes.splice(j, 1);
                    }
                }
                await post.save();
            }

            await user.remove();

            // logged out user after deleting the profile
            return res.status(200).cookie("token", null, {
                expires : new Date(Date.now()),
                httpOnly : true
            }).json({
                success : true,
                message : "profile deleted successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    showMyProfile : async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id).populate('post following followers');
            return res.status(200).json({
                success : true,
                user
            })
        } catch (error) {
            return res.status(500).json({
                success : true,
                message :  error.message
            })
        }
    },
    getUserProfile : async (req, res) => {
        try {
            const user = await userSchema.findById(req.params.id).populate('post followers following');

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "user doesnt exists"
                })    
            }

            return res.status(200).json({
                success : true,
                user,
            })
        } catch (error) {
            return res.status(500).json({
                success : true,
                message :  error.message
            })
        }
    },
    getUserPosts : async (req, res) => {
        try {
            const user = await userSchema.findById(req.params.id);

            let posts = []
            for(var i=0; i<user.post.length; i++){
                const post = await postSchema.findById(user.post[i]).populate("likes comments.user owner");
                posts.push(post);
            }

            return res.status(200).json({
                success : true,
                posts
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    getAllUser : async (req, res) => {
        try {
            const user = await userSchema.find({
                name : {
                    $regex : req.query.name,
                    $options : "i"
                }
            });
            return res.status(200).json({
                success : true,
                user
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    forgotPassword : async (req, res) => {
        try {
            const {email} = req.body;
            const user = await userSchema.findOne({email})

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "user doesnt exists"
                })
            }
            const resetPasswordToken = await user.generateResetToken();
            await user.save();

            const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;

            const message = "reset the password : \n"+resetUrl;
            try {
                await sendEmail({
                    email : user.email,
                    subject : "Reset Password",
                    message
                })
                res.status(200).json({
                    success : true,
                    message : `Email sent to ${user.email}`
                })
            } catch (error) {
                user.resetPassToken = undefined;
                user.resetPassExpire = undefined;
                await user.save();

                return res.status(500).json({
                    success : false,
                    message : error.message
                })
            }

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    resetPassToken : async (req, res) => {
        try {
            const resetPassToken = crypt.createHash('sha256').update(req.params.token).digest('hex');
            // expire date badi honi chahiye current waale se
            const user = await userSchema.findOne({
                resetPassToken,
            })

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "token expires"
                })
            }
            const {password} = req.body;
            if(!password){
                return res.status(400).json({
                    success : false,
                    message : "invalid password"
                }) 
            }
            user.password = req.body.password;
            user.resetPassToken = undefined;
            user.resetPassExpire = undefined;
            await user.save();

            return res.status(200).json({
                success : true,
                message : "password updated successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    getMyPosts : async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id);

            let posts = [];

            for(var i=0; i<user.post.length; i++){
                const post = await postSchema.findById(user.post[i]).populate("likes comments.user owner");
                posts.push(post);
            }
            return res.status(200).json({
                success : true,
                posts
            }) 
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

module.exports = userController;