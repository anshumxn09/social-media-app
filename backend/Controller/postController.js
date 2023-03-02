const postSchema = require("../Schema/postSchema");
const userSchema = require("../Schema/userSchema");
const cloudinary = require("cloudinary");

const postController = {
    createPost : async (req, res) => {
        try {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
                folder : "Post"
            })

            const makePostData = {
                caption : req.body.caption,
                image : {
                    public_id : myCloud.public_id,
                    url : myCloud.secure_url
                },
                owner : req.user._id
            };

            const makePost = new postSchema(makePostData)
            const user = await userSchema.findById(req.user._id);
            user.post.unshift(makePost._id);

            await makePost.save();
            await user.save();

            res.status(201).json({
                success : true,
                message : "Post Created"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    deletePost : async (req, res) => {
        try {
            const post = await postSchema.findById(req.params.id);
            if(!post){
                return res.status(400).json({
                    success : false,
                    message : "post doesn't exist"
                })
            }

            if(post.owner.toString() !== req.user._id.toString()){
                return res.status(404).json({
                    success : false,
                    message : "invalid authentication"
                })
            }

            await cloudinary.v2.uploader.destroy(post.image.public_id);

            await post.remove();
            const user = await userSchema.findById(req.user._id);
            user.post.splice(user.post.indexOf(req.params.id), 1);
            await user.save();

            return res.status(200).json({
                success : true,
                message : "deleted successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    likeUnlikePost : async (req, res) => {
        try {
            let like = true;
            const post = await postSchema.findById(req.params.id);
            if(!post){
                return res.status(200).json({
                    success : false,
                    message : "post doesn't exists"
                })
            }
            // console.log(post)
            if(post.likes.includes(req.user._id)){
                const index = post.likes.indexOf(req.user._id);
                // kahanse delete karna aur kitne delete karna hai
                post.likes.splice(index, 1);
                like = false;
                await post.save();
            }else{
                post.likes.push(req.user._id);
                like = true
                await post.save();
            }

            let message;
            if(like){
                message = "you've liked this post"
            }else message = "yo've unliked this post"
            res.status(200).json({
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
    // most important getpost of the following
    getPosts : async (req, res) => {
        try {
            // One Way
            // const user = await userSchema.findById(req.user._id).populate('following', 'post');
            // following field mein user ki id hai agar hume uski saari details chahiye toh .populate('field_name') karke jiski bhi id hogi wo mil jaayegi aur agar koi specific uski field chahiye toh buss .populate('following', 'post'); all these is happening just because of the foreign key

            const user = await userSchema.findById(req.user._id);
            // har post ka owner check karo agar wo mere following mein hai toh uski post dedo

            const posts = await postSchema.find({
                owner : {
                    $in : user.following,
                }
            }).populate("owner likes comments.user")

            return res.status(200).json({
                success : true,
                posts : posts.reverse()
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    updateCaption : async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id);
            const post = await postSchema.findById(req.params.id);

            if(!post){
                return res.status(400).json({
                    success : false,
                    message : "post doesn't exists"
               })
            }

            if(user._id.toString() !== post.owner.toString()){
                return res.status(400).json({
                    success : false,
                    message : "invalid authentication"
               })
            }

            const {caption} = req.body;

            if(caption){
                post.caption = caption;
            }

            await post.save();
 
            return res.status(200).json({
                 success : true,
                 message : "post updated successfully"
            })
 
         } catch (error) {
             return res.status(500).json({
                 success : false,
                 message : error.message
             })
         }
    },
    addComment : async (req, res) => {
        try { 
            const post = await postSchema.findById(req.params.id);
            if(!post){
                return res.status(200).json({
                    success : true,
                    message : 'post doesnt exists'
                })    
            }  
            const {comment} = req.body;
            if(!comment){
                return res.status(400).json({
                    success : false,
                    message : "comment is required"
                })
            }   

            post.comments.push({user : req.user._id, comment})
            await post.save();
            
            return res.status(200).json({
                success : true,
                message :  "comment added successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message :  error.message
            })
        }
    },
    deleteComment : async (req, res) => {
        try {
         const post = await postSchema.findById(req.params.id);
         if(!post){
            return res.status(400).json({
                success : false,
                message : "post not found"
            })
        }
        
        if(post.owner.toString() === req.user._id.toString()){
            const { commentId } = req.body;
            if(!commentId){
                return res.status(400).json({
                    success : false,
                    message : "selected id doesnt found"
                })
            }
            post.comments.forEach(async (elem,index) => {
                if(elem._id.toString() === commentId.toString()){
                    return post.comments.splice(index, 1)
                }
            })
            await post.save();
            return res.status(200).json({
                success : true,
                message : "comments has been deleted"
            })
        }else{
            post.comments.forEach(async (elem,index) => {
                if(elem.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index, 1)
                }
            })
            await post.save();
            return res.status(200).json({
                success : true,
                message : "your comment has been deleted"
            })
        }
        } catch (error) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

module.exports = postController;