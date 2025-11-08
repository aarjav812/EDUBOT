import { Response } from 'express';
import Reminder from '../models/Reminder';
import notificationService from '../services/notificationService';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all reminders for user
// @route   GET /api/reminders
// @access  Private
export const getReminders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const { type, completed } = req.query;

    const query: any = { userId };
    if (type) query.type = type;
    if (completed !== undefined) query.isCompleted = completed === 'true';

    const reminders = await Reminder.find(query).sort({ dueDate: 1 });

    res.json({
      success: true,
      data: { reminders },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching reminders',
    });
  }
};

// @desc    Create new reminder
// @route   POST /api/reminders
// @access  Private
export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const {
      title,
      description,
      type,
      dueDate,
      reminderTime,
      priority,
      course,
      tags,
    } = req.body;

    const reminder = await Reminder.create({
      userId,
      title,
      description,
      type,
      dueDate: new Date(dueDate),
      reminderTime: new Date(reminderTime),
      priority: priority || 'medium',
      course,
      tags,
    });

    res.status(201).json({
      success: true,
      data: { reminder },
      message: 'Reminder created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating reminder',
    });
  }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
export const updateReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    let reminder = await Reminder.findOne({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found',
      });
    }

    reminder = await Reminder.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: { reminder },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating reminder',
    });
  }
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found',
      });
    }

    res.json({
      success: true,
      message: 'Reminder deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting reminder',
    });
  }
};

// @desc    Mark reminder as completed
// @route   PATCH /api/reminders/:id/complete
// @access  Private
export const completeReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      { isCompleted: true },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found',
      });
    }

    res.json({
      success: true,
      data: { reminder },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error completing reminder',
    });
  }
};

// @desc    Subscribe to push notifications
// @route   POST /api/reminders/subscribe
// @access  Private
export const subscribePush = async (req: AuthRequest, res: Response) => {
  try {
    const userId = String(req.user!._id);
    const { subscription } = req.body;

    await notificationService.subscribePush(userId, subscription);

    res.json({
      success: true,
      message: 'Successfully subscribed to push notifications',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error subscribing to notifications',
    });
  }
};

// @desc    Unsubscribe from push notifications
// @route   POST /api/reminders/unsubscribe
// @access  Private
export const unsubscribePush = async (req: AuthRequest, res: Response) => {
  try {
    const userId = String(req.user!._id);

    await notificationService.unsubscribePush(userId);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from push notifications',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error unsubscribing from notifications',
    });
  }
};
