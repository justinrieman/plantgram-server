const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

// Get all posts
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Get all posts' });
});

//Get one post
router.get('/:postId', (req, res, next) => {
  const id = req.params.postId;
  res.status(200).json({ message: 'The id is ' + id });
});

//Make one post
router.post('/', (req, res, next) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.body,
    user: req.body.user,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  });

  newPost
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Post created successfully!',
        post: {
          _id: result._id,
          body: result.body,
          user: result.user,
          createdAt: result.createdAt,
          likeCount: result.likeCount,
          commentCount: result.commentCount,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Comment on a post
router.post('/:postId/comment', (req, res, next) => {
  const newComment = {
    username: 'user',
    postId: req.params.postId,
    body: req.body.body,
    createdAt: new Date().toISOString(),
  };

  res.status(200).json({ newComment });
});

//Edit post
router.patch('/:postId', (req, res, next) => {});

// Delete post
router.delete('/:postId', (req, res, next) => {});

module.exports = router;
