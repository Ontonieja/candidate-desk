import request from 'supertest';
import express, { Application } from 'express';
import AppError from '../src/utils/appError';
import errorHandler from '../src/middlewares/errorHandler';

describe('Error Handler Integration Tests (using a dedicated test app)', () => {
  let testApp: Application;

  jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    testApp = express();
    testApp.use(express.json());

    testApp.get('/test-app-error', (req, res, next) => {
      next(new AppError('Custom AppError message for testing!', 400));
    });

    testApp.get('/test-generic-error', (req, res, next) => {
      next(new Error('Something unexpected went wrong during processing!'));
    });

    testApp.use(errorHandler);
  });

  test('should handle AppError and return custom status and message', async () => {
    const response = await request(testApp).get('/test-app-error');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Custom AppError message for testing!'
    });
  });

  test('should handle generic JavaScript Error and return 500 with default message', async () => {
    const response = await request(testApp).get('/test-generic-error');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: 'An unexpected error ocurred',
      error: 'Something unexpected went wrong during processing!'
    });
  });
});
