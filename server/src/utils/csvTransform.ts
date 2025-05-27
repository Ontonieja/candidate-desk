import { Parser } from 'json2csv';

export function candidatesToCsv(candidates: any[]) {
  const fields = [
    'candidate_id',
    'first_name',
    'last_name',
    'email',
    'job_application_id',
    'job_application_created_at'
  ];
  const parser = new Parser({ fields, delimiter: ';' });
  return parser.parse(candidates);
}
