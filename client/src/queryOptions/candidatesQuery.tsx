import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';
import type { CandidatesData } from '../types/candidatesTypes';

export function useCandidatesQueryOptions(currentPage: number, pageSize: number, search?: string) {
  return queryOptions({
    queryKey: ['candidates', currentPage, pageSize, search],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: pageSize.toString()
        });

        if (search && search.trim()) {
          params.append('search', search.trim());
        }

        const url = `${BASE_URL}/candidates?${params.toString()}`;
        const { data } = await axios.get<CandidatesData>(url);
        return data;
      } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
      }
    }
  });
}
