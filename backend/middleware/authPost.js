const userSchema = require("../Schema/userSchema");
const jwt = require('jsonwebtoken');

const middlewares = {
    isAuthenticated : async (req, res, next) => {
        try {
            const {token} = req.cookies;
            if(!token){
                return res.status(401).json({
                    success : false,
                    message : "kindly login first"
                })
            }
            const decoded = await jwt.verify(token, process.env.KEY);
            req.user = await userSchema.findById(decoded._id);
            next();
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = middlewares;