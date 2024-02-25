import express, { Request, Response } from 'express';
import {CosmosClient} from '@azure/cosmos';

const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});