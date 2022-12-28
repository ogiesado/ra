import cors from 'cors';
import express from 'express';
import { connectDb } from './models';
import * as routes from './routes';
import { startRateUpdates } from './services';
import { getCryptoCurrencies, getFiatCurrencies } from './utils/currency';
import { upgradeWebSocketConnection, websocketBroadcast } from './ws';

const HOST_PORT = process.env.HOST_PORT;
const SERVER_PORT = process.env.SERVER_PORT;
const RATES_UPDATE_INTERVAL_IN_SECONDS =
  Number(process.env.RATES_UPDATE_INTERVAL_IN_SECONDS as string) || 60;

// create the express app
const app = express();

// setup middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup route handlers
app.use('/init', routes.init);
app.use('/conversions', routes.conversions);

// connect to the database
connectDb().then(async () => {
  // then start updating currency rates
  await startRateUpdates(
    getCryptoCurrencies(), // use crypto as base currency
    getFiatCurrencies(), // use fiat as destination currency
    RATES_UPDATE_INTERVAL_IN_SECONDS,
    websocketBroadcast // boradcast rates to ws connections
  );

  app
    // then start listening for incoming connections
    .listen(SERVER_PORT, () =>
      console.log(`Server running on the host port: ${HOST_PORT}`)
    )
    // handle upgrading to ws requests
    .on('upgrade', upgradeWebSocketConnection);
});
