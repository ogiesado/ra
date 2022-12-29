import { Router } from 'express';
import { getLatestLiveConversionRates } from '../models';
import { getCurrencies, getCurrencyCodes } from '../utils';

export const init = Router();

/**
 * Handle the request to get initialisation data
 */
init.get('/', async (req, res) => {
  const currencies = getCurrencies();

  const rates = await getLatestLiveConversionRates(
    getCurrencyCodes(),
    getCurrencyCodes()
  );

  return res.send({ rates, currencies });
});
