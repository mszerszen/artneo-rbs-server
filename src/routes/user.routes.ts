import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', protect, adminOnly, UserController.register);

router.get('/', protect, UserController.getAll);
router.get('/me', protect, UserController.getMe);
router.get('/:id', protect, UserController.getById);

router.put('/:id', protect, UserController.update);
router.delete('/:id', protect, adminOnly, UserController.delete);

export default router;