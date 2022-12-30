import currency from 'currency.js';

// export type CurrencyCode = 'BTC' | 'ETH' | 'GBP' | 'USD';

// export interface Currency {
//   name: string;
//   type: 'crypto' | 'fiat';
//   code: CurrencyCode;
//   precision: number;
// }

/**
 * Supported currencies
 */
// const currencies: Currency[] = [
//   { name: 'Bitcoin', type: 'crypto', code: 'BTC', precision: 8 },
//   { name: 'Ethereum', type: 'crypto', code: 'ETH', precision: 8 },
//   { name: 'US Dollars', type: 'fiat', code: 'USD', precision: 2 },
//   { name: 'British Pounds', type: 'fiat', code: 'GBP', precision: 2 },
// ];

const currencies = [
  { name: 'Bitcoin', type: 'crypto', code: 'BTC', precision: 8 },
  { name: 'Ethereum', type: 'crypto', code: 'ETH', precision: 8 },
  { name: 'US Dollars', type: 'fiat', code: 'USD', precision: 2 },
  { name: 'British Pounds', type: 'fiat', code: 'GBP', precision: 2 },
] as const;

export type CurrencyCode = typeof currencies[number]['code'];
export type CurrencyName = typeof currencies[number]['name'];
export type Currency = typeof currencies[number];

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

export const getCurrencyPrecision = (code: CurrencyCode) => {
  return getCurrencies().find((currency) => currency.code === code)?.precision;
};

export const getCurrencyNameFromCode = (code: CurrencyCode) => {
  return getCurrencies().find((currency) => currency.code === code)
    ?.name as CurrencyName;
};

export const getCurrencyFromCode = (code: CurrencyCode) => {
  return getCurrencies().find((currency) => currency.code === code) as Currency;
};

/**
 * A util to help convert currency from a base conversion
 */
export const makeCurrencyConverter = ({
  fromCurrencyCode,
  toCurrencyCode,
  fromAmount,
  toAmount,
}: {
  fromCurrencyCode: CurrencyCode;
  toCurrencyCode: CurrencyCode;
  fromAmount: number;
  toAmount: number;
}) => {
  return (amount: number, currencyCode: CurrencyCode) => {
    if (![fromCurrencyCode, toCurrencyCode].includes(currencyCode)) {
      return {
        error: `The currency ${currencyCode} is not valid for the rates ${fromCurrencyCode}:${toCurrencyCode}.`,
      };
    }

    if (currencyCode === fromCurrencyCode) {
      const value = currency(amount, {
        precision: getCurrencyPrecision(toCurrencyCode),
      }).multiply(toAmount).value;

      const rate = currency(1, {
        precision: getCurrencyPrecision(toCurrencyCode),
      }).divide(toAmount).value;

      return {
        currencyCode: toCurrencyCode,
        value,
        rate,
      };
    }

    if (currencyCode === toCurrencyCode) {
      const value = currency(amount, {
        precision: getCurrencyPrecision(toCurrencyCode),
      }).divide(toAmount).value;

      const rate = currency(1, {
        precision: getCurrencyPrecision(toCurrencyCode),
      }).multiply(toAmount).value;

      return {
        currencyCode: toCurrencyCode,
        value,
        rate,
      };
    }

    const value = currency(amount, {
      precision: getCurrencyPrecision(toCurrencyCode),
    })
      .multiply(toAmount)
      .divide(fromAmount).value;

    const rate = currency(1, {
      precision: getCurrencyPrecision(toCurrencyCode),
    })
      .multiply(toAmount)
      .divide(fromAmount).value;

    return {
      currencyCode: toCurrencyCode,
      value,
      rate,
    };
  };
};
