import { CandidatesData, FilteredCandidate } from '@/types/candidateTypes';

export default function filterCandidates(data: CandidatesData): FilteredCandidate[] {
  const { candidates, applications } = data;

  return candidates.flatMap((candidate) => {
    const {
      id: candidate_id,
      attributes: { 'first-name': first_name, 'last-name': last_name, email }
    } = candidate;

    const baseCandidateData = {
      candidate_id,
      first_name,
      last_name,
      email
    };

    const candidateJobRelationships = candidate.relationships['job-applications']?.data;

    if (!candidateJobRelationships?.length) {
      return [
        {
          ...baseCandidateData,
          job_application_id: null,
          job_application_created_at: null
        }
      ];
    }

    return candidateJobRelationships.map(({ id }) => {
      const jobApplication = applications.find((app) => app.id === id);

      return {
        ...baseCandidateData,
        job_application_id: jobApplication?.id ?? null,
        job_application_created_at: jobApplication?.attributes['created-at'] ?? null
      };
    });
  });
}
