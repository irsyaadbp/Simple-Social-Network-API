"use strict";

const express = require("express");
const {
  getPosts,
  createPost,
  getPostsByUser,
  postById,
  isOwnerPost,
  updatePost,
  deletePost
} = require("../controllers/postController");
const { requireSignIn } = require("../controllers/authController");
const { userById } = require("../controllers/userController");
const { createPostsValidator } = require("../validators/index");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignIn,
  createPost,
  createPostsValidator
);
router.get("/posts/by/:userId", requireSignIn, getPostsByUser);
router.put("/post/:postId", requireSignIn, isOwnerPost, updatePost);
router.delete("/post/:postId", requireSignIn, isOwnerPost, deletePost);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);
//any route containing :userId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;
