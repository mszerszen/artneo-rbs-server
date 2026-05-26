import { transporter } from '../config/email';

export class EmailService {
  async sendEmail(to: string, subject: string, text: string) {
    try {
      await transporter.sendMail({
        from: '"System Rezerwacji" <no-reply@firma.pl>',
        to,
        subject,
        text
      });
      console.log(`Email wysłany do: ${to}`);
    } catch (error) {
      console.error("Błąd wysyłki maila:", error);
    }
  }
}

export const emailService = new EmailService();