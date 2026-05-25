import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, EquipmentController.getAll);
router.get('/:id', protect, EquipmentController.getById);

router.post('/', protect, adminOnly, EquipmentController.create);
router.put('/:id', protect, adminOnly, EquipmentController.update);
router.delete('/:id', protect, adminOnly, EquipmentController.delete);

export default router;