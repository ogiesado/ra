import { useCallback } from 'react';
import { Currency } from '../types';

export const useSaveConversionsService = () => {
  const saveConversion = useCallback(
    async (
      data: {
        fromCurrency: Currency['code'];
        toCurrency: Currency['code'];
        fromAmount: number;
        rateId: string;
      },
      callback: (error?: string) => void
    ) => {
      const response = await fetch('http://localhost:8081/conversions', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 400) {
        callback(result.message as string);
      }

      if (response.status === 200) {
        callback();
      }
    },
    []
  );

  return { saveConversion };
};
