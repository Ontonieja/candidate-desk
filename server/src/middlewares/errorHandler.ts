import { NextFunction, Request, Response } from 'express';
import AppError from '@/utils/appError';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'An unexpected error ocurred', error: err.message });
}

export default errorHandler as (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
