import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { connectDb } from './models';
import { startRateUpdates } from './services';
import { getCryptoCurrencies } from './utils/currency';

const SERVER_PORT = process.env.SERVER_PORT;
const RATES_UPDATE_INTERVAL_IN_SECONDS =
  Number(process.env.RATES_UPDATE_INTERVAL_IN_SECONDS as string) || 60;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(async () => {
  await startRateUpdates(
    getCryptoCurrencies(),
    RATES_UPDATE_INTERVAL_IN_SECONDS
  );

  app.listen(SERVER_PORT, () =>
    console.log(`Server running on port: ${SERVER_PORT}`)
  );
});

app.get('/', (req, res) => {
  res.send('Hello Ogie! ' + uuidv4());
});
