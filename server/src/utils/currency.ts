export type CurrencyCode = 'BTC' | 'ETH' | 'GBP' | 'USD';

export interface Currency {
  name: string;
  type: 'crypto' | 'fiat';
  code: CurrencyCode;
}

/**
 * Supported currencies
 */
const currencies: Currency[] = [
  { name: 'Bitcoin', type: 'crypto', code: 'BTC' },
  { name: 'Ethereum', type: 'crypto', code: 'ETH' },
  { name: 'US Dollars', type: 'fiat', code: 'USD' },
  { name: 'British Pounds', type: 'fiat', code: 'GBP' },
];

export const getCurrencies = () => {
  return [...currencies];
};

export const getCurrencyCodes = () => {
  return getCurrencies().map(({ code }) => code);
};

export const getFiatCurrencies = () => {
  return getCurrencies().filter(({ type }) => type === 'fiat');
};

export const getFiatCurrencyCodes = () => {
  return getFiatCurrencies().map(({ code }) => code);
};

export const getCryptoCurrencies = () => {
  return getCurrencies().filter(({ type }) => type === 'crypto');
};

export const getCryptoCurrencyCodes = () => {
  return getCryptoCurrencies().map(({ code }) => code);
};
