const express = require('express');
const postController = require('../Controller/postController');
const middlewares = require('../middleware/authPost');
const postRouter = express.Router();

postRouter.route("/post/upload").post(middlewares.isAuthenticated,postController.createPost);
postRouter.route("/post/:id")
    .get(middlewares.isAuthenticated, postController.likeUnlikePost)
    .delete(middlewares.isAuthenticated, postController.deletePost);

module.exports = postRouter;