const express = require('express');
const router = express.Router();

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
  const newPost = {
    body: req.body.body,
    user: req.body.user,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  res.status(200).json(newPost);
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
