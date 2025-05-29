import { FilteredCandidate } from '@/types/candidateTypes';

export function filterCandidatesBySearch(
  search: string,
  candidates: FilteredCandidate[]
): FilteredCandidate[] {
  return candidates.filter(({ first_name, last_name, email, candidate_id, job_application_id }) => {
    return (
      first_name?.toLowerCase().includes(search) ||
      last_name?.toLowerCase().includes(search) ||
      email?.toLowerCase().includes(search) ||
      candidate_id?.toString().includes(search) ||
      job_application_id?.toString().includes(search)
    );
  });
}
