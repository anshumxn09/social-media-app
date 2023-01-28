const express = require('express');
const userController = require('../Controller/userController');
const userRouter = express.Router();

userRouter.route("/register").post(userController.register);
userRouter.route("/login").post(userController.login);

module.exports = userRouter;