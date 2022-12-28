import { useCallback, useEffect, useState } from 'react';
import { Currency, Rate } from '../types';

export const useInitService = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [rates, setRates] = useState<Rate>({});

  const fetchInitData = useCallback(async () => {
    const response = await fetch('http://localhost:8081/init');

    const data = await response.json();

    setCurrencies(data.currencies);
    setRates(data.rates);
  }, []);

  useEffect(() => {
    fetchInitData();
  }, []);

  return { currencies, rates };
};
