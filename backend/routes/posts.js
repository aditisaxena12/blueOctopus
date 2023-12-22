const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// API route to get a list of blog posts
router.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Other routes (create, update, delete) can be added as needed
  
  module.exports = router;