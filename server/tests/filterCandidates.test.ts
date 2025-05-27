import filterCandidates from '../src/utils/filterCandidates';
import { candidatesWithApplications, candidateWithoutApplications } from './mockCandidatesData';

describe('filterCandidates', () => {
  it('returns candidates with job applications', () => {
    const result = filterCandidates(candidatesWithApplications);

    expect(result).toEqual([
      {
        candidate_id: '1',
        first_name: 'Jan',
        last_name: 'Kowalski',
        email: 'jan@ex.com',
        job_application_id: 'a1',
        job_application_created_at: '2024-01-01'
      },
      {
        candidate_id: '1',
        first_name: 'Jan',
        last_name: 'Kowalski',
        email: 'jan@ex.com',
        job_application_id: 'a2',
        job_application_created_at: '2024-02-01'
      }
    ]);
  });

  it('returns candidate with null job application if none exist', () => {
    const result = filterCandidates(candidateWithoutApplications);

    expect(result).toEqual([
      {
        candidate_id: '2',
        first_name: 'Anna',
        last_name: 'Nowak',
        email: 'anna@ex.com',
        job_application_id: null,
        job_application_created_at: null
      }
    ]);
  });
});
