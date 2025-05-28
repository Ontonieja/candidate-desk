import { FetchPaginatedCandidatesReturn, FilteredCandidate } from '@/types/candidateTypes';
import fetchAllPages from '@/utils/fetchAllPages';
import filterCandidates from '@/utils/filterCandidates';
import { GET_ALL_CANDIDATES_URL } from '@/routes/endpoints';
import AppError from '@/utils/appError';
import candidateCache from '@/constants/candidateCache';

export async function getCachedCandidates(): Promise<FilteredCandidate[]> {
  const now = Date.now();

  const { data, lastFetch, TTL: CACHE_TTL } = candidateCache;

  if (!data.length || now - lastFetch > CACHE_TTL) {
    try {
      const candidates = await fetchAllPages({ url: GET_ALL_CANDIDATES_URL });
      candidateCache.data = filterCandidates(candidates);
      candidateCache.lastFetch = now;

      return candidateCache.data;
    } catch (err) {
      throw new AppError(`Failed to fetch and cache candidates`, 500);
    }
  }
  return data;
}

export async function fetchPaginatedCandidates(
  page: number,
  pageSize: number
): Promise<FetchPaginatedCandidatesReturn> {
  try {
    const allCandidates = await getCachedCandidates();

    if (!allCandidates.length) throw new AppError('No candidates found', 404);

    const startIndex = (page - 1) * pageSize;
    const paginatedCandidates = allCandidates.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(allCandidates.length / pageSize);

    return {
      candidates: paginatedCandidates,
      meta: {
        pageCount: totalPages,
        recordCount: allCandidates.length
      }
    };
  } catch (err) {
    throw err;
  }
}
