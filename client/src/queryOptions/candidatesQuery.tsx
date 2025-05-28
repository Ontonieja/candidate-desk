import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, URL_WITH_NEXT_PAGE } from '../constants/endpoints';
import type { CandidatesData } from '../types/candidatesTypes';

export function useCandidatesQueryOptions(nextUrl: string | null, pageSize: number) {
  return queryOptions({
    queryKey: ['candidates', nextUrl, pageSize],
    queryFn: async () => {
      const url = nextUrl
        ? `${URL_WITH_NEXT_PAGE}${encodeURIComponent(nextUrl)}`
        : `${BASE_URL}/candidates?pageSize=${pageSize}`;
      const { data } = await axios.get<CandidatesData>(url);
      return data;
    }
  });
}
