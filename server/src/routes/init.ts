import { Router } from 'express';
import {
  createExchangedConversion,
  getConversionById,
  getLatestLiveConversionRates,
  getPaginatedConversions,
} from '../models';
import {
  getCryptoCurrencyCodes,
  getCurrencies,
  getFiatCurrencyCodes,
} from '../utils';

export const init = Router();

/**
 * Handle the request to get initialisation data
 */
init.get('/', async (req, res) => {
  const currencies = getCurrencies();

  const rates = await getLatestLiveConversionRates(
    getCryptoCurrencyCodes(),
    getFiatCurrencyCodes()
  );

  return res.send({ rates, currencies });
});
