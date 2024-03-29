const express = require('express');
const userController = require('../Controller/userController');
const middlewares = require('../middleware/authPost');
const userRouter = express.Router();

userRouter.route("/register").post(userController.register);
userRouter.route("/login").post(userController.login);
userRouter.route("/logout").get(middlewares.isAuthenticated, userController.logout);

userRouter.route("/forgot/password").post(userController.forgotPassword);
userRouter.route("/password/reset/:token").put(userController.resetPassToken)
userRouter.route("/update/password").put(middlewares.isAuthenticated, userController.updatePassword);
userRouter.route("/update/profile")
    .put(middlewares.isAuthenticated, userController.updateProfile)

userRouter.route("/me/posts").get(middlewares.isAuthenticated, userController.getMyPosts);
userRouter.route("/me")
    .delete(middlewares.isAuthenticated, userController.deleteMyProfile)
    .get(middlewares.isAuthenticated, userController.showMyProfile)

userRouter.route("/user/:id").get(middlewares.isAuthenticated, userController.getUserProfile)
userRouter.route("/user/post/:id").get(middlewares.isAuthenticated, userController.getUserPosts)
userRouter.route("/users").get(middlewares.isAuthenticated, userController.getAllUser)
userRouter.route("/follow/:id").get( middlewares.isAuthenticated,userController.followUser)

module.exports = userRouter;