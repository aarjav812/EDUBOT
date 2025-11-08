import { Response } from 'express';
import Message from '../models/Message';
import aiService from '../services/aiService';
import { AuthRequest } from '../middleware/auth';

// @desc    Get conversation history
// @route   GET /api/chat/history/:conversationId?
// @access  Private
export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user!._id;

    let messages;
    if (conversationId) {
      messages = await Message.find({ userId, conversationId })
        .sort({ createdAt: 1 })
        .limit(50);
    } else {
      messages = await Message.find({ userId })
        .sort({ createdAt: -1 })
        .limit(50);
    }

    res.json({
      success: true,
      data: { messages },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching chat history',
    });
  }
};

// @desc    Send message and get AI response
// @route   POST /api/chat/message
// @access  Private
export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user!._id;

    if (!message || !conversationId) {
      return res.status(400).json({
        success: false,
        message: 'Message and conversation ID are required',
      });
    }

    // Save user message
    const userMessage = await Message.create({
      userId,
      conversationId,
      role: 'user',
      content: message,
    });

    // Get recent conversation context
    const recentMessages = await Message.find({ userId, conversationId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const conversationHistory = recentMessages
      .reverse()
      .map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    // Extract intent
    const intent = await aiService.extractIntent(message);

    // Get AI response with user context
    const aiResponse = await aiService.chat(conversationHistory, {
      name: req.user!.name,
      university: req.user!.university,
      course: req.user!.course,
    });

    // Save AI response
    const assistantMessage = await Message.create({
      userId,
      conversationId,
      role: 'assistant',
      content: aiResponse.content,
      metadata: {
        model: aiResponse.model,
        tokens: aiResponse.tokens,
        intent: intent.intent,
      },
    });

    res.json({
      success: true,
      data: {
        userMessage,
        assistantMessage,
        intent: intent.intent,
      },
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing message',
    });
  }
};

// @desc    Delete conversation
// @route   DELETE /api/chat/conversation/:conversationId
// @access  Private
export const deleteConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user!._id;

    await Message.deleteMany({ userId, conversationId });

    res.json({
      success: true,
      message: 'Conversation deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting conversation',
    });
  }
};
