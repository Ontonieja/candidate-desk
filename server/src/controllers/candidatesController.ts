import { NextFunction, Request, Response } from 'express';
import { fetchPaginatedCandidates, getAllCandidatesData } from '../services/candidatesServices';
import AppError from '../utils/appError';

export async function exportCandidatesCsv(req: Request, res: Response, next: NextFunction) {
  try {
    const candidates = await getAllCandidatesData();
  } catch (err) {
    next(err);
  }
}

export async function getPaginatedCandidates(req: Request, res: Response, next: NextFunction) {
  try {
    const { pageSize, url } = req.query;

    if (!pageSize) {
      throw new AppError('Missing page size', 400);
    }

    const baseUrl = 'https://api.teamtailor.com/v1/candidates?include=job-applications';
    const fetchUrl =
      typeof url === 'string' && url.length > 0 ? url : `${baseUrl}&page[size]=${pageSize}`;

    const data = await fetchPaginatedCandidates(fetchUrl);
  } catch (err) {
    next(err);
  }
}
