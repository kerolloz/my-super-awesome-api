import { Router } from 'express';
import { endpoint, HttpException, NOT_FOUND } from '../core';

const router = Router();

router.get(
  '/ping',
  endpoint(() => 'pong 🏓'),
);

router.use('*', () => {
  throw new HttpException(NOT_FOUND, { message: 'Are you lost? 🤔' });
});

export default router;
