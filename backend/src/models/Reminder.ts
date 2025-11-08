import mongoose, { Document, Schema } from 'mongoose';

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  type: 'assignment' | 'exam' | 'event' | 'deadline' | 'custom';
  dueDate: Date;
  reminderTime: Date;
  isCompleted: boolean;
  isSent: boolean;
  priority: 'low' | 'medium' | 'high';
  course?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    type: {
      type: String,
      enum: ['assignment', 'exam', 'event', 'deadline', 'custom'],
      default: 'custom',
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide a due date'],
    },
    reminderTime: {
      type: Date,
      required: [true, 'Please provide a reminder time'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    course: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Index for efficient reminder queries
reminderSchema.index({ userId: 1, dueDate: 1 });
reminderSchema.index({ reminderTime: 1, isSent: 1 });

export default mongoose.model<IReminder>('Reminder', reminderSchema);
