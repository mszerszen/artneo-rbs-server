import { Router } from 'express';
import { ConferenceRoomController } from '../controllers/conferenceRoom.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, ConferenceRoomController.getAll);
router.get('/:id', protect, ConferenceRoomController.getById);

router.post('/', protect, adminOnly, ConferenceRoomController.create);
router.put('/:id', protect, adminOnly, ConferenceRoomController.update);
router.delete('/:id', protect, adminOnly, ConferenceRoomController.delete);

export default router;