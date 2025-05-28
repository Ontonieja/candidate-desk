import { NextFunction, Request, Response } from 'express';
import { fetchPaginatedCandidates, getAllCandidatesData } from '@/services/candidatesServices';
import AppError from '@/utils/appError';
import { URL_WITH_JOB_APPLICATIONS } from '@/routes/endpoints';
import { candidatesToCsv } from '@/utils/csvTransform';

export async function exportCandidatesCsv(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const candidates = await getAllCandidatesData();

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
    const { pageSize, url } = req.query;

    if (!pageSize && !url) throw new AppError('Missing page size', 400);

    const fetchUrl =
      typeof url === 'string' && url.length > 0
        ? url
        : `${URL_WITH_JOB_APPLICATIONS}&page[size]=${pageSize}`;

    const data = await fetchPaginatedCandidates(fetchUrl);

    if (!data.candidates.length) throw new AppError('No candidates received', 500);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
