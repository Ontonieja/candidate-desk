import request from 'supertest';
import { app } from '../src/app';

jest.mock('@/services/candidatesServices', () => ({
  getAllCandidatesData: jest.fn(() => [
    {
      candidate_id: '1',
      first_name: 'Jan',
      last_name: 'Kowalski',
      email: 'jan@ex.com',
      job_application_id: 'a1',
      job_application_created_at: '2024-01-01'
    }
  ]),
  fetchPaginatedCandidates: jest.fn(() => ({
    candidates: [
      {
        candidate_id: '1',
        first_name: 'Jan',
        last_name: 'Kowalski',
        email: 'jan@ex.com',
        job_application_id: 'a1',
        job_application_created_at: '2024-01-01'
      }
    ]
  }))
}));

describe('GET /api/candidates/export/csv', () => {
  it('should return CSV with correct headers', async () => {
    const res = await request(app).get('/api/v1/candidates/export/csv');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.headers['content-disposition']).toContain('attachment');
    expect(res.text).toContain('candidate_id');
  });
});

describe('GET /api/candidates', () => {
  it('should return paginated candidates as JSON', async () => {
    const res = await request(app).get('/api/v1/candidates?pageSize=10');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('candidates');
  });

  it('should return 400 if pageSize is missing', async () => {
    const res = await request(app).get('/api/v1/candidates');
    expect(res.status).toBe(400);
  });
});
