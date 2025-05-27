import {
  CandidatesData,
  FetchPaginatedCandidatesReturn,
  FilteredCandidate
} from '@/types/candidateTypes';
import fetchAllPages from '@/utils/fetchAllPages';
import fetchTeamtailorApi from '@/utils/fetchTeamtailorApi';
import filterCandidates from '@/utils/filterCandidates';
import { GET_ALL_CANDIDATES_URL } from '@/routes/endpoints';

export async function getAllCandidatesData(): Promise<FilteredCandidate[]> {
  const candidates = await fetchAllPages({ url: GET_ALL_CANDIDATES_URL });

  return filterCandidates(candidates);
}

export async function fetchPaginatedCandidates(
  url: string
): Promise<FetchPaginatedCandidatesReturn> {
  try {
    const response = await fetchTeamtailorApi(url);

    const { data: candidatesData, included: applicationsData } = response;
    const pageCount = response.meta?.['page-count'] ?? 0;
    const nextPage = response.links?.next;

    const filteredCandidates = filterCandidates({
      candidates: candidatesData,
      applications: applicationsData ?? []
    });

    return {
      candidates: filteredCandidates,
      meta: {
        pageCount,
        nextPage
      }
    };
  } catch (err) {
    throw err;
  }
}
