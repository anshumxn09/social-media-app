const userSchema = require("../Schema/userSchema")

const userController = {
    register : async (req, res) => {
        try {
            const {name , email, password} = req.body
            let user = await userSchema.findOne({email})
            if(user){
                return res.status(404).json({
                    success : false,
                    message : "user already exists"
                })
            }
            user = new userSchema({name, email, password ,
                avatar : {
                    public_id : "sample_url",
                    url : "sample_url"
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
            const {email, password} = req.body;
            const user = await userSchema.findOne({email}).select("+password"); //because we have mention in schema that select none
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
    }
}

module.exports = userController;