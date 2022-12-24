import { Schema, model } from 'mongoose';
import { CurrencyCode, getCurrencyCodes } from '../utils/currency';

export type CONVERSION_TYPE = 'Live Price' | 'Exchanged';

export interface Conversion {
  id: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  fromAmount: number;
  toAmount: number;
  rate: number;
  type: CONVERSION_TYPE;
}

export const currencyField = {
  type: String,
  enum: Object.values(getCurrencyCodes()),
  required: true,
};

export const amountField = {
  required: true,
  type: Number,
};

const conversionSchema = new Schema<Conversion & { toApi: () => Conversion }>(
  {
    fromCurrency: currencyField,
    toCurrency: currencyField,
    fromAmount: amountField,
    toAmount: amountField,
    rate: amountField,
    type: {
      type: String,
      required: true,
      enum: ['Live Price', 'Exchanged'],
    },
  },
  {
    timestamps: true,
    methods: {
      toApi() {
        return {
          id: this._id.toString(),
          fromCurrency: this.fromCurrency,
          toCurrency: this.toCurrency,
          fromAmount: this.fromAmount,
          toAmount: this.toAmount,
          rate: this.rate,
          type: this.type,
        };
      },
    },
  }
);

const ConversionModel = model('Conversion', conversionSchema);

export const createConversion = async (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  fromAmount: number,
  toAmount: number,
  rate: number,
  type: CONVERSION_TYPE
) => {
  const conversion = new ConversionModel({
    fromCurrency,
    toCurrency,
    toAmount,
    fromAmount,
    rate,
    type,
  });

  await conversion.save();

  return conversion;
};

export const createLivePriceConversion = async (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rate: number
) => {
  return createConversion(
    fromCurrency,
    toCurrency,
    1,
    rate,
    rate,
    'Live Price'
  );
};

export default ConversionModel;
