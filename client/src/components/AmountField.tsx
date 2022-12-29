import currency from 'currency.js';

export const AmountField = ({
  label,
  value,
  className = '',
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  className?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={`amount-field flex flex-col ${className}`}>
      <label className="text-sm font-normal text-ra-text">{label}</label>
      <input
        disabled={disabled}
        type="number"
        placeholder="0"
        value={value}
        aria-label={label}
        className="p-2 border border-ra-border rounded-md appearance-none disabled:bg-slate-100 disabled:text-gray-400"
        style={{ minWidth: 200, height: 40 }}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
