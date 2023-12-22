const keyVaultService = require('./services/keyVaultService');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const secretName = 'CosmosDBConnectionString';
let db;
async function getBDConnectionString() {
  try {
    const secretValue = await keyVaultService.getSecret(secretName);
    console.log(`Secret Value: ${secretValue}`);
    mongoose.connect(secretValue, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to Cosmos DB');
    });

  } catch (error) {
    console.error('Failed to retrieve secret:', error.message);
  }
}
getBDConnectionString();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const Post = require('./models/Post');

// API route to get a list of blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to get an individual blog post
app.get('/api/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create a new blog post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});