import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';
import type { CandidatesData } from '../types/candidatesTypes';

export function useCandidatesQueryOptions(currentPage: number, pageSize: number) {
  return queryOptions({
    queryKey: ['candidates', currentPage, pageSize],
    queryFn: async () => {
      const url = `${BASE_URL}/candidates?pageSize=${pageSize}&page=${currentPage}`;

      const { data } = await axios.get<CandidatesData>(url);
      return data;
    }
  });
}
