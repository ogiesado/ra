import { Schema, model, Types } from 'mongoose';
import currency from 'currency.js';
import {
  parseConversionSortFields,
  transfromConversionSortFields,
} from '../utils';
import {
  CurrencyCode,
  CurrencyName,
  getCurrencyCodes,
  getCurrencyFromCode,
} from '../utils/currency';

export type CONVERSION_TYPE = 'Live Price' | 'Exchanged';

export interface Conversion {
  id: string;
  fromCurrency: CurrencyCode;
  fromCurrencyName: CurrencyName;
  toCurrency: CurrencyCode;
  toCurrencyName: CurrencyName;
  fromAmount: number;
  formattedFromAmount: string;
  toAmount: number;
  formattedToAmount: string;
  rate: number;
  type: CONVERSION_TYPE;
  createdAt: string;
  isExchange: boolean;
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
        const { format } = new Intl.DateTimeFormat('en-GB', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        const fromCurrency = getCurrencyFromCode(this.fromCurrency);
        const toCurrency = getCurrencyFromCode(this.toCurrency);

        return {
          id: this._id.toString(),
          fromCurrency: this.fromCurrency,
          fromCurrencyName: fromCurrency.name,
          toCurrency: this.toCurrency,
          toCurrencyName: toCurrency.name,
          fromAmount: this.fromAmount,
          formattedFromAmount: currency(this.fromAmount, {
            symbol: '',
            precision: fromCurrency.precision,
          }).format(),
          toAmount: this.toAmount,
          formattedToAmount: currency(this.toAmount, {
            symbol: '',
            precision: toCurrency.precision,
          }).format(),
          rate: this.rate,
          type: this.type,
          createdAt: format(new Date(this.createdAt)),
          isExchange: this.type === 'Exchanged',
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

  const firstCount = page * perPage - perPage + 1;
  const lastCount = page * perPage > total ? total : page * perPage;

  const hasPreviousPage = page > 1;
  const hasNextPage = lastCount < total;

  const paginationCountText = `${firstCount} - ${lastCount} of ${new Intl.NumberFormat().format(
    total
  )}`;

  return {
    page,
    perPage,
    hasNextPage,
    hasPreviousPage,
    paginationCountText,
    total,
    sort: transfromConversionSortFields(sortings),
    data,
  };
};

export const getLatestLiveConversionRates = async (
  baseCurrencyCodes: CurrencyCode[],
  destinationCurrencyCodes: CurrencyCode[]
) => {
  const rates: Partial<
    Record<
      `${CurrencyCode}:${CurrencyCode}`,
      { id: string; value: number; key: string }
    >
  > = {};

  for (const fromCurrency of baseCurrencyCodes) {
    for (const toCurrency of destinationCurrencyCodes) {
      const conversion = await ConversionModel.findOne(
        { type: 'Live Price', fromCurrency, toCurrency },
        {},
        {
          sort: {
            createdAt: -1,
          },
        }
      );

      if (conversion) {
        const key = `${conversion.fromCurrency}:${conversion.toCurrency}`;

        rates[`${conversion.fromCurrency}:${conversion.toCurrency}`] = {
          value: conversion.rate,
          id: conversion.id,
          key,
        };
      }
    }
  }

  return rates;
};
