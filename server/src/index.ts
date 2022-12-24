import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { connectDb, seedConversions } from './models';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  seedConversions(5);
});

app.get('/', (req, res) => {
  res.send('Hello Ogie Sado !' + uuidv4());
});
