export interface Conversion {
  id: string;
  fromCurrency: Currency['code'];
  toCurrency: Currency['code'];
  fromAmount: number;
  toAmount: number;
  rate: number;
  type: 'Live Price' | 'Exchanged';

  fromCurrencyName: string;
  toCurrencyName: string;
  formattedFromAmount: string;
  formattedToAmount: string;
  createdAt: string;
  isExchange: boolean;
}

export type Rate = Partial<Record<RateKey, RateValue>>;

export type RateKey = `${Currency['code']}:${Currency['code']}`;

export type RateValue = {
  id: string;
  value: number;
  key: RateKey;
};

export interface Currency {
  name: string;
  type: 'crypto' | 'fiat';
  code: 'BTC' | 'ETH' | 'GBP' | 'USD' | 'ETH';
  precision: number;
}

export type ConversionField =
  | 'createdAt'
  | 'fromCurrency'
  | 'toCurrency'
  | 'rate'
  | 'type'
  | 'toAmount'
  | 'fromAmount';
