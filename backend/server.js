const keyVaultService = require('./services/keyVaultService');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const postsRouter = require('./routes/posts');

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
app.use(express.static(path.join(__dirname,'..', 'frontend', 'build')));

// Enable CORS for all routes
app.use(cors());

// Use your postsRouter or other routes
app.use('/', postsRouter);

// Send the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

//start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});