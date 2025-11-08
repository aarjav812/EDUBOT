import webpush from 'web-push';
import User from '../models/User';
import Reminder from '../models/Reminder';

class NotificationService {
  constructor() {
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      webpush.setVapidDetails(
        process.env.VAPID_SUBJECT || 'mailto:support@edubot.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );
    }
  }

  async sendPushNotification(
    userId: string,
    payload: {
      title: string;
      body: string;
      icon?: string;
      badge?: string;
      data?: any;
    }
  ): Promise<boolean> {
    try {
      const user = await User.findById(userId);
      
      if (!user || !user.pushSubscription) {
        console.log('No push subscription found for user:', userId);
        return false;
      }

      const notificationPayload = JSON.stringify({
        title: payload.title,
        body: payload.body,
        icon: payload.icon || '/icon-192x192.png',
        badge: payload.badge || '/badge-72x72.png',
        data: payload.data || {},
        timestamp: Date.now(),
      });

      await webpush.sendNotification(
        user.pushSubscription,
        notificationPayload
      );

      console.log('Push notification sent to user:', userId);
      return true;
    } catch (error: any) {
      console.error('Error sending push notification:', error);
      
      // If subscription is no longer valid, remove it
      if (error.statusCode === 410) {
        await User.findByIdAndUpdate(userId, {
          $unset: { pushSubscription: 1 },
        });
      }
      
      return false;
    }
  }

  async sendReminderNotification(reminderId: string): Promise<boolean> {
    try {
      const reminder = await Reminder.findById(reminderId);
      
      if (!reminder || reminder.isSent) {
        return false;
      }

      const priorityEmoji = {
        low: '📌',
        medium: '⚠️',
        high: '🔴',
      };

      const typeEmoji = {
        assignment: '📝',
        exam: '📚',
        event: '📅',
        deadline: '⏰',
        custom: '🔔',
      };

      const success = await this.sendPushNotification(
        reminder.userId.toString(),
        {
          title: `${priorityEmoji[reminder.priority]} ${reminder.title}`,
          body: `${typeEmoji[reminder.type]} Due: ${reminder.dueDate.toLocaleDateString()}${
            reminder.description ? ` - ${reminder.description}` : ''
          }`,
          data: {
            reminderId: reminder._id,
            type: reminder.type,
            dueDate: reminder.dueDate,
            url: '/chat',
          },
        }
      );

      if (success) {
        reminder.isSent = true;
        await reminder.save();
      }

      return success;
    } catch (error) {
      console.error('Error sending reminder notification:', error);
      return false;
    }
  }

  async subscribePush(userId: string, subscription: any): Promise<boolean> {
    try {
      await User.findByIdAndUpdate(userId, {
        pushSubscription: subscription,
      });
      return true;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return false;
    }
  }

  async unsubscribePush(userId: string): Promise<boolean> {
    try {
      await User.findByIdAndUpdate(userId, {
        $unset: { pushSubscription: 1 },
      });
      return true;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      return false;
    }
  }
}

export default new NotificationService();
