import express from 'express';
import {
  getAllNotifications,
  getNotificationsByUserId,
  getNotificationById,
  createNotification,
  markNotificationAsRead,
  deleteNotification
} from '../controllers/NotificationController.js';

const router = express.Router();

router.get('/', getAllNotifications);
router.get('/user/:userId', getNotificationsByUserId);
router.get('/:id', getNotificationById);
router.post('/', createNotification);
router.patch('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification);

export default router;