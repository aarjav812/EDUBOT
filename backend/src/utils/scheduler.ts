import cron from 'node-cron';
import Reminder from '../models/Reminder';
import notificationService from '../services/notificationService';

class ReminderScheduler {
  start() {
    // Check for reminders every minute
    cron.schedule('* * * * *', async () => {
      try {
        const now = new Date();
        const fiveMinutesLater = new Date(now.getTime() + 5 * 60000);

        // Find reminders that need to be sent
        const reminders = await Reminder.find({
          reminderTime: {
            $gte: now,
            $lte: fiveMinutesLater,
          },
          isSent: false,
          isCompleted: false,
        });

        for (const reminder of reminders) {
          await notificationService.sendReminderNotification(
            String(reminder._id)
          );
        }

        if (reminders.length > 0) {
          console.log(`Sent ${reminders.length} reminder notifications`);
        }
      } catch (error) {
        console.error('Error in reminder scheduler:', error);
      }
    });

    console.log('Reminder scheduler started');
  }
}

export default new ReminderScheduler();
