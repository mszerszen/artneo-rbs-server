import cron from 'node-cron';
import { Reservation } from '../models/reservation.model';
import { emailService } from '../services/email.service';

export const startEmailJobs = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Sprawdzam nadchodzące rezerwacje...');
    
    const now = new Date();
    const in30Min = new Date(now.getTime() + 30 * 60000);
    const in31Min = new Date(now.getTime() + 31 * 60000);

    const upcoming = await Reservation.find({
      startDate: { $gte: in30Min, $lt: in31Min },
      reminderSent: { $ne: true }
    }).populate('user');

    for (const res of upcoming) {
      const userMail = (res.user as any).email;
      await emailService.sendEmail(userMail, "Przypomnienie", "Twoja rezerwacja zaczyna się za 30 minut!");
      
      await Reservation.updateOne({ _id: res._id }, { reminderSent: true });
    }
  });
};