import { useCallback, useEffect, useState } from 'react';
import { Conversion, ConversionField } from '../types';

export const useGetHistoryService = () => {
  const [history, setHistory] = useState<Conversion[]>([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('createdAt:desc');
  const [perPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [countText, setCountText] = useState('');

  const fetchConversions = useCallback(
    async (page = 1, perPage = 5, sort = 'createdAt:desc') => {
      setHasNext(false);
      setHasPrevious(false);

      const response = await fetch(
        `http://localhost:8081/conversions?page=${page}&perPage=${perPage}&sort=${sort}`
      );

      const data = await response.json();

      setHistory(data.data);
      setPage(data.page);
      setHasNext(data.hasNextPage);
      setHasPrevious(data.hasPreviousPage);
      setTotal(data.total);
      setCountText(data.paginationCountText);
      setSort(data.sort);
    },
    []
  );

  const next = useCallback(() => {
    fetchConversions(page + 1, perPage, sort);
  }, [page, perPage, sort]);

  const previous = useCallback(() => {
    fetchConversions(page - 1, perPage, sort);
  }, [page, perPage, sort]);

  const refresh = useCallback(() => {
    fetchConversions(page, perPage, sort);
  }, [page, perPage, sort]);

  const toggleSort = useCallback(
    (fieldName: ConversionField) => {
      let newSort = sort;
      const orderToggle = { desc: 'asc', asc: 'desc' };

      const [field, order] = sort.split(':');

      if (fieldName === field)
        newSort = `${fieldName}:${
          orderToggle[order as keyof typeof orderToggle]
        }`;
      else newSort = `${fieldName}:desc`;

      if (newSort !== sort) fetchConversions(page, perPage, newSort);
    },
    [sort, page, perPage]
  );

  useEffect(() => {
    fetchConversions();
  }, []);

  return {
    history,
    page,
    total,
    countText,
    refresh,
    next,
    hasNext,
    previous,
    hasPrevious,
    hasHistory: history.length > 0,
    toggleSort,
  };
};
