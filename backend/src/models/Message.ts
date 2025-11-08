import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  userId: mongoose.Types.ObjectId;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    model?: string;
    tokens?: number;
    intent?: string;
  };
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metadata: {
      model: String,
      tokens: Number,
      intent: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient conversation retrieval
messageSchema.index({ userId: 1, conversationId: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', messageSchema);
