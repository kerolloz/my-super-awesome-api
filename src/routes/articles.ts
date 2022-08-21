import { Router } from 'express';
import { articles } from '../controllers';
import { authenticate } from '../middlewares';

const router = Router();

router.get('/', articles.getAll);
router.post('/', authenticate, articles.create);

export default router;
