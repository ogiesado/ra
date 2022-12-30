export interface Conversion {
  id: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  toAmount: number;
  rate: number;
  type: 'Live Price' | 'Exchanged';
}

export type Rate = Partial<Record<RateKey, RateValue>>;

export type RateKey =
  | 'BTC:ETH'
  | 'BTC:GBP'
  | 'BTC:USD'
  | 'ETH:BTC'
  | 'ETH:GBP'
  | 'ETH:USD'
  | 'GBP:BTC'
  | 'GBP:ETH'
  | 'GBP:USD'
  | 'USD:BTC'
  | 'USD:ETH'
  | 'USD:GBP'
  | 'BTC:BTC'
  | 'ETH:ETH'
  | 'GBP:GBP'
  | 'USD:USD';

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
