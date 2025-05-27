import { CandidatesData } from '@/types/candidateTypes';

export const candidatesWithApplications: CandidatesData = {
  candidates: [
    {
      id: '1',
      type: 'candidate',
      attributes: {
        'created-at': '2023-01-01',
        email: 'jan@ex.com',
        'first-name': 'Jan',
        'last-name': 'Kowalski'
      },
      relationships: {
        'job-applications': {
          links: {
            self: '/candidates/1/relationships/job-applications',
            related: '/candidates/1/job-applications'
          },
          data: [
            { type: 'job-application', id: 'a1' },
            { type: 'job-application', id: 'a2' }
          ]
        }
      }
    }
  ],
  applications: [
    {
      id: 'a1',
      type: 'job-application',
      links: { self: '/job-applications/a1' },
      attributes: {
        'created-at': '2024-01-01',
        'updated-at': '2024-01-01'
      }
    },
    {
      id: 'a2',
      type: 'job-application',
      links: { self: '/job-applications/a2' },
      attributes: {
        'created-at': '2024-02-01',
        'updated-at': '2024-02-01'
      }
    }
  ]
};

export const candidateWithoutApplications: CandidatesData = {
  candidates: [
    {
      id: '2',
      type: 'candidate',
      attributes: {
        'created-at': '2023-05-01',
        email: 'anna@ex.com',
        'first-name': 'Anna',
        'last-name': 'Nowak'
      },
      relationships: {
        'job-applications': {
          links: {
            self: '/candidates/2/relationships/job-applications',
            related: '/candidates/2/job-applications'
          },
          data: []
        }
      }
    }
  ],
  applications: []
};
