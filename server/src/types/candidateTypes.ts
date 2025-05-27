export interface Candidate {
  id: string;
  type: string;
  attributes: {
    'created-at': string;
    email: string;
    'first-name': string;
    'last-name': string;
  };
  relationships: {
    'job-applications': {
      links: {
        self: string;
        related: string;
      };
      data?: {
        type: string;
        id: string;
      }[];
    };
  };
}

export interface JobApplication {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    'created-at': string;
    'updated-at': string;
  };
}

export interface CandidatesData {
  candidates: Candidate[];
  applications: JobApplication[];
}

export interface GetAllCandidatesDataOptions {
  url: string;
  accumulatedData?: CandidatesData;
}
