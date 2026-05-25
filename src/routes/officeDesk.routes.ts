import { Router } from 'express';
import { OfficeDeskController } from '../controllers/officeDesk.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, OfficeDeskController.getAll);
router.get('/:id', protect, OfficeDeskController.getById);

router.post('/', protect, adminOnly, OfficeDeskController.create);
router.put('/:id', protect, adminOnly, OfficeDeskController.update);
router.delete('/:id', protect, adminOnly, OfficeDeskController.delete);

export default router;