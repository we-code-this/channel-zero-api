import nodemailer from 'nodemailer';

let transporter;

if (process.env.NODE_ENV === 'test') {
  transporter = {
    sendMail: () => 'email sent',
  };
} else {
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

export default transporter;
