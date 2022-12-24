import { Conversion, createLivePriceConversion } from '../models';
import { Currency, CurrencyCode } from '../utils/currency';

export type Rates = {
  [Property in CurrencyCode]: number;
};

const fetchCurrencyRates = async (currencyCode: CurrencyCode = 'USD') => {
  const response = await fetch(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currencyCode}`
  );

  const { data } = await response.json();

  return data.rates as Rates;
};

export const updateRates = async (
  baseCurrencies: Currency[],
  toCurrencyCode: CurrencyCode = 'USD'
) => {
  const updates: Conversion[] = [];

  for (let baseCurrency of baseCurrencies) {
    const baseCurrencyCode = baseCurrency.code;

    const rates = await fetchCurrencyRates(baseCurrencyCode);

    if (toCurrencyCode in rates) {
      const rate = rates[toCurrencyCode];

      const conversion = await createLivePriceConversion(
        baseCurrencyCode,
        toCurrencyCode,
        rate
      );

      updates.push(conversion.toApi());
    }
  }

  return updates;
};

export const startRateUpdates = async (
  baseCurrencies: Currency[],
  updateIntervalInSeconds: number = 60
) => {
  const updates = await updateRates(baseCurrencies);

  setTimeout(
    () => startRateUpdates(baseCurrencies, updateIntervalInSeconds),
    updateIntervalInSeconds * 1000
  );

  console.log('updates ', updates);
};
