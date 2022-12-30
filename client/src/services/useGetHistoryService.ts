import { useCallback, useEffect, useState } from 'react';
import { Conversion } from '../types';

export const useGetHistoryService = () => {
  const [history, setHistory] = useState<Conversion[]>([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('createdAt:asc');
  const [perPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [countText, setCountText] = useState('');

  const fetchConversions = useCallback(
    async (page = 1, perPage = 5, sort = 'createdAt:asc') => {
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
    },
    []
  );

  const next = useCallback(() => {
    fetchConversions(page + 1, perPage, sort);
  }, [page, perPage, sort]);

  const previous = useCallback(() => {
    fetchConversions(page - 1, perPage, sort);
  }, [page, perPage, sort]);

  useEffect(() => {
    fetchConversions();
  }, []);

  return {
    history,
    page,
    total,
    countText,
    next,
    hasNext,
    previous,
    hasPrevious,
    hasHistory: history.length > 0,
  };
};
