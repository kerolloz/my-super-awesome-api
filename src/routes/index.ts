import { Router } from 'express';
import { endpoint, HttpException, NOT_FOUND } from '../core';
import articles from './articles';

const router = Router();

router.get(
  '/ping',
  endpoint(() => 'pong 🏓'),
);

router.use('/articles', articles);

router.use('*', () => {
  throw new HttpException(NOT_FOUND, { message: 'Are you lost? 🤔' });
});

export default router;
