import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Currency } from '../types';
import { CurrencyFlag } from './CurrencyFlag';

export const SelectField = ({
  fields,
  label,
  value,
  className,
  disabled,
  onChange,
}: {
  label: string;
  fields: Currency[];
  value: Currency | null;
  className?: string;
  disabled?: boolean;
  onChange: (value: Currency) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    document.addEventListener(
      'focusout',
      (e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as HTMLElement)) {
          setIsMenuOpen(false);
        }
      },
      { signal }
    );

    document.addEventListener(
      'click',
      (e) => {
        if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
          setIsMenuOpen(false);
        }
      },
      { signal }
    );

    return () => controller.abort();
  });

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className || ''} `}
      onKeyDown={handleKeyDown}
    >
      <label className={`text-sm font-normal text-ra-text`}>{label}</label>
      <div
        tabIndex={disabled ? undefined : 0}
        onClick={() => {
          if (disabled) return;
          setIsMenuOpen(!isMenuOpen);
        }}
        onKeyDown={(e) => e.key === 'Enter' && setIsMenuOpen(!isMenuOpen)}
        style={{ minWidth: 200, height: 40 }}
        className={`flex items-center justify-center p-2 border border-ra-border rounded-md ${
          disabled ? 'bg-slate-100' : ''
        }`}
      >
        {value && (
          <CurrencyFlag
            className={`h-6 w-6 rounded-xl mr-2 ${
              disabled ? 'opacity-50' : ''
            }`}
            code={value.code}
          />
        )}
        {value && (
          <p className={`${disabled ? 'text-gray-400' : ''}`}>{value.name}</p>
        )}

        <ChevronDownIcon
          className={`h-4 w-4 ml-auto ${disabled ? 'text-gray-400' : ''}`}
        />
      </div>

      {isMenuOpen && !disabled && (
        <div className="absolute bg-white shadow-lg w-full cursor-default">
          {fields.map((field) => (
            <button
              className="flex pl-4 py-3 hover:bg-ra-bg-1 w-full border-b border-b-ra-menu-border"
              key={field.code}
              onClick={() => {
                onChange(field);
                setIsMenuOpen(false);
              }}
            >
              <CurrencyFlag
                className={`h-5 w-5 rounded-xl mr-2 `}
                code={field.code}
              />
              <p>{field.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
