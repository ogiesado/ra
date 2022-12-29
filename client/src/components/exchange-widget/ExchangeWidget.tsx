import { Currency, Rate } from '../../types';
import { AmountField } from '../AmountField';
import { SelectField } from '../SelectField';
import { useExchangeWidget } from './useExchangeWidget';

export const ExchangeWidget = ({
  fromCurrencies,
  toCurrencies,
  rates,
  onExchange,
}: {
  rates: Rate;
  fromCurrencies: Currency[];
  toCurrencies: Currency[];
  onExchange: (success: boolean, message: string) => void;
}) => {
  const {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    disableWidget,
    disableSaveButton,
    onSave,
    onFromCurrencyChange,
    onToCurrencyChange,
    onToAmountChange,
    onFromAmountChange,
  } = useExchangeWidget(rates, fromCurrencies, toCurrencies, onExchange);

  return (
    <div className="flex flex-col items-start lg:flex-row lg:items-end ">
      <SelectField
        fields={fromCurrencies}
        label="Currency from"
        value={fromCurrency}
        disabled={disableWidget}
        onChange={onFromCurrencyChange}
        className="mr-2"
      />
      <AmountField
        className="mr-2"
        label="Amount"
        value={fromAmount}
        disabled={disableWidget}
        onChange={onFromAmountChange}
      />
      <SelectField
        fields={toCurrencies}
        label="Currency to"
        value={toCurrency}
        disabled={disableWidget}
        onChange={onToCurrencyChange}
        className="mr-2"
      />
      <AmountField
        label="Amount"
        value={toAmount}
        onChange={onToAmountChange}
        className="mr-2"
        disabled={disableWidget}
      />
      <button
        disabled={disableSaveButton || disableWidget}
        style={{ minWidth: 84, height: 40 }}
        className="bg-ra-green text-white rounded-md w-full lg:w-auto disabled:bg-gray-300"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};
