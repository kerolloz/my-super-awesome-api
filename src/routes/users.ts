import { Router } from 'express';
import { users } from '../controllers';

const router = Router();

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/verify', users.verify);

export default router;
