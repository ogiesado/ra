import { Schema, model, Types } from 'mongoose';
import {
  parseConversionSortFields,
  transfromConversionSortFields,
} from '../utils';
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

const currencyField = {
  type: String,
  enum: Object.values(getCurrencyCodes()),
  required: true,
};

const amountField = {
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

export const ConversionModel = model('Conversion', conversionSchema);

/**
 * A util to create a Conversion in the database
 */
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

  return conversion.toApi();
};

/**
 * A util to create a live orice Conversion in the database
 */
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

/**
 * A util to create a exchanged Conversion in the database
 */
export const createExchangedConversion = async (
  fromCurrency: CurrencyCode,
  fromAmount: number,
  toCurrency: CurrencyCode,
  toAmount: number,
  rate: number
) => {
  return createConversion(
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    rate,
    'Exchanged'
  );
};

/**
 * A util to get a conversion
 */
export const getConversionById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;

  const conversion = await ConversionModel.findById(id);

  return conversion ? conversion.toApi() : null;
};

/**
 * A util to get paginated conversions
 */
export const getPaginatedConversions = async (
  page = 1,
  perPage = 5,
  sort = ''
) => {
  const limit = perPage < 1 || perPage > 50 ? 5 : perPage;
  const skip = page <= 1 ? 0 : (page - 1) * limit;

  const sortings = parseConversionSortFields(sort);

  const data = (
    await ConversionModel.find().limit(limit).skip(skip).sort(sortings)
  ).map((conversion) => conversion.toApi());

  const total = await ConversionModel.find().countDocuments();

  return {
    page,
    perPage,
    total,
    sort: transfromConversionSortFields(sortings),
    data,
  };
};
