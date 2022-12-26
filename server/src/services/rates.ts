import { createLivePriceConversion } from '../models';
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

/**
 * Uses the API to get the rates for each base currency in the toCurrency
 */
export const updateRates = async (
  baseCurrencies: Currency[],
  toCurrencyCode: CurrencyCode = 'USD',
  onUpdate?: (data: any) => void
) => {
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

      if (onUpdate) {
        // notify if on update is requested
        onUpdate(conversion);
      }
    }
  }
};

/**
 * Starts updating currency rates by calling itself again after the interval
 */
export const startRateUpdates = async (
  baseCurrencies: Currency[],
  destinationCurrencies: Currency[],
  updateIntervalInSeconds: number = 60,
  onUpdate?: (data: any) => void
) => {
  // for each destination currency in this case (fiats) we get the rates in the base currencies (crypto) currencies
  for (let { code: toCurrencyCode } of destinationCurrencies) {
    await updateRates(baseCurrencies, toCurrencyCode, onUpdate);
  }

  setTimeout(
    () =>
      startRateUpdates(
        baseCurrencies,
        destinationCurrencies,
        updateIntervalInSeconds,
        onUpdate
      ),
    updateIntervalInSeconds * 1000
  );
};
