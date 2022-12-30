import currency from 'currency.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSaveConversionsService } from '../../services';
import { Currency, Rate, RateValue } from '../../types';

export const useExchangeWidget = (
  rates: Rate,
  fromCurrencies: Currency[],
  toCurrencies: Currency[],
  onExchange: (success: boolean, message: string) => void
) => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(fromCurrencies[0]);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<Currency>(toCurrencies[0]);
  const [toAmount, setToAmount] = useState<string>('');
  const [rate, setRate] = useState<RateValue | null>(null);
  const [disableWidget, setDisableWidget] = useState(false);

  const { saveConversion } = useSaveConversionsService();

  const disableSaveButton = useMemo(() => {
    const inavlidAmountValues = ['', '0'];
    return (
      inavlidAmountValues.includes(fromAmount) ||
      inavlidAmountValues.includes(toAmount)
    );
  }, [fromAmount, toAmount]);

  const updateFromAmount = (
    fromAmount: string,
    fromCurrency: Currency,
    toCurrency: Currency
  ) => {
    const rate = rates[`${fromCurrency.code}:${toCurrency.code}`];

    if (!rate) return;

    const newToAmount = currency(fromAmount, {
      precision: toCurrency.precision,
    }).multiply(rate.value).value;

    setFromAmount(fromAmount);
    setToAmount(String(newToAmount));
    setRate(rate);
  };

  const updateToAmount = (
    toAmount: string,
    toCurrency: Currency,
    fromCurrency: Currency
  ) => {
    const rate = rates[`${toCurrency.code}:${fromCurrency.code}`];

    if (!rate) return;

    const newFromAmount = currency(toAmount, {
      precision: fromCurrency.precision,
    }).multiply(rate.value).value;

    setToAmount(toAmount);
    setFromAmount(String(newFromAmount));
    setRate(rate);
  };

  const handleFromAmountChange = (fromAmount: string) => {
    updateFromAmount(fromAmount, fromCurrency, toCurrency);
  };

  const handleToAmountChange = (toAmount: string) => {
    updateToAmount(toAmount, toCurrency, fromCurrency);
  };

  const handleToCurrencyChange = (toCurrency: Currency) => {
    setToCurrency(toCurrency);

    if (fromAmount !== '') {
      updateFromAmount(fromAmount, fromCurrency, toCurrency);
    }
  };

  const handleFromCurrencyChange = (fromCurrency: Currency) => {
    setFromCurrency(fromCurrency);

    if (fromAmount !== '') {
      updateFromAmount(fromAmount, fromCurrency, toCurrency);
    }
  };

  const handleOnSave = () => {
    if (disableSaveButton) return;

    setDisableWidget(true);

    const data = {
      fromCurrency: fromCurrency.code,
      toCurrency: toCurrency.code,
      fromAmount: parseInt(fromAmount, 10),
      rateId: rate?.id as string,
    };

    saveConversion(data, (error) => {
      if (error) onExchange(false, error);
      else onExchange(true, 'Exchange Submitted.');

      setDisableWidget(false);

      setFromAmount('');
      setToAmount('');
      setRate(null);
    });
  };

  const cacheRef = useRef({ fromAmount, fromCurrency, toCurrency });
  cacheRef.current = { fromAmount, fromCurrency, toCurrency };

  useEffect(() => {
    if (rate) {
      const { fromAmount, fromCurrency, toCurrency } = cacheRef.current;
      updateFromAmount(fromAmount, fromCurrency, toCurrency);
    }
  }, [rates]);

  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    disableWidget,
    disableSaveButton,
    onFromAmountChange: handleFromAmountChange,
    onToAmountChange: handleToAmountChange,
    onFromCurrencyChange: handleFromCurrencyChange,
    onToCurrencyChange: handleToCurrencyChange,
    onSave: handleOnSave,
  };
};
