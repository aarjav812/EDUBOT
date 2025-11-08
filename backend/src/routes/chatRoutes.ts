import express from 'express';
import { body } from 'express-validator';
import { getHistory, sendMessage, deleteConversation } from '../controllers/chatController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

const messageValidation = [
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('conversationId').trim().notEmpty().withMessage('Conversation ID is required'),
];

router.get('/history/:conversationId?', protect, getHistory);
router.post('/message', protect, messageValidation, validate, sendMessage);
router.delete('/conversation/:conversationId', protect, deleteConversation);

export default router;
