export interface Candidate {
  candidate_id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_application_id: string;
  job_application_created_at: string;
}

export interface CandidatesData {
  candidates: Candidate[];
  meta: {
    pageCount: number;
    recordCount: number;
    nextPage?: string;
    prevPage?: string;
  };
}
