import express from 'express';
import { body } from 'express-validator';
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  completeReminder,
  subscribePush,
  unsubscribePush,
} from '../controllers/reminderController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const reminderValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('reminderTime').isISO8601().withMessage('Valid reminder time is required'),
];

router.get('/', protect, getReminders);
router.post('/', protect, reminderValidation, validate, createReminder);
router.put('/:id', protect, updateReminder);
router.delete('/:id', protect, deleteReminder);
router.patch('/:id/complete', protect, completeReminder);
router.post('/subscribe', protect, subscribePush);
router.post('/unsubscribe', protect, unsubscribePush);

export default router;
