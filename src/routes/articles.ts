import { Router } from 'express';
import { articles } from '../controllers';

const router = Router();

router.get('/', articles.getAll);
router.post('/', articles.create);

export default router;
