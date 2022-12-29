import { useCallback, useMemo, useRef, useState } from 'react';
import { useInitService } from './useInitService';
import { useRatesService } from './useRatesService';

export const useAppService = () => {
  const { currencies, rates: initRates } = useInitService();
  const { rates } = useRatesService(initRates);
  const [message, setMessage] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState(true);

  const fiatCurrencies = useMemo(
    () => currencies.filter(({ type }) => type === 'fiat'),
    [currencies]
  );

  const cryptoCurrencies = useMemo(
    () => currencies.filter(({ type }) => type === 'crypto'),
    [currencies]
  );

  const loading = currencies.length === 0;

  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showMessage = useCallback(
    (
      message: string | null,
      success: boolean,
      durationInSeconds: number = 0
    ) => {
      clearTimeout(messageTimeoutRef.current);

      setMessage(message);
      setMessageSuccess(success);

      if (durationInSeconds > 0) {
        messageTimeoutRef.current = setTimeout(() => {
          showMessage(null, true);
        }, durationInSeconds * 1000);
      }
    },
    []
  );

  return {
    currencies,
    fiatCurrencies,
    cryptoCurrencies,
    rates: Object.keys(rates).length === 0 ? initRates : rates,
    loading,
    message,
    messageSuccess,
    showMessage,
  };
};
