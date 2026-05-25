import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, ReservationController.getAll);
router.post('/', protect, ReservationController.create);
router.put('/:id', protect, ReservationController.update);
router.delete('/:id', protect, ReservationController.delete);

export default router;