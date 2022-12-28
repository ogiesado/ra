import { Router } from 'express';
import {
  createExchangedConversion,
  getConversionById,
  getPaginatedConversions,
} from '../models';
import { getCurrencyCodes, makeCurrencyConverter } from '../utils';

export const conversions = Router();

/**
 * Handle the request to get conversions
 */
conversions.get('/', async (req, res) => {
  const page = Number(req.query.page) || undefined;
  const perPage = Number(req.query.perPage) || undefined;
  const sort = req.query.sort as string;

  const result = await getPaginatedConversions(page, perPage, sort);

  return res.send(result);
});

/**
 * Handle the saving of conversions
 */
conversions.post('/', async (req, res) => {
  const { valid, message } = validateSaveConversionRequest(req.body);

  if (!valid) {
    return res.status(400).send({ message });
  }

  const { fromCurrency, toCurrency, fromAmount, rateId } = req.body;

  const conversionRate = await getConversionById(rateId); // get the rate to be used for the conversion

  const validCurrencies = [fromCurrency, toCurrency];

  if (
    !conversionRate ||
    !validCurrencies.includes(conversionRate.fromCurrency) ||
    !validCurrencies.includes(conversionRate.toCurrency)
  ) {
    return res.status(400).send({ message: 'Conversion rate is not valid.' });
  }

  const convert = makeCurrencyConverter({
    fromAmount: conversionRate.fromAmount,
    fromCurrencyCode: conversionRate.fromCurrency,
    toAmount: conversionRate.toAmount,
    toCurrencyCode: conversionRate.toCurrency,
  });

  const conversionResult = convert(fromAmount as number, fromCurrency);

  if ('error' in conversionResult) {
    return res.status(400).send({ message: conversionResult.error });
  }

  const conversion = await createExchangedConversion(
    fromCurrency,
    fromAmount,
    toCurrency,
    conversionResult.value,
    conversionResult.rate
  );

  return res.send(conversion);
});

/**
 * Vaildates the request to save a conversion
 */
const validateSaveConversionRequest = (data: Record<string, any>) => {
  const { fromCurrency, toCurrency, fromAmount, rateId } = data;

  const currencyCodes = getCurrencyCodes();

  if (!currencyCodes.includes(fromCurrency)) {
    return { message: 'A valid from currency is required.', valid: false };
  }

  if (!currencyCodes.includes(toCurrency)) {
    return { message: 'A valid to currency is required.', valid: false };
  }

  if (typeof fromAmount !== 'number' || Number.isNaN(fromAmount)) {
    return { message: 'A valid from amount is required.', valid: false };
  }

  if (typeof rateId !== 'string') {
    return { message: 'A valid conversion rate is required.', valid: false };
  }

  return { valid: true };
};
