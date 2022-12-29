import { useCallback, useEffect, useState } from 'react';
import { Conversion, Rate } from '../types';

export const useRatesService = (initRates: Rate = {}) => {
  const [rates, setRates] = useState(initRates);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081/rates');

    socket.addEventListener('message', (event) => {
      const data: Conversion = JSON.parse(event.data);

      if ('message' in data) return;

      setRates((rates) => ({
        ...rates,
        [`${data.fromCurrency}:${data.toCurrency}`]: {
          id: data.id,
          value: data.rate,
        },
      }));
    });

    return () => socket.close();
  }, []);

  return { rates };
};
