const express = require('express');
const postController = require('../Controller/postController');
const middlewares = require('../middleware/authPost');
const postRouter = express.Router();

postRouter.route("/post/upload").post(middlewares.isAuthenticated,postController.createPost);

postRouter.route("/post/:id")
    .get(middlewares.isAuthenticated, postController.likeUnlikePost)
    .delete(middlewares.isAuthenticated, postController.deletePost)
    .put(middlewares.isAuthenticated, postController.updateCaption)

postRouter.route("/post/comment/:id")
    .post(middlewares.isAuthenticated, postController.addComment)
    .delete(middlewares.isAuthenticated, postController.deleteComment)

postRouter.route("/post")
    .get(middlewares.isAuthenticated, postController.getPosts)
module.exports = postRouter;