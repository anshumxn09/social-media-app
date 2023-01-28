const postSchema = require("../Schema/postSchema");
const userSchema = require("../Schema/userSchema");

const postController = {
    createPost : async (req, res) => {
        try {
            const makePostData = {
                caption : req.body.caption,
                image : {
                    public_id : "sample_url",
                    url : "sample_url"
                },
                owner : req.user._id
            };

            const makePost = new postSchema(makePostData)
            const user = await userSchema.findById(req.user._id);
            user.post.push(makePost._id);

            await makePost.save();
            await user.save();

            res.status(201).json({
                success : true,
                post : makePost
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
                await post.save();
            }
            res.status(200).json({
                success : true,
                like
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

module.exports = postController