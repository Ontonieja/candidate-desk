import { Router } from 'express';
import { exportCandidatesCsv, getPaginatedCandidates } from '@/controllers/candidatesController';

const router = Router();

router.get('/candidates', getPaginatedCandidates);

router.get('/candidates/export/csv', exportCandidatesCsv);

export default router;
