import {
  ListBulletIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import { Conversion } from '../../types';

export const HistoryTable = ({
  data,
  hasNext,
  hasPrevious,
  paginationText,
  onNext,
  onPrevious,
}: {
  data: Conversion[];
  hasNext: boolean;
  hasPrevious: boolean;
  paginationText: string;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  console.log('hasNext', hasNext);
  console.log('hasPrevious', hasPrevious);
  return (
    <div className="w-full">
      <div className="flex items-center bg-ra-bg-1 h-8 rounded-md">
        <DataCell className="pl-2">
          <ListBulletIcon className="h-3 w-3 mr-2" /> Date & Time
        </DataCell>
        <DataCell className="pl-2" separator>
          Currency From
        </DataCell>
        <DataCell className="pl-2" separator>
          Amount 1
        </DataCell>
        <DataCell className="pl-2" separator>
          Currency To
        </DataCell>
        <DataCell className="pl-2" separator>
          Amount 2
        </DataCell>
        <DataCell className="pl-2" separator>
          Type
        </DataCell>
      </div>

      {data.map(
        ({
          id,
          fromCurrencyName,
          type,
          formattedFromAmount,
          toCurrency,
          formattedToAmount,
          isExchange,
          createdAt,
        }) => {
          return (
            <div
              key={id}
              className="flex items-center odd:bg-ra-bg-1 h-14 rounded-md"
            >
              <DataCell className="pl-2">{createdAt}</DataCell>
              <DataCell className="pl-2" separator>
                {fromCurrencyName}
              </DataCell>
              <DataCell className="pl-2" separator>
                {formattedFromAmount}
              </DataCell>
              <DataCell className="pl-2" separator>
                {toCurrency}
              </DataCell>
              <DataCell className="pl-2" separator>
                {formattedToAmount}
              </DataCell>
              <DataCell
                className={`pl-2 ${
                  isExchange ? 'text-ra-purple' : 'text-ra-green'
                }  font-semibold`}
                separator
              >
                {type}
              </DataCell>
            </div>
          );
        }
      )}

      <div className="flex items-center">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex items-center disabled:text-slate-300"
        >
          <ArrowSmallLeftIcon className="h-4 w-4 mr-2" />
          <span>Previous</span>
        </button>
        <p className="mx-6">{paginationText}</p>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center disabled:text-slate-300"
        >
          <span>Next</span>
          <ArrowSmallRightIcon className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

const DataCell = ({
  children,
  separator,
  className,
}: {
  children: ReactNode;
  separator?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center w-2/12 ${
        separator ? 'border-l border-l-slate-200' : ''
      } ${className ?? ''} `}
    >
      {children}
    </div>
  );
};
