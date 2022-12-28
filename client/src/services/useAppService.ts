import { useInitService } from './useInitService';
import { useRatesService } from './useRatesService';

export const useAppService = () => {
  const { currencies, rates: initRates } = useInitService();
  const { rates } = useRatesService(initRates);

  return {
    currencies,
    rates: Object.keys(rates).length === 0 ? initRates : rates,
    loading: currencies.length === 0, // makeshift is loading
  };
};
