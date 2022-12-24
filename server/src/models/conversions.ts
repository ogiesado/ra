import { Schema, Types, model } from 'mongoose';
import { faker } from '@faker-js/faker';

export enum CURRENCY_TYPES {
  USD = 'USD',
  ETH = 'ETH',
  BTC = 'BTC',
}

export enum CONVERSION_TYPES {
  LIVE = 'LIVE',
  EXCHANGED = 'EXCHANGED',
}

export interface IConversion {
  id: Types.ObjectId;
  fromCurrency: CURRENCY_TYPES;
  toCurrency: CURRENCY_TYPES;
  fromAmount: string;
  toAmount: string;
  rate: string;
  type: CONVERSION_TYPES;
}

export const currencyField = {
  type: String,
  enum: Object.values(CURRENCY_TYPES),
  required: true,
};

export const amountField = {
  required: true,
  type: String,
};

const conversionSchema = new Schema<IConversion>(
  {
    fromCurrency: currencyField,
    toCurrency: currencyField,
    fromAmount: amountField,
    toAmount: amountField,
    rate: amountField,
    type: {
      type: String,
      required: true,
      enum: Object.values(CONVERSION_TYPES),
    },
  },
  { timestamps: true }
);

const Conversion = model('Conversion', conversionSchema);

export const seedConversions = async (number = 1) => {
  let count = 0;

  while (count < number) {
    const conversion = new Conversion({
      fromCurrency: faker.helpers.arrayElement(Object.values(CURRENCY_TYPES)),
      toCurrency: faker.helpers.arrayElement(Object.values(CURRENCY_TYPES)),
      toAmount: faker.finance.amount(),
      fromAmount: faker.finance.amount(),
      rate: faker.finance.amount(),
      type: faker.helpers.arrayElement(Object.values(CONVERSION_TYPES)),
    });

    await conversion.save();
    count++;
  }
};

export default Conversion;
