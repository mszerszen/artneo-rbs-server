import { Router } from 'express';
import { CarController } from '../controllers/car.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, CarController.getAll);
router.get('/:id', protect, CarController.getById);

router.post('/', protect, adminOnly, CarController.create);
router.put('/:id', protect, adminOnly, CarController.update);
router.delete('/:id', protect, adminOnly, CarController.delete);

export default router;