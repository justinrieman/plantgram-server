const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  body: { type: String, required: true },
  createdAt: String,
  likeCount: Number,
  commentCount: Number,
});

module.exports = mongoose.model('Post', postSchema);
