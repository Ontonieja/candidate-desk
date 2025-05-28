import type { Candidate } from '../../types/candidatesTypes';

const columns: { key: keyof Candidate; label: string }[] = [
  { key: 'candidate_id', label: 'Candidate ID' },
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'job_application_id', label: 'Application ID' },
  { key: 'job_application_created_at', label: 'Applied At' }
];

export default columns;
