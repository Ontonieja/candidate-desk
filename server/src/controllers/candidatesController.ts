import { NextFunction, Request, Response } from 'express';
import { fetchPaginatedCandidates, getCachedCandidates } from '@/services/candidatesServices';
import AppError from '@/utils/appError';
import { URL_WITH_JOB_APPLICATIONS } from '@/routes/endpoints';
import { candidatesToCsv } from '@/utils/csvTransform';

export async function exportCandidatesCsv(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const candidates = await getCachedCandidates();

    if (!candidates || !candidates.length) throw new AppError('No candidates received', 500);

    const csv = candidatesToCsv(candidates);

    res.header('Content-Type', 'text/csv');
    res.attachment('candidates.csv');

    return res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
}

export async function getPaginatedCandidates(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const data = await fetchPaginatedCandidates(page, pageSize);

    if (!data.candidates.length) throw new AppError('No candidates received', 500);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
