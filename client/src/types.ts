export interface Conversion {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  type: 'Live Price' | 'Exchanged';
}

export type Rate = Partial<
  Record<
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
    | 'USD:GBP',
    number
  >
>;

export interface Currency {
  name: string;
  type: 'crypto' | 'fiat';
  code: string;
  precision: number;
}
