import { Router } from 'express';
import { exportCandidatesCsv, getCandidatesPage } from '../controllers/candidatesController';

const router = Router();

router.get('/candidates', exportCandidatesCsv);

router.get('/candidates/export/csv', getCandidatesPage);

export default router;
