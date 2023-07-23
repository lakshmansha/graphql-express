const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
