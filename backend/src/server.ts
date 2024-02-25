import express, { Request, Response } from 'express';
import {CosmosClient} from '@azure/cosmos';
import path from 'path';

const app = express();
const port = 8080;

// Define the directory where your frontend build files are located
const staticDir = path.join(__dirname,'..','..','frontend', 'build');

// Serve static files from the 'build' directory
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});