import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92a16ddc9b9bfd",
    pass: "89800ee221a625"
  }
});