import { FilteredCandidate } from '@/types/candidateTypes';

const candidateCache = {
  data: [] as FilteredCandidate[],
  lastFetch: 0,
  TTL: 5 * 60 * 1000
};

export default candidateCache;
