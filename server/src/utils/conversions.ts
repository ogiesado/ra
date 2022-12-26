/**
 * a helper to parse and validate sort fields
 */
export const parseConversionSortFields = (
  sort = ''
): Record<string, 1 | -1> => {
  const sortings = sort.split(',').reduce((sortings, fieldOrder) => {
    const [field, order] = fieldOrder.split(':');
    if (
      [
        'createdAt',
        'fromCurrency',
        'toCurrency',
        'rate',
        'type',
        'toAmount',
        'fromAmount',
      ].includes(field) &&
      ['asc', 'desc'].includes(order)
    ) {
      return { ...sortings, [field]: order === 'asc' ? 1 : -1 };
    }

    return sortings;
  }, {});

  return sortings;
};

/**
 * a helper to transform sort fields
 */
export const transfromConversionSortFields = (
  sortings: Record<string, 1 | -1> = {}
) => {
  const sort = Object.entries(sortings).reduce(
    (sort, [field, order], index, list) => {
      return `${sort}${field}:${order === 1 ? 'asc' : 'desc'}${
        index < list.length - 1 ? ',' : ''
      }`;
    },
    ''
  );

  return sort;
};
